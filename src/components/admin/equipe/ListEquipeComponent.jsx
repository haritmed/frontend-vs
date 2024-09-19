import React, { useState } from 'react';
import { Card, ListGroup, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import Sidebar from '../Sidebar'; // Assurez-vous que le chemin est correct
import './ListEquipeComponent.css'; // Fichier CSS pour des styles personnalisés

// Initialisation des données d'exemple avec une image de couverture
const initialEquipeData = [
    { id: 1, nom: 'Équipe Alpha', description: 'Développement front-end', imgSrc: '1.jpg' },
    { id: 2, nom: 'Équipe Beta', description: 'Développement back-end', imgSrc: '3.webp' },
    { id: 3, nom: 'Équipe Gamma', description: 'Support technique', imgSrc: '6.jpg' },
];

const ListEquipeComponent = () => {
    const [equipes, setEquipes] = useState(initialEquipeData); // État pour gérer la liste des équipes
    const [showModal, setShowModal] = useState(false);
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [imgSrc, setImgSrc] = useState(null); // Modifier pour gérer l'URL de l'image

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // Fonction pour gérer l'ajout d'une nouvelle équipe
    const handleSubmit = (event) => {
        event.preventDefault();

        const newEquipe = {
            id: equipes.length + 1, // Génère un nouvel ID
            nom,
            description,
            imgSrc: imgSrc ? URL.createObjectURL(imgSrc) : '', // Convertir l'image en URL utilisable
        };
        setEquipes([...equipes, newEquipe]); // Ajoute la nouvelle équipe à l'état
        setNom('');
        setDescription('');
        setImgSrc(null); // Réinitialiser l'image
        handleClose();
    };

    // Gérer le téléchargement d'image
    const handleImageChange = (e) => {
        setImgSrc(e.target.files[0]); // Stocker le fichier image sélectionné
    };

    return (
        <div className='list-equipe-wrapper'>
            <Sidebar/>
            <div className='content'>
                <div className="container mt-5">
                    <div className="d-flex justify-content-between mb-4">
                        <h2>Liste des Équipes</h2>
                        <Button variant="success" onClick={handleShow}>Créer une Équipe</Button>
                    </div>
                    <Row>
                        {equipes.map(equipe => (
                            <Col md={4} key={equipe.id} className="mb-4">
                                <Card className="h-100 shadow-sm border-0 equipe-card">
                                    <div className="card-image-container">
                                        <Card.Img variant="top" src={equipe.imgSrc} className="card-image" />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{equipe.nom}</Card.Title>
                                        <Card.Text>{equipe.description}</Card.Text>
                                        <div className="d-flex justify-content-around">
                                            <Button variant="primary" className="btn-rounded">Modifier</Button>
                                            <Button variant="danger" className="btn-rounded">Supprimer</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Modal pour ajouter une nouvelle équipe */}
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Créer une Nouvelle Équipe</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formNom">
                                    <Form.Label>Nom de l'Équipe</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Entrez le nom de l'équipe"
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Entrez la description de l'équipe"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formImage">
                                    <Form.Label>Photo de l'Équipe</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mt-3 btn-rounded">
                                    Ajouter l'Équipe
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default ListEquipeComponent;