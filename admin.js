import React, { useState, useEffect } from "react";
import { fetchUsers, addUser, deleteUser } from "./login";
import "./App.css"
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "user" });
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError("Failed to fetch users.");
      }
    };
    loadUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.username || !newUser.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const addedUser = await addUser(newUser);
      setUsers([...users, addedUser]);
      setNewUser({ username: "", password: "", role: "user" });
      setError("");
    } catch (err) {
      setError("Failed to add user.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  return (
    <div>
      <div className="item3">
      <marquee behavior="alternate" direction="right"><h2 style={{textAlign:"center",fontSize:"35px"}}>Admin Dashboard</h2></marquee>
      
      <h3 style={{marginLeft:"43%"}}>User Management</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleAddUser}  style={{marginLeft:"38%",border:"2px solid black",marginRight:"38%",padding:"5px",boxShadow:"2px 2px 2px gray"}}>
        <h4>Add User:</h4>
        <label>Username:</label>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        /><br/><br/>
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        /><br/><br/>
        <label>Role:</label>
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select> <br/><br/>
        <button type="submit">Add User</button>
      </form>
      
      <h4>All Users</h4>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AdminDashboard;
