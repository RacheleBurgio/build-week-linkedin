import { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  Form,
} from 'react-bootstrap'

const JobPage = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('dev')

  const btn = {
    backgroundColor: 'transparent',
    border: '2px solid #004182',
    color: '#004182',
    borderRadius: '50px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  }

  // Funzione per ottenere i dati dall'API
  const fetchJobs = async (category) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://strive-benchmark.herokuapp.com/api/jobs?category=${category}&limit=10`
      )
      if (response.ok) {
        const data = await response.json()
        setJobs(data.data)
      } else {
        throw new Error('Errore durante il recupero delle offerte di lavoro.')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs(searchTerm)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchJobs(searchTerm)
  }

  const truncateDescription = (description, length = 200) => {
    if (description.length > length) {
      return description.slice(0, length) + '...'
    }
    return description
  }

  return (
    <>
      <Container className="mt-3">
        <Row className="d-flex justify-content-between align-items-start">
          {/* Colonna sinistra */}
          <Col xs={3}>
            <div className="bg-white p-1 rounded shadow-sm h-100">
              <ul className="list-unstyled ps-4">
                <li className="mt-2">
                  <i className="bi bi-list-stars me-2"></i>
                  Preferenze
                </li>
                <li className="mt-2">
                  <i className="bi bi-bookmark-fill me-2"></i>Le mie offerte di
                  lavoro
                </li>
                <li className="mt-2">
                  <i className="bi bi-square-fill me-2"></i>Le mie informazioni
                  sulla <br />
                  carriera
                </li>
              </ul>
            </div>
            <div className="mt-3">
              <Button style={btn}>
                <i className="bi bi-pencil-square me-2"></i>Pubblica offerta
                gratuita
              </Button>
            </div>
          </Col>

          {/* Colonna centrale */}
          <Col xs={6}>
            <div className="bg-white p-3 rounded shadow-sm h-100">
              <h5>Le principali offerte di lavoro per te</h5>
              <p className="text-body-tertiary">
                In base al tuo profilo, alle tue preferenze e ad attività come
                candidature, ricerche e salvataggi
              </p>

              {/* Barra di ricerca */}
              <Form onSubmit={handleSearch} className="d-flex mb-3">
                <Form.Control
                  type="text"
                  placeholder="Cerca una categoria di lavoro"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" style={{ marginLeft: '10px' }}>
                  Cerca
                </Button>
              </Form>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            ) : (
              <>
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <div
                      className="bg-white p-3 mt-3 rounded shadow-sm h-100"
                      key={job._id}
                    >
                      <h6>{job.title}</h6>
                      <p className="text-body-tertiary">{job.company_name}</p>

                      <p>
                        <strong>Category</strong> {job.category}
                      </p>
                      <p>
                        <strong>Job Type:</strong> {job.job_type}
                      </p>
                      <p>
                        <strong>Publication Date:</strong>{' '}
                        {job.publication_date}
                      </p>
                      <p>
                        <strong>Location:</strong>{' '}
                        {job.candidate_required_location || 'Non specificato'}
                      </p>
                      <p>
                        <strong>Salary:</strong>{' '}
                        {job.salary || 'Non specificato'}
                      </p>
                      {/* Descrizione del lavoro */}
                      <p
                        dangerouslySetInnerHTML={{
                          __html: truncateDescription(job.description),
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <Alert variant="info">
                    Nessuna offerta di lavoro disponibile al momento.
                  </Alert>
                )}
              </>
            )}
          </Col>

          {/* Colonna destra */}
          <Col xs={3} style={{ fontSize: '14px' }} className="text-center">
            <ul className="list-unstyled d-flex flex-wrap justify-content-center align-items-center">
              <li className="me-3 my-1">Informazioni</li>
              <li className="me-3 my-1">Accessibilità</li>
              <li className="me-3 my-1">Centro assistenza</li>
              <li className="me-3 my-1">
                Privacy e condizioni
                <i
                  className="bi bi-caret-down-fill"
                  style={{ fontSize: '12px' }}
                ></i>
              </li>
              <li className="me-3 my-1">
                Opzioni per gli annunci pubblicitari
              </li>
              <li className="me-3 my-1">Pubblicità</li>
              <li className="me-3 my-1">
                Servizi alle aziende
                <i
                  className="bi bi-caret-down-fill"
                  style={{ fontSize: '12px' }}
                ></i>
              </li>
              <li className="me-3 my-1">Scarica l'app LinkedIn</li>
              <li className="me-3 my-1">Altro</li>
            </ul>

            {/* Immagine LinkedIn sotto la lista */}
            <div className="mt-3">
              <img
                src="/assets/imgs/LinkedIn-Logo.svg"
                alt="LinkedIn logo"
                style={{ width: '5em' }}
              />{' '}
              <span className="text-body-tertiary" style={{ fontSize: '10px' }}>
                LinkedIn Corporation © 2024
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default JobPage
