
import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./login";
import AdminDashboard from "./admin";
import UserDashboard from "./user";
import { UserContext } from "./UserContext";

const App = () => {
    const { loggedInUser } = useContext(UserContext);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/admin"
                    element={
                        loggedInUser && loggedInUser.role === "admin" ? (
                            <AdminDashboard />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/user"
                    element={
                        loggedInUser ? (
                            <UserDashboard user={loggedInUser} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
