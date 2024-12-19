import { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem, Container } from 'react-bootstrap';
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

  const position = {
    width:'60px',
    marginLeft: '58px',
    position: 'absolute',
    top: '10%'
  }

  return (
   <Container className='mt-3'>
    <Card style={{ width: '15rem' }} className='border border-rounded'>
        <div className='profile-background' style={{ backgroundColor: '#6495ed', padding: '30px', borderRadius:'5px 5px 0px 0px' }}>
            <Card.Img variant="top" className='rounded-circle border border-white' style={position} src={profile.image} alt="Profile Picture" />
        </div>
      
      <Card.Body >
        <Card.Title className='text-center fw-bold fs-6 pt-4'>{profile.name} {profile.surname}</Card.Title>
        <Card.Subtitle className="mb-2 fs-7 text-muted text-center">{profile.title}</Card.Subtitle>
        <Card.Text>{profile.bio}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem className='fs-7 text-muted'>Collegamenti
            <div className='fs-7 fw-bold text-dark'>Espandi la tua rete</div>
        </ListGroupItem>
        <ListGroupItem className='fs-7 fw-bold text-dark'>
            <div className='fs-7 text-muted'>Raggiungi i tuoi obiettivi di carriera</div>
            <i className='bi bi-square-fill me-2'></i>Prova Premium ora</ListGroupItem>
        <ListGroupItem className='fs-7 fw-bold text-dark'><i className='bi bi-bookmark-fill me-2'></i>Elementi salvati</ListGroupItem>
      </ListGroup>
    </Card>
    </Container>
  );
};

export default ProfiloSidebar;
