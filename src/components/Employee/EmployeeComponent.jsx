import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeComponent.css';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/employees';
const PROFILE_API_BASE_URL = 'http://localhost:8080/api/profile';

const EmployeeComponent = () => {
    const [employeeName, setEmployeeName] = useState('');
    const [employee, setEmployee] = useState(null); // Ensure this includes `id`
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hoursWorked, setHoursWorked] = useState('');

    useEffect(() => {
        if (employeeName) {
            setLoading(true);
            const fetchEmployeeData = async () => {
                try {
                    // Fetch employee profile based on name
                    const response = await axios.get(`${PROFILE_API_BASE_URL}?name=${employeeName}`);
                    setEmployee(response.data); // Make sure this data includes `id`
                    setError(null); // Clear previous errors
                } catch (err) {
                    setError('Error fetching employee data');
                    setEmployee(null); // Clear previous employee data
                } finally {
                    setLoading(false);
                }
            };

            fetchEmployeeData();
        }
    }, [employeeName]);

    const handleNameChange = (event) => {
        setEmployeeName(event.target.value);
    };

    const handleHoursChange = (event) => {
        setHoursWorked(event.target.value);
    };

    const handleHoursSubmit = async (event) => {
        event.preventDefault();
        if (employee && employee.id && hoursWorked) {
            try {
                // Ensure the employee.id is used in the PUT request URL
                await axios.put(`${EMPLOYEE_API_BASE_URL}/${employee.id}`, {
                    ...employee,
                    hourWorked: parseInt(hoursWorked) // Update hoursWorked
                });
                alert('Hours updated successfully');
                setHoursWorked('');
            } catch (err) {
                setError('Error updating hours worked');
            }
        } else {
            setError('Invalid employee or missing hours worked');
        }
    };

    const handleSearchClick = () => {
        setEmployeeName(employeeName.trim()); // Set trimmed name to trigger useEffect
    };

    return (
        <div className="employee-container">
            <form className="employee-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="employeeName">Enter Employee Name:</label>
                <input
                    type="text"
                    id="employeeName"
                    value={employeeName}
                    onChange={handleNameChange}
                />
                <button type="button" onClick={handleSearchClick}>Search</button>
            </form>

            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}

            {employee && (
                <div className="employee-profile">
                    <h2>{employee.firstName}</h2> {/* Use firstName instead of name */}
                    <div className="profile-item">Email: {employee.email || 'N/A'}</div>
                    <div className="profile-item">Age: {employee.age}</div>
                    <div className="profile-item">Function: {employee.function}</div>
                    <div className="profile-item">Team: {employee.team}</div>
                    <div className="profile-item">Project: {employee.project}</div>
                    <div className="profile-item">Salary: ${employee.salary}</div>

                    <form className="hours-form" onSubmit={handleHoursSubmit}>
                        <label htmlFor="hoursWorked">Hours Worked:</label>
                        <input
                            type="number"
                            id="hoursWorked"
                            value={hoursWorked}
                            onChange={handleHoursChange}
                            min="0"
                            required
                        />
                        <button type="submit">Update Hours</button>
                    </form>
                </div>
            )}

            {!loading && !error && !employee && (
                <div>No employee data available for this name</div>
            )}
        </div>
    );
};

export default EmployeeComponent;
