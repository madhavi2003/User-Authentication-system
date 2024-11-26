import React from 'react';
import "./App.css"
const UserDashboard = ({ user }) => {
  return (
    <div>
      <div className='item1'>
        <h2 style={{color:"skyblue",position:"absolute",top:"5%",left:"40%",fontSize:"45px",textDecoration:"underline"}}>User Dashboard</h2>
      <div className='item2'>
      <h2>Welcome, {user.username}!</h2>
      <p>Role: {user.role}</p>
    </div>
    </div>
    </div>
  );
};

export default UserDashboard;

