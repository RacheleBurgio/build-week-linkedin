import { useState, useEffect } from 'react'
import { Card, ListGroup, ListGroupItem, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ProfiloSidebar = () => {
  const profile = useSelector((state) => state.profile.me)
  console.log('Profile Sidebar', profile)
  useEffect(() => {}, [profile])

  const position = {
    width: '60px',
    marginLeft: '58px',
    position: 'absolute',
    top: '10%',
  }

  return (
    <Container className='mt-3'>
      <Card style={{ width: '15rem' }} className='border border-rounded'>
        <div
          className='profile-background'
          style={{
            backgroundColor: '#6495ed',
            padding: '30px',
            borderRadius: '5px 5px 0px 0px',
          }}
        >
          <Link to={`/profile/${profile.id}`}>
            <Card.Img
              variant='top'
              className='rounded-circle border border-white'
              style={position}
              src={profile.image}
              alt='Profile Picture'
            />
          </Link>
        </div>

        <Card.Body>
          <Card.Title className='text-center fw-bold fs-6 pt-4'>
            <Link to={`/profile/${profile.id}`}>
              {profile.name} {profile.surname}
            </Link>
          </Card.Title>
          <Card.Subtitle className='mb-2 fs-7 text-muted text-center'>
            {profile.title}
          </Card.Subtitle>
          <Card.Text>{profile.bio}</Card.Text>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroupItem className='fs-7 text-muted'>
            Collegamenti
            <div className='fs-7 fw-bold text-dark'>Espandi la tua rete</div>
          </ListGroupItem>
          <ListGroupItem className='fs-7 fw-bold text-dark'>
            <div className='fs-7 text-muted'>
              Raggiungi i tuoi obiettivi di carriera
            </div>
            <i className='bi bi-square-fill me-2'></i>Prova Premium ora
          </ListGroupItem>
          <ListGroupItem className='fs-7 fw-bold text-dark'>
            Elementi salvati
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Container>
  )
}

export default ProfiloSidebar
