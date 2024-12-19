
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfilePictureUpload from './ProfilePictureUpload';
import { FaEdit } from 'react-icons/fa';

const ProfileUp = () => {
  const [user, setUser] = useState({
    name: "Mario Rossi",
    title: "Sviluppatore Frontend",
    description: "Appassionato di tecnologia e innovazione. Sempre alla ricerca di nuove sfide.",
    profileImage: "https://via.placeholder.com/150", // Sostituisci con l'URL dell'immagine del profilo
  });

  const [isEditing, setIsEditing] = useState(false);

  // Esempio di elementi raccomandati (sostituisci con dati reali)
  const recommendedItems = [
    { id: 1, title: "Giovanni Bianchi", link: "#" },
    { id: 2, title: "Laura Verdi", link: "#" },
    { id: 3, title: "Marco Neri", link: "#" },
  ];

  const handleImageChange = (newImage) => {
    setUser({ ...user, profileImage: newImage });
  };

  const handleSave = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedUser = {
      ...user,
      name: formData.get('name'),
      title: formData.get('title'),
      description: formData.get('description'),
    };
    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="p-4 rounded-top">
      <div className="d-flex align-items-center">
        <img
          src={user.profileImage}
          alt={`${user.name}'s profile`}
          className="img-fluid rounded-circle me-3"
          style={{ width: '100px', height: '100px' }}
        />
        <div className="text-left flex-grow-1">
          <h1 className="h4">{user.name}</h1>
          <h2 className="h6">{user.title}</h2>
          <p>{user.description}</p>
        </div>
        <button className="btn btn-light" onClick={() => setIsEditing(true)}>
          <FaEdit />
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSave} className="mt-3">
          <ProfilePictureUpload onImageChange={handleImageChange} />
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nome:</label>
            <input type="text" className="form-control" id="name" name="name" defaultValue={user.name} required />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Titolo:</label>
            <input type="text" className="form-control" id="title" name="title" defaultValue={user.title} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descrizione:</label>
            <textarea className="form-control" id="description" name="description" defaultValue={user.description} required />
          </div>
          <button type="submit" className="btn btn-success">Salva</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={() => setIsEditing(false)}>Annulla</button>
        </form>
      )}

      {/* Sezione Consigliati per te */}
      <div className="mt-4">
        <h3 className="h5">Consigliati per te</h3>
        <ul className="list-group">
          {recommendedItems.map(item => (
            <li key={item.id} className="list-group-item">
              <a href={item.link} className="text-decoration-none text-primary">{item.title}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Sezione Analisi del Profilo */}
      <div className="mt-4">
        <h3 className="h5">Analisi del Profilo</h3>
        <div className="card">
          <div className="card-body">
            <p><strong>Visibilità del Profilo:</strong> 85%</p>
            <p><strong>Connessioni:</strong> 150</p>
            <p><strong>Articoli Pubblicati:</strong> 5</p>
            <p><strong>Competenze Aggiunte:</strong> 10</p>
            <p><strong>Feedback Positivi:</strong> 95%</p>
          </div>
        </div>
      </div>

      {/* Sezione Attività del Profilo */}
      <div className="mt-4">
        <h3 className="h5">Attività Recenti</h3>
        <ul className="list-group">
          <li className="list-group-item">Commentato su "Le ultime tendenze nel frontend".</li>
          <li className="list-group-item">Pubblicato un articolo: "Introduzione a React Hooks".</li>
          <li className="list-group-item">Condiviso un post su LinkedIn riguardo le nuove tecnologie.</li>
          <li className="list-group-item">Partecipato a un webinar su Sviluppo Web.</li>
          <li className="list-group-item">Aggiornato le competenze: "TypeScript" e "GraphQL".</li>
        </ul>
      </div>
    </div>
  );
};
import React, { useEffect, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import ProfilePictureUpload from './ProfilePictureUpload'

const ProfileUp = ({ profileId }) => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY

  // Funzione per recuperare i dettagli del profilo
  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${profileId}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setProfile(data)
      setLoading(false)
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  // useEffect per caricare il profilo al caricamento del componente
  useEffect(() => {
    fetchProfile()
  }, [profileId])

  // Funzione per gestire la modifica del profilo
  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${profileId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(profile),
        }
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const updatedProfile = await response.json()
      setProfile(updatedProfile) // Aggiorna il profilo con i dati modificati
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <Container className='mt-4'>
      <h2>Modifica Profilo</h2>
      <ProfilePictureUpload
        userId={profileId}
        onUpload={(data) => setProfile({ ...profile, image: data.image })}
      />
      <Form onSubmit={handleProfileUpdate}>
        <Form.Group controlId='formName'>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={profile.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId='formSurname'>
          <Form.Label>Cognome</Form.Label>
          <Form.Control
            type='text'
            name='surname'
            value={profile.surname}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId='formTitle'>
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            type='text'
            name='title'
            value={profile.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId='formBio'>
          <Form.Label>Biografia</Form.Label>
          <Form.Control
            as='textarea'
            name='bio'
            value={profile.bio}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId='formArea'>
          <Form.Label>Area</Form.Label>
          <Form.Control
            type='text'
            name='area'
            value={profile.area}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Salva Modifiche
        </Button>
      </Form>
    </Container>
  )
}

export default ProfileUp
