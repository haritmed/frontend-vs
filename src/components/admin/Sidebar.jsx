import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { getAdminProfile } from '../../services/AdminService'; // Import the AdminService
import './Sidebar.css';

const Sidebar = () => {
    const [admin, setAdmin] = useState(null);
    const navigate = useNavigate(); // Initialize navigate hook

    useEffect(() => {
        // Fetch admin details using AdminService
        getAdminProfile()
            .then(response => setAdmin(response.data))
            .catch(error => console.error("Error fetching admin profile:", error));
    }, []);

    // Navigation functions for buttons
    const goToEmployees = () => navigate('/employees');
    const goToProjects = () => navigate('/projects');
    const goToTeams = () => navigate('/teams');
    const goToHome = () => navigate('/dashboard');

    return (
        <div className="sidebar">
            <div className="logo-container">
                <img src="/logo.png" alt="Neo TechiT Logo" className="logo" />
            </div>
            <div className="button-container">
                <button className="dashboard-button" onClick={goToEmployees}>
                    <i className="fas fa-users"></i>
                    Employees
                </button>
                <button className="dashboard-button" onClick={goToProjects}>
                    <i className="fas fa-briefcase"></i>
                    Projects
                </button>
                <button className="dashboard-button" onClick={goToTeams}>
                    <i className="fas fa-users-cog"></i>
                    Teams
                </button>
                <button className="home-button" onClick={goToHome}>
                    Home
                </button>
            </div>
            {/* Profile Section */}
            {admin && (
                <div className="profile-section">
                    <img 
                        src={`admin.jpeg`} // Adjust this path as needed
                        alt="Admin Profile"
                        className="profile-picture"
                    />
                    <div className="profile-info">
                        <p className="profile-name">{admin.firstName} {admin.lastName}</p>
                        <p className="profile-email">{admin.email}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
