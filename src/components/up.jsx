import React from 'react';
import { Container, Card, Button, ListGroup, Row, Col } from 'react-bootstrap';
import '../assets/css/custom-bootstrap.css';

// Componente principale per visualizzare il profilo
const ColonnaCentraleAlto = ({ profile, recommendedContacts, analyticsData, activityList }) => {
  return (
    <Container className="mt-4">
      <Card className="mb-4">
        <Card.Body>
          <Row className="d-flex align-items-center">
            <Col xs="auto">
              <img
                src={profile.image || 'https://via.placeholder.com/150'}
                alt={`${profile.name} ${profile.surname}`}
                className="rounded-circle"
                style={{ width: '100px', height: '100px' }}
              />
            </Col>
            <Col>
              <h1 className="h5">{profile.name} {profile.surname}</h1>
              <h2 className="h6 text-muted">{profile.title}</h2>
              <p className="mb-1">{profile.bio}</p>
              <p className="text-primary">{profile.area}</p>
              <div className="mt-3">
                <Button variant="primary" className="me-2">Connect</Button>
                <Button variant="outline-primary">Message</Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Sezione Consigliati per Te */}
      <RecommendedForYou contacts={recommendedContacts} />

      {/* Sezione Analisi */}
      <Analytics data={analyticsData} />

      {/* Sezione Attività */}
      <Activity activities={activityList} />
    </Container>
  );
};

// Componente Consigliati per Te
const RecommendedForYou = ({ contacts }) => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <h5>Consigliati per te</h5>
      </Card.Header>
      <Card.Body>
        <ListGroup>
          {contacts.map((contact, index) => (
            <ListGroup.Item key={index}>{contact}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

// Componente Analisi
const Analytics = ({ data }) => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <h5>Analisi</h5>
      </Card.Header>
      <Card.Body>
        <p>Visualizzazioni del profilo: {data.profileViews}</p>
        <p>Visualizzazioni dei post: {data.postViews}</p>
      </Card.Body>
    </Card>
  );
};

// Componente Attività
const Activity = ({ activities }) => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <h5>Attività</h5>
      </Card.Header>
      <Card.Body>
        <ListGroup>
          {activities.map((activity, index) => (
            <ListGroup.Item key={index}>{activity}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ColonnaCentraleAlto;