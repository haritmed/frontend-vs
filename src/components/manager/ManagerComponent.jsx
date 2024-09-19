import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerComponent.css'; // Ensure you have styles for your component
import { getAdminProfile } from '../../services/GestionnaireService';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/employees';
const PROFILE_API_BASE_URL = 'http://localhost:8080/api/profile'; // Adjust this endpoint as needed

const ManagerComponent = ( ) => {
    const [admin, setAdmin] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [profileData, setProfileData] = useState({
        id: '',  
        name: '',
        age: '',
        function: '',
        salary: '',
        project: '',
        team: ''
    });
    const [showForm, setShowForm] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // Fetch admin details using AdminService
        getAdminProfile()
            .then(response => setAdmin(response.data))
            .catch(error => console.error("Error fetching admin profile:", error));
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        axios.get(EMPLOYEE_API_BASE_URL)
            .then(response => setEmployees(response.data))
            .catch(error => console.error('Error fetching employees:', error));
    };

    const handleEmployeeSelect = (employee) => {
        setSelectedEmployee(employee);
        setProfileData({
            id: '',  
            name: '', 
            age: '',
            function: '',
            salary: '',
            project: '',
            team: ''
        });
        setShowForm(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProfile = {
            id: profileData.id,
            name: profileData.name,
            age: parseInt(profileData.age), 
            function: profileData.function,
            salary: parseFloat(profileData.salary), 
            project: profileData.project,
            team: profileData.team
        };
        axios.post(PROFILE_API_BASE_URL, newProfile)
            .then(response => {
                setShowForm(false);
                fetchProfile(newProfile.id); 
            })
            .catch(error => console.error('Error creating profile:', error));
    };

    const fetchProfile = (profileId) => {
        axios.get(`${PROFILE_API_BASE_URL}/${profileId}`)
            .then(response => setProfile(response.data))
            .catch(error => console.error('Error fetching profile:', error));
    };

    return (
        <div className="manager-container">
            <Sidebar admin={admin} fetchEmployees={fetchEmployees} />
            <div className="content-section">
                <h2>Employee Management</h2>
                <div className="employee-list">
                    {employees.length > 0 ? (
                        employees.map(employee => (
                            <div key={employee.id} className="employee-item">
                                <h3>{employee.firstName}</h3>
                                <button className='create-profile' onClick={() => handleEmployeeSelect(employee)}>Create Profile</button>
                                <button 
                                    className="view-profile-button" 
                                    onClick={() => fetchProfile(employee.id)}
                                >
                                    View Profile
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No employees available.</p>
                    )}
                </div>

                {showForm && (
                    <div className="profile-form-overlay">
                        <div className="profile-form-content">
                            <h3>Create Profile for {selectedEmployee.name}</h3>
                            <form onSubmit={handleSubmit} className="profile-form">
                                {/* Form fields */}
                            </form>
                        </div>
                    </div>
                )}

                {profile && (
                    <div className="profile-details">
                        <h3>Profile Details</h3>
                        {/* Display profile details */}
                    </div>
                )}
              
            </div>
        </div>
    );
};

const Sidebar = ({ admin, fetchEmployees }) => (
    <div className="sidebar">
        {/* Profile Section */}
        {admin && (
                <div className="profile-section">
                    <img 
                        src={`admin.jpeg`} // Adjust this path as needed
                        alt="Admin Profile"
                        className="profile-picture"
                    />
                    <div className="profile-info">
                        <p className="profile-name">{admin.nom} {admin.prenom}</p>
                        <p className="profile-email">{admin.email}</p>
                    </div>
                </div>
            )}
      
        <div className="sidebar-buttons">
            <button onClick={fetchEmployees}>View Employees</button>
            <button onClick={() => window.location.href = '/profiles'}>View Profiles</button>
        </div>
    </div>
);

export default ManagerComponent;
