import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularChart from '../CircularChart'; // Assuming you already created this
import ProjectHoursChart from '../ProjectHoursChart'; // Assuming this is already created
import './ProjectComponent.css';
import Sidebar from '../Sidebar'; // Ensure the path is correct

const ProjectComponent = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ nom: '', budgetTotal: '', heuresAllouees: '' });
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState(null);

    useEffect(() => {
        // Fetching the list of projects
        axios.get('http://localhost:8080/api/projet')
            .then(response => setProjects(response.data))
            .catch(error => console.error("Error fetching projects:", error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProject(prevState => ({ ...prevState, [name]: value }));
    };

    const addProject = () => {
        axios.post('http://localhost:8080/api/projet', newProject)
            .then(response => {
                setProjects([...projects, response.data]);
                setShowForm(false);
                setNewProject({ nom: '', budgetTotal: '', heuresAllouees: '' }); // Reset form
            })
            .catch(error => console.error("Error adding project:", error));
    };

    const editProject = (id) => {
        // Fetch the project to edit and populate the form
        const projectToEdit = projects.find(project => project.id === id);
        setNewProject({
            nom: projectToEdit.nom,
            budgetTotal: projectToEdit.budgetTotal,
            heuresAllouees: projectToEdit.heuresAllouees
        });
        setCurrentProjectId(id); // Store the project ID
        setEditMode(true); // Set edit mode to true
        setShowForm(true); // Show the form
    };

    const updateProject = () => {
        // Send PUT request to update project
        axios.put(`http://localhost:8080/api/projet/${currentProjectId}`, newProject)
            .then(response => {
                setProjects(projects.map(project => project.id === currentProjectId ? response.data : project));
                setShowForm(false);
                setEditMode(false);
                setNewProject({ nom: '', budgetTotal: '', heuresAllouees: '' }); // Reset form
            })
            .catch(error => console.error("Error updating project:", error));
    };

   
    const deleteProject = (id) => {
        // Send DELETE request to backend
        axios.delete(`http://localhost:8080/api/projet/${id}`)
            .then(() => {
                setProjects(projects.filter(project => project.id !== id)); // Remove the deleted project from the list
            })
            .catch(error => console.error("Error deleting project:", error));
    };
    return (
        <div className="page-container">
            <Sidebar className="sidebar" />
            <div className="main-content">
                <h2>Projects</h2>
                <button className="add-project" onClick={() => {
                    setShowForm(true);
                    setEditMode(false);
                    setNewProject({ nom: '', budgetTotal: '', heuresAllouees: '' }); // Clear the form for adding
                }}>
                    Add Project
                </button>

                {showForm && (
                    <div>
                        <h3>{editMode ? "Edit Project" : "Add New Project"}</h3>
                        <form>
                            <input
                                type="text"
                                name="nom"
                                placeholder="Nom"
                                value={newProject.nom}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="budgetTotal"
                                placeholder="Budget Total"
                                value={newProject.budgetTotal}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="heuresAllouees"
                                placeholder="Heures Allouées"
                                value={newProject.heuresAllouees}
                                onChange={handleChange}
                            />
                            {editMode ? (
                                <button type="button" onClick={updateProject}>Update Project</button>
                            ) : (
                                <button type="button" onClick={addProject}>Submit</button>
                            )}
                        </form>
                    </div>
                )}

                <div className="projects-grid">
                    {projects.map(project => (
                        <div key={project.id} className="project-container">
                            <h3>{project.nom}</h3>
                            <p>Budget: {project.budgetTotal}</p>
                            <p>Heures Allouées: {project.heuresAllouees}</p>
                            
                            <button className="edit" onClick={() => editProject(project.id)}>Edit</button>
                            <button className="delete" onClick={() => deleteProject(project.id)}>Delete</button>
                            <button className="info" onClick={() => console.log("Show Info: Charts!")}>
                                Infos (Charts)
                            </button>
                            <button className="viewLot" onClick={() => console.log("View Lot!")}>View Lot</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectComponent;
