

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import "./App.css"

const LoginPage = () => {
    const { setLoggedInUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get("http://localhost:5000/users");
            const user = response.data.find(
                (u) =>
                    u.username === username &&
                    u.password === password &&
                    u.role === role
            );

            if (user) {
                setLoggedInUser(user);
                console.log("Logged in user:", user);

                // Redirect based on role
                if (role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/user");
                }
            } else {
                setError("Invalid credentials or user not found.");
            }
        } catch (err) {
            setError("Failed to fetch user data.");
        }
    };

    return (
        <div>
          <div className="page3" >
          <div className="page1" >
            <h2  className="page2">Login Page</h2>
            <form onSubmit={handleLogin}>
            <label>Username:</label>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br/><br/>
                <label>Password:</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br/><br/>
                <label>Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select><br/><br/>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        </div>
        </div>
    );
};

  export const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch users.");
      }
  };
  
  export const addUser = async (newUser) => {
      try {
        const response = await axios.post("http://localhost:5000/users", newUser);
        return response.data;
      } catch (error) {
        throw new Error("Failed to add user.");
      }
  };
  
  export const deleteUser = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
      } catch (error) {
        throw new Error("Failed to delete user.");
      }
  };
  

export default LoginPage;
