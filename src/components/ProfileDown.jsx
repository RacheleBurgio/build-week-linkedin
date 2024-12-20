import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

import { MdEdit, MdAdd } from "react-icons/md";

// Funzione per formattare la data in "Mese Anno" o "Present"
const formatDate = (dateString) => {
  if (!dateString) return "Present";
  const options = { year: "numeric", month: "long" };
  return new Date(dateString).toLocaleDateString("it-IT", options);
};

// Componente per la singola esperienza
const ExperienceCard = ({
  experience,
  onDelete,
  onUpdate,
  isEditing,
  isAdding, // Nuova prop per distinguere la modalità aggiunta
  setEditingId,
  isMyProfile,
}) => {
  const [editedExperience, setEditedExperience] = useState(experience);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExperience({ ...editedExperience, [name]: value });
  };

  const handleSave = () => {
    onUpdate(editedExperience);
    if (isAdding) {
      // Se siamo in modalità aggiunta, chiudiamo direttamente il form
      onDelete();
    } else {
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    if (isAdding) {
      onDelete(); // Chiude il form in modalità aggiunta
    } else {
      setEditingId(null);
    }
  };

  return (
    <div className="mb-3 border-bottom pb-3">
      {isEditing ? (
        <Form className="fs-7">
          {/* Form per modificare o aggiungere l'esperienza */}
          <Form.Group className="mb-3">
            <Form.Label>Ruolo</Form.Label>
            <Form.Control
              className="fs-7"
              type="text"
              name="role"
              value={editedExperience.role}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Azienda</Form.Label>
            <Form.Control
              className="fs-7"
              type="text"
              name="company"
              value={editedExperience.company}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data Inizio</Form.Label>
            <Form.Control
              className="fs-7"
              type="date"
              name="startDate"
              value={editedExperience.startDate}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data Fine</Form.Label>
            <Form.Control
              className="fs-7"
              type="date"
              name="endDate"
              value={editedExperience.endDate}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              className="fs-7"
              as="textarea"
              rows={3}
              name="description"
              value={editedExperience.description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Area</Form.Label>
            <Form.Control
              className="fs-7"
              type="text"
              name="area"
              value={editedExperience.area}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>URL Immagine</Form.Label>
            <Form.Control
              className="fs-7"
              type="text"
              name="image"
              value={editedExperience.image}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button
            variant="success"
            onClick={handleSave}
            size="sm"
            className="me-2"
          >
            Salva
          </Button>
          <Button
            variant="secondary"
            onClick={handleCancel}
            size="sm"
            className="me-2"
          >
            Annulla
          </Button>
          {!isAdding && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(experience._id)}
            >
              Elimina
            </Button>
          )}
        </Form>
      ) : (
        <div className="d-flex flex-column">
          {isMyProfile && (
            <div className="d-flex justify-content-end mb-2">
              <Button
                variant="link"
                className="p-0 text-decoration-none"
                onClick={() => setEditingId(experience._id)}
              >
                <MdEdit />
              </Button>
            </div>
          )}
          <div className="d-flex align-items-start mb-2">
            {experience.image ? (
              <img
                style={{ width: "50px", marginRight: "10px" }}
                src={experience.image}
                alt={`company-logo: ${experience.company}`}
              />
            ) : (
              <img
                style={{ width: "50px", marginRight: "10px" }}
                src={`https://placehold.co/250x250/000000/00FF00/?text=${
                  experience.company.split(" #")[0]
                }`}
                alt={`company-logo: ${experience.company}`}
              />
            )}
            <div>
              <div className="fs-7 fw-bold">{experience.role}</div>
              <div className="fs-7 text-secondary">
                {experience.company.split(" #")[0]}
              </div>
              <div className="fs-7 text-secondary">
                {formatDate(experience.startDate)} -{" "}
                {formatDate(experience.endDate)} • {experience.area}
              </div>
            </div>
          </div>
          <div className="fs-7 mb-3">{experience.description}</div>
        </div>
      )}
    </div>
  );
};

// Componente principale per visualizzare la sezione dinamica
const ProfileDown = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [experiences, setExperiences] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [addingExperience, setAddingExperience] = useState(false);

  const me = useSelector((state) => state.profile.me);

  const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY;

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://striveschool-api.herokuapp.com/api/profile/${props.profileId}/experiences`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      setExperiences(response.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addExperience = async (newExperience) => {
    try {
      const response = await axios.post(
        `https://striveschool-api.herokuapp.com/api/profile/${props.profileId}/experiences`,
        newExperience,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      setExperiences([...experiences, response.data]); // Aggiungi la nuova esperienza alla lista
      setAddingExperience(false);
    } catch (error) {
      console.error("Error adding experience:", error);
    }
  };

  const updateExperience = async (updatedExperience) => {
    try {
      await axios.put(
        `https://striveschool-api.herokuapp.com/api/profile/${props.profileId}/experiences/${updatedExperience._id}`,
        updatedExperience,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      setExperiences((prev) =>
        prev.map((exp) =>
          exp._id === updatedExperience._id ? updatedExperience : exp
        )
      ); // Aggiorna solo l'esperienza modificata
    } catch (error) {
      console.error("Error updating experience:", error);
    }
  };

  const deleteExperience = async (id) => {
    try {
      await axios.delete(
        `https://striveschool-api.herokuapp.com/api/profile/${props.profileId}/experiences/${id}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      fetchExperiences();
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [props.profileId]);

  const handleAddClick = () => {
    setAddingExperience(true);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Alert variant="danger">
          Errore nel recupero del profilo dell'utente {props.profileId}
        </Alert>
      </div>
    );
  }

  return (
    <Container className="m-4 border rounded border-1 bg-white">
      <section id={props.section}>
        <h3 className="mb-4 fs-6 fw-bold d-flex align-items-center justify-content-between">
          {props.section.charAt(0).toUpperCase() + props.section.slice(1)}
          {props.profileId === me._id && (
            <Button
              variant="link"
              className="p-0 text-decoration-none"
              onClick={handleAddClick}
            >
              <MdAdd size={20} />
            </Button>
          )}
        </h3>
        {addingExperience && (
          <ExperienceCard
            experience={{
              role: "",
              company: "",
              startDate: "",
              endDate: "",
              description: "",
              area: "",
              image: "",
            }}
            onUpdate={(newExperience) => {
              addExperience(newExperience);
            }}
            onDelete={() => setAddingExperience(false)} // Chiude il form
            isEditing={true}
            isAdding={true} // Indica che è una nuova esperienza
            setEditingId={() => {}}
            isMyProfile={true}
          />
        )}

        {experiences.map((exp) => (
          <ExperienceCard
            key={exp._id}
            experience={exp}
            onUpdate={updateExperience}
            onDelete={deleteExperience}
            isEditing={editingId === exp._id}
            setEditingId={setEditingId}
            isMyProfile={props.profileId === me._id}
          />
        ))}
      </section>
    </Container>
  );
};

export default ProfileDown;
