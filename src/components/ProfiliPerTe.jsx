import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const apiKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZmQwZDBlYTI4NjAwMTUyOGI5NDYiLCJpYXQiOjE3MzQzNDM5NTAsImV4cCI6MTczNTU1MzU1MH0.VyBDNibtSyY_vJnvWCb5kRjmi71qS5zSGNwkr4qBW98`

const ProfiliPerTe = () => {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)

  // Funzione per ottenere 3 profili casuali evitando duplicati
  const getRandomProfiles = (allProfiles, count = 3) => {
    const result = new Set()
    while (result.size < count) {
      const randomIndex = Math.floor(Math.random() * allProfiles.length)
      result.add(allProfiles[randomIndex])
    }
    return Array.from(result)
  }

  const fetchRandomProfiles = async () => {
    try {
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/profile/',
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )

      if (response.ok) {
        const allProfiles = await response.json()
        const randomProfiles = getRandomProfiles(allProfiles, 3)
        setProfiles(randomProfiles)
      } else {
        console.error('Errore durante il fetch dei profili')
      }
    } catch (error) {
      console.error('Errore nel caricamento:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomProfiles()
  }, [])

  if (loading) {
    return <p className='text-center mt-5'>Caricamento in corso...</p>
  }

  return (
    <Container className='p-0 mt-2 border rounded'>
      <Row className='justify-content-center'>
        {profiles.map((profile) => (
          <Col key={profile._id} sm={12} className='mb-4'>
            <Card className='text-center border-0'>
              <Card.Body>
                <Row>
                  <Col sm={2}>
                    <img
                      src={profile.image || 'https://via.placeholder.com/100'}
                      alt={`${profile.name} ${profile.surname}`}
                      className='rounded-circle mb-2'
                      width='60'
                      height='60'
                    />
                  </Col>
                  <Col sm={10}>
                    <Card.Title className='h6 fw-bold'>
                      {profile.name} {profile.surname}
                    </Card.Title>
                    <Card.Text className='text-muted'>
                      {profile.title || 'Titolo non disponibile'}
                    </Card.Text>
                    <Link
                      to={`/profile/${profile._id}`}
                      className='btn border border-dark rounded-pill'
                    >
                      Visualizza profilo
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ProfiliPerTe
