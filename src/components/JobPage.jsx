import { Container, Row, Col, Button } from 'react-bootstrap'

const JobPage = () => {
  const btn = {
    backgroundColor: 'transparent',
    border: '2px solid #004182',
    color: '#004182',
    borderRadius: '50px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  }

  return (
    <>
      <Container className="mt-3">
        <Row className="d-flex justify-content-between align-items-start">
          {/* Colonna sinistra */}
          <Col xs={3}>
            <div className="bg-white p-1 rounded shadow-sm h-100">
              <ul className="list-unstyled ps-4 ">
                <li>
                  <i className="bi bi-list-stars me-2"></i>
                  Preferenze
                </li>
                <li>
                  <i className="bi bi-bookmark-fill me-2"></i>Le mie offerte di
                  lavoro
                </li>
                <li>
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
            </div>
            <div className="bg-white p-3 mt-3 rounded shadow-sm h-100">
              <h6 className="mb-3">
                <i className="bi bi-currency-exchange "></i> P R E M I U M
              </h6>
              <h5>
                Offerte di Lavoro per cui rientri fra i migliori candidati
              </h5>
              <p className="text-body-tertiary">
                In base alle tue probabilità di ricevere una risposta
              </p>
            </div>
            <div className="bg-white p-3 mt-3  mb-3 rounded shadow-sm h-100">
              <h5>Esplora offerte di lavoro per te</h5>
              <p className="text-body-tertiary">
                In base al tuo profilo, alle tue preferenze e ad attività come
                candidature, ricerche e salvataggi
              </p>
            </div>
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
