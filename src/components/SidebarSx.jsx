import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY;

const ProfiloSidebar = ({ profileId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://striveschool-api.herokuapp.com/api/profile/${profileId}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      if (response.status === 200) {
        setProfile(response.data);
      } else {
        throw new Error(`Errore ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      if (err.response) {
        console.error('Errore nella risposta dell\'API:', err.response.status, err.response.data);
        setError(new Error(`Errore ${err.response.status}: ${err.response.data.message || err.response.statusText}`));
      } else if (err.request) {
        console.error('Nessuna risposta ricevuta:', err.request);
        setError(new Error('Nessuna risposta dal server. Riprova più tardi.'));
      } else {
        console.error('Errore nella configurazione della richiesta:', err.message);
        setError(new Error('Errore nella configurazione della richiesta.'));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [profileId]);

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
        <ListGroupItem>Collegamenti: 2</ListGroupItem>
        <ListGroupItem>Espandi la tua rete</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Button variant="primary">Prova Premium ora</Button>
        <Card.Link href="#">Elementi salvati</Card.Link>
      </Card.Body>
      <Card.Body>
        <Card.Link href="#">Gruppi</Card.Link>
        <Card.Link href="#">Eventi</Card.Link>
      </Card.Body>
      <Card.Body>
        <Button variant="secondary">Scopri di più</Button>
      </Card.Body>
    </Card>
  );
};

export default ProfiloSidebar;
