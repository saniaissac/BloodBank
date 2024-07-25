import React, { useState, useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import Notification from '../components/Notification';
import { Button, Container, Typography, Box, Paper, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Indigo
    },
    secondary: {
      main: '#ff9800', // Orange
    },
    background: {
      default: '#f5f5f5', // Light gray background
    },
    text: {
      primary: '#212121', // Dark gray for primary text
      secondary: '#757575', // Lighter gray for secondary text
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      color: '#3f51b5',
    },
    h6: {
      fontWeight: 600,
      color: '#ff9800',
    },
    body1: {
      color: '#0E0E0E',
    },
    body2: {
      color: '#ffffff',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #3f51b5 30%, #ff9800 90%)',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
          color: '#ffffff', // Ensures text is readable on the gradient background
        },
      },
    },
  },
});

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    const fetchNotifications = async () => {
      const response = await fetch('http://localhost:4000/api/user/notifications', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        setNotifications(json);
      }
    };

    if (user) {
      fetchWorkouts();
      fetchNotifications();
    }
  }, [dispatch, user]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={{ my: 4 }}>
          <Button variant="contained" color="primary" onClick={toggleNotifications}>
            Notifications ({notifications.length})
          </Button>
          {showNotifications && notifications.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Paper elevation={3}>
                {notifications.map((notification, index) => (
                  <Notification key={index} notification={notification} />
                ))}
              </Paper>
            </Box>
          )}
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              APPROVED BLOOD DONOR DETAILS
            </Typography>
            <Box>
              {workouts && workouts.map((bdetail) => (
                bdetail.isApproved && <WorkoutDetails key={bdetail._id} bdetail={bdetail} />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <WorkoutForm />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Home;





