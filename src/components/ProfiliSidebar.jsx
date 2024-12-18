import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { IoMdPersonAdd } from 'react-icons/io'

// Recupera la API key dalle variabili d'ambiente
const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY

const ProfiliSidebar = (props) => {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)

  // Funzione per ottenere 3 profili casuali evitando duplicati
  const getRandomProfiles = (allProfiles, count = props.profileNumber) => {
    const result = new Set()
    while (result.size < count) {
      const randomIndex = Math.floor(Math.random() * allProfiles.length)
      result.add(allProfiles[randomIndex])
    }
    return Array.from(result)
  }

  const fecthProfiles = async () => {
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
        setProfiles(allProfiles)
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
    fecthProfiles()
  }, [])

  if (loading) {
    return <p className='text-center mt-5'>Caricamento in corso...</p>
  }

  const randomProfiles = getRandomProfiles(profiles, props.profileNumber)

  return (
    <Container fluid className='p-0 mt-2 border rounded'>
      <h5 className='mt-2 ms-4 text-bold'>{props.title}</h5>
      <Row className='justify-content-center'>
        {randomProfiles.map((profile) => (
          <Col key={profile._id} sm={12} className='mb-4'>
            <Card className=' border-0'>
              <Card.Body>
                <Row>
                  <Col xs={3}>
                    <img
                      src={profile.image || 'https://via.placeholder.com/100'}
                      alt={`${profile.name} ${profile.surname}`}
                      className='rounded-circle mb-2'
                      width='50'
                      height='50'
                    />
                  </Col>
                  <Col xs={9}>
                    <Card.Title className='h6 fw-bold'>
                      {profile.name} {profile.surname}
                    </Card.Title>
                    <Card.Text className='text-muted'>
                      {profile.title || 'Titolo non disponibile'}
                    </Card.Text>

                    {props.type === 'consigliati' && (
                      <Link
                        to={`/profile/${profile._id}`}
                        className='btn btn-outline-dark rounded-pill btn-sm'
                      >
                        <IoMdPersonAdd />
                        Collegati
                      </Link>
                    )}
                    {props.type === 'perTe' && (
                      <Link
                        to={`/profile/${profile._id}`}
                        className='btn btn-outline-dark rounded-pill btn-sm'
                      >
                        Visualizza Profilo
                      </Link>
                    )}
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

export default ProfiliSidebar
