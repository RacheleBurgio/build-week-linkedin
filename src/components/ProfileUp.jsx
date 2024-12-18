import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import ProfilePictureUpload from './ProfilePictureUpload';


const ProfileUp = ({ profileId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  // Funzione per recuperare i dettagli del profilo
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`https://striveschool-api.herokuapp.com/api/profile/${profileId}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      setProfile(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // useEffect per caricare il profilo al caricamento del componente
  useEffect(() => {
    fetchProfile();
  }, [profileId]);

  // Funzione per gestire la modifica del profilo
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://striveschool-api.herokuapp.com/api/profile/${profileId}`, profile, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      setProfile(response.data); // Aggiorna il profilo con i dati modificati
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container className="mt-4">
      <h2>Modifica Profilo</h2>
      <ProfilePictureUpload userId={profileId} onUpload={(data) => setProfile({ ...profile, image: data.image })} />
      <Form onSubmit={handleProfileUpdate}>
        <Form.Group controlId="formName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formSurname">
          <Form.Label>Cognome</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            value={profile.surname}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTitle">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={profile.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBio">
          <Form.Label>Biografia</Form.Label>
          <Form.Control
            as="textarea"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formArea">
          <Form.Label>Area</Form.Label>
          <Form.Control
            type="text"
            name="area"
            value={profile.area}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Salva Modifiche</Button>
      </Form>
    </Container>
  );
};

export default ProfileUp;
