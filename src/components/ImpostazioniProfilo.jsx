import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Container, Row, Col } from 'react-bootstrap'

const ImpostazioniProfilo = () => {
  return (
    <Container className="bg-white mt-3 border rounded mb-3">
      <Row className="p-2">
        <Col sm={10} className="h6 fw-bold">
          Lingua del profilo
        </Col>
        <Col sm={2}>
          <i className="bi bi-pencil"></i>
        </Col>
        <Col sm={10} className="fs-7 text-secondary">
          Italiano
        </Col>
        <Col sm={2}></Col>
      </Row>
      <Row className="p-2">
        <Col sm={10} className="h6 fw-bold">
          Profilo pubblico e URL
        </Col>
        <Col sm={2}>
          <i className="bi bi-pencil "></i>
        </Col>
        <Col sm={10} className="fs-7 text-secondary">
          www.linkedin.com/in/annatokky/idUtente
        </Col>
        <Col sm={2}></Col>
      </Row>
    </Container>
  )
}

export default ImpostazioniProfilo
