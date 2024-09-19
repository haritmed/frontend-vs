import React, { useState, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';

const EmployeeItem = ({ employee }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'EMPLOYEE',
        item: { id: employee.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {employee.firstName} {employee.lastName}
        </div>
    );
};

const TeamItem = ({ team, onDropEmployee }) => {
    const [, drop] = useDrop({
        accept: 'EMPLOYEE',
        drop: (item) => onDropEmployee(item.id, team.id),
    });

    return (
        <div ref={drop} style={{ border: '1px solid black', padding: '10px' }}>
            {team.nom}
        </div>
    );
};

const ChefDeProjetComponent = () => {
    const [employees, setEmployees] = useState([]);  // Initialize as an empty array
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        // Fetch employees and teams
        axios.get('http://localhost:8080/api/employees')
            .then((res) => {
                console.log('API Response for Employees:', res);  // Log full response
                if (Array.isArray(res.data)) {
                    setEmployees(res.data);
                } else {
                    console.error('Expected an array of employees');
                    setEmployees([]);
                }
            })
            .catch((err) => console.error('Error fetching employees:', err));

        axios.get('http://localhost:8080/api/equipe')
            .then((res) => {
                console.log('API Response for Teams:', res);  // Log full response
                if (Array.isArray(res.data)) {
                    setTeams(res.data);
                } else {
                    console.error('Expected an array of teams');
                    setTeams([]);
                }
            })
            .catch((err) => console.error('Error fetching teams:', err));
    }, []);

    const handleDropEmployee = (employeeId, teamId) => {
        axios.put(`http://localhost:8080/api/employees/${employeeId}/team/${teamId}`)
            .then(() => {
                // Optionally refresh data or update UI state
            })
            .catch((err) => console.error('Error assigning employee to team:', err));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h2>Employees</h2>
                    {Array.isArray(employees) && employees.length > 0 ? (
                        employees.map((employee) => (
                            <EmployeeItem key={employee.id} employee={employee} />
                        ))
                    ) : (
                        <p>No employees found</p>
                    )}
                </div>
                <div>
                    <h2>Teams</h2>
                    {Array.isArray(teams) && teams.length > 0 ? (
                        teams.map((team) => (
                            <TeamItem key={team.id} team={team} onDropEmployee={handleDropEmployee} />
                        ))
                    ) : (
                        <p>No teams found</p>
                    )}
                </div>
            </div>
        </DndProvider>
    );
};

export default ChefDeProjetComponent;
