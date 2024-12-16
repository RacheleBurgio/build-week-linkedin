import React from 'react'
import { Card, ListGroup, Container, Row, Col, Image } from 'react-bootstrap'
import { MdOutlineDiamond } from 'react-icons/md'

import '../assets/css/custom-bootstrap.css'

const ExperienceCard = ({
  role,
  company,
  duration,
  location,
  description,
  skills,
}) => {
  return (
    <>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <Row className='border border-0 border-bottom border-1'>
            <Col className='d-flex justify-content-center align-items-start col-auto p-1'>
              <img
                style={{ width: '50px' }}
                src={`https://placehold.co/250x250/000000/00FF00/?text=${company}`}
              />
            </Col>
            <Col className='d-flex flex-column align-items-start justify-content-start p-1'>
              <div className='fs-7 fw-bold'>{role}</div>
              <div className='fs-7 text-secondary'>{company}</div>
              <div className='fs-7 text-secondary'>
                {duration} • {location}
              </div>
              <div className='fs-7 my-3'>{description}</div>
              {skills && (
                <div className='fs-7 fw-bold text-muted mb-3'>
                  <MdOutlineDiamond /> {skills.join(', ')}
                </div>
              )}
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}

const items = [
  // Esperienze
  {
    role: 'Senior Systems Engineer / Owner',
    company: 'Remote Italia S.r.l.',
    duration: 'Jan 2006 - Present • 19 yrs',
    location: 'Roma, Italia - Hybrid',
    description:
      'Progettazione, Implementazione e Conduzione sistemi informativi per la media impresa.',
    skills: ['Fortinet', 'Wireshark', '+5 skills'],
    section: 'experiences',
  },
  {
    role: 'IT Consultant',
    company: 'INAIL (ex ISPESL)',
    duration: '2002 - May 2010 • 8 yrs 5 mos',
    location: 'Rome, Latium, Italy - Hybrid',
    description:
      "Gestione dell'infrastruttura server e supporto sistemistico per l'helpdesk.",
    skills: ['Fortinet', 'Wireshark', '+5 skills'],
    section: 'experiences',
  },
  {
    role: 'Senior Systems Engineer',
    company: 'Altran Italia S.p.A.',
    duration: 'Dec 2007 - Dec 2008 • 1 yr 1 mo',
    location: 'Corte dei Conti',
    description: 'Microsoft Senior Systems Engineer c/o Corte dei Conti.',
    skills: ['Fortinet', 'Wireshark', '+4 skills'],
    section: 'experiences',
  },
  {
    role: 'Responsabile Area Servizi / Sistemista Senior',
    company: 'Italware S.r.l.',
    duration: 'May 1999 - Jun 2004 • 5 yrs 2 mos',
    location: 'Roma, Italia',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    skills: ['Fortinet', 'Wireshark', '+3 skills'],
    section: 'experiences',
  },

  // Educazione
  {
    role: 'Master in Computer Science',
    company: 'Università La Sapienza',
    duration: '2010 - 2012',
    location: 'Roma, Italia',
    description: 'Specializzazione in sistemi informativi aziendali.',
    skills: ['Machine Learning', 'Data Analysis'],
    section: 'education',
  },
  {
    role: 'Bachelor in Information Technology',
    company: 'Politecnico di Milano',
    duration: '2006 - 2010',
    location: 'Milano, Italia',
    description: 'Corso triennale in ingegneria informatica.',
    section: 'education',
  },
  {
    role: 'High School Diploma',
    company: 'Liceo Scientifico Galileo Galilei',
    duration: '2001 - 2006',
    location: 'Napoli, Italia',
    description: 'Diploma scientifico con orientamento informatico.',
    section: 'education',
  },

  // Corsi
  {
    role: 'Corso React Avanzato',
    company: 'EPICODE Academy',
    duration: 'Jan 2023 - Mar 2023',
    location: 'Online',
    description: 'Sviluppo applicazioni avanzate con React e Redux.',
    section: 'courses',
  },
  {
    role: 'Corso Full Stack Developer',
    company: 'Udemy',
    duration: 'Sep 2022 - Dec 2022',
    location: 'Online',
    description: 'Introduzione a backend e frontend development.',
    section: 'courses',
  },
  {
    role: 'Certificazione Cybersecurity',
    company: 'Cisco Networking Academy',
    duration: '2021',
    location: 'Online',
    description: 'Fondamenti di cybersecurity e protezione dei dati.',
    section: 'courses',
  },
]

const ColonnaCentraleBasso = (props) => {
  return (
    <Container className='mt-4 border rounded border-1 p-2'>
      <section id={props.section}>
        <h3 className='mb-4 fs-6 fw-bold'>
          {props.section.charAt(0).toUpperCase() + props.section.slice(1)}
        </h3>
        {items
          .filter((exp) => exp.section === props.section)
          .map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
      </section>
    </Container>
  )
}

export default ColonnaCentraleBasso
