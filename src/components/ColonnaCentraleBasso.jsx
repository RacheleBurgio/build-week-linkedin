import React, { useEffect, useState } from 'react'
import { Card, ListGroup, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import '../assets/css/custom-bootstrap.css'
import { MdOutlineDiamond } from 'react-icons/md'

// Funzione per formattare la data in "Mese Anno" o "Present"
const formatDate = (dateString) => {
  if (!dateString) return 'Present'
  const options = { year: 'numeric', month: 'long' }
  return new Date(dateString).toLocaleDateString('it-IT', options)
}

// Componente per la singola card di esperienza
const ExperienceCard = ({
  role,
  company,
  startDate,
  endDate,
  description,
  area,
}) => {
  return (
    <ListGroup variant='flush'>
      <ListGroup.Item>
        <Row className='border border-0 border-bottom border-1'>
          <Col className='d-flex justify-content-center align-items-start col-auto p-1'>
            {company.image ? (
              <img
                style={{ width: '50px' }}
                src={company.image}
                alt={`company-logo: ${company}`}
              />
            ) : (
              <img
                style={{ width: '50px' }}
                src={`https://placehold.co/250x250/000000/00FF00/?text=${
                  company.split(' #')[0]
                }`}
                alt={`company-logo: ${company}`}
              />
            )}
          </Col>
          <Col className='d-flex flex-column align-items-start justify-content-start p-1'>
            <div className='fs-7 fw-bold'>{role}</div>
            <div className='fs-7 text-secondary'>{company.split(' #')[0]}</div>
            <div className='fs-7 text-secondary'>
              {formatDate(startDate)} - {formatDate(endDate)} • {area}
            </div>
            <div className='fs-7 my-3'>{description}</div>
          </Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  )
}

// Componente principale per visualizzare la sezione dinamica
const ColonnaCentraleBasso = (props) => {
  const [experiences, setExperiences] = useState([]) // Stato locale per le esperienze

  // Recupera la API key dalle variabili d'ambiente
  const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY

  // Funzione per recuperare le esperienze dall'API
  const fetchExperiences = async () => {
    try {
      const response = await axios.get(
        `https://striveschool-api.herokuapp.com/api/profile/${props.userId}/experiences`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      setExperiences(response.data) // Aggiorna lo stato con i dati ricevuti
    } catch (error) {
      console.error('Error fetching experiences:', error)
    }
  }

  // useEffect per richiamare la fetch al caricamento del componente o al cambio di userId
  useEffect(() => {
    fetchExperiences()
  }, [props.userId])

  return (
    <Container className='mt-4 border rounded border-1 p-2'>
      <section id={props.section}>
        <h3 className='mb-4 fs-6 fw-bold'>
          {props.section.charAt(0).toUpperCase() + props.section.slice(1)}
        </h3>
        {experiences
          .filter((exp) => exp.company.includes(`#${props.section}#`))
          .map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
      </section>
    </Container>
  )
}

export default ColonnaCentraleBasso
