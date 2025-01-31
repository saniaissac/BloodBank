import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { TextField, Button, Typography, Box } from '@mui/material';

function AdminReqForm() {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [role, setRole] = useState('Donor');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const workout = { name, age, email, phone, bloodType, role };

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();
    if (response.ok) {
      setName('');
      setAge('');
      setEmail('');
      setPhone('');
      setBloodType('');
      setRole('Donor');
      setError(null);
      console.log('New workout added', json);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    } else {
      setError(json.error || 'Failed to add donor');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        p: 2,
        borderRadius: 2,
        boxShadow: 3
      }}
    >
      <Typography variant="h6" gutterBottom>
        ADD DONOR
      </Typography>
      <TextField
        required
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <TextField
        required
        label="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <TextField
        required
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <TextField
        required
        label="Phone no."
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <TextField
        required
        label="Blood Type"
        value={bloodType}
        onChange={(e) => setBloodType(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Submit Request
      </Button>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default AdminReqForm;


// import React from 'react'
// import { useState } from 'react'
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// import { useAuthContext } from '../hooks/useAuthContext';


// function AdminReqForm() {
//     const {user } = useAuthContext()
  
//     const {dispatch} = useWorkoutsContext()
  
//     const [name,setName]= useState('');
//     const [age,setAge]= useState('');
//     const [email,setEmail]= useState('');
//     const [phone,setPhone]= useState('');
//     const [bloodType,setBloodType]= useState('');
//     const [role,setRole]= useState('Donor');
//     const [error, setError]= useState(null);
  
//     const handleSubmit = async (e)=>{
//       e.preventDefault();
//       if(!user){
//           setError('you must be logged in')
//           return
//       }
  
//       const workout ={name,age,email,phone,bloodType,role}
  
//       const response = await fetch('http://localhost:4000/api/workouts',{
//           method: 'POST',
//           body: JSON.stringify(workout),
//           headers: {
//               'Content-Type': 'application/json',
//               'Authorization':`Bearer ${user.token}`
//           }
//       })
  
//       const json = await response.json();
//       if (response.ok){
//           setName('');
//           setAge('');
//           setEmail('');
//           setPhone('');
//           setBloodType('');
          
//           setError(null)
//           console.log("new workout added",json);
//           dispatch({type: 'CREATE_WORKOUT', payload: json});
//       }
//     }
  
//     return (
//      <form className='create' onSubmit={handleSubmit}>
//       <h3>ADD DONOR</h3>
//       <input
//           required
//           type="text" placeholder="Name"
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//       />
//       <input
//           required
//           type="number" placeholder="Age"
//           onChange={(e) => setAge(e.target.value)}
//           value={age}
//       />
//       <input
//           required
//           type="email" placeholder="email"
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//       />
//       <input
//           required
//           type="tel" placeholder="Phone no."
//           onChange={(e) => setPhone(e.target.value)}
//           value={phone}
//       />
//       <input
//           required
//           type="text" placeholder="Blood Type"
//           onChange={(e) => setBloodType(e.target.value)}
//           value={bloodType}
//       />
//       <button>Submit Request</button>
//       {error && <div className='error'>{error}</div>}
//      </form>
//     )
// }

// export default AdminReqForm
