import { useState, useEffect } from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import getMe from './_getProfile';

const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY

const ProfiloSidebar = () => {
  const { profileId: paramProfileId } = useParams(); // Prende il profileId dai parametri URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Recupera i dati con la funzione getMe
        const data = await getMe('get', paramProfileId || null);
        if (!data) {
          throw new Error('Nessun dato disponibile.');
        }
        setProfile(data);
      } catch (err) {
        console.error('Errore nella fetch:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [paramProfileId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={profile.image} alt="Profile Picture" />
      <Card.Body>
        <Card.Title>{profile.name} {profile.surname}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{profile.title}</Card.Subtitle>
        <Card.Text>{profile.bio}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Username: {profile.username}</ListGroupItem>
        <ListGroupItem>Email: {profile.email}</ListGroupItem>
        <ListGroupItem>Area: {profile.area}</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Button variant="primary">Prova Premium ora</Button>
      </Card.Body>
    </Card>
  );
};

export default ProfiloSidebar;
