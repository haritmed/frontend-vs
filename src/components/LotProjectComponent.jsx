import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LOT_PROJECT_API_BASE_URL = 'http://localhost:8080/api/lotProjet'; // Replace with the actual endpoint

const LotProjectComponent = () => {
    const { projectId } = useParams();
    const [lots, setLots] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        fetchProjectLots();
    }, [projectId]);

    const fetchProjectLots = () => {
        axios.get(`${LOT_PROJECT_API_BASE_URL}?projectId=${projectId}`)
            .then((response) => {
                setLots(response.data);
            })
            .catch((error) => console.error('Error fetching lots:', error));
    };

    return (
        <div>
            <h2>Lots for Project ID: {projectId}</h2>
            <div className="lot-container">
                {lots.length > 0 ? (
                    lots.map((lot) => (
                        <div key={lot.id} className="lot-item">
                            <h3>{lot.nom}</h3>
                            <p><strong>Allocated Hours:</strong> {lot.heuresAllouees}</p>
                        </div>
                    ))
                ) : (
                    <p>No lots available for this project.</p>
                )}
            </div>
        </div>
    );
};

export default LotProjectComponent;
