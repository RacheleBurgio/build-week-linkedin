import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BsPlusLg } from 'react-icons/bs'
import {
  Card,
  ListGroup,
  ListGroupItem,
  Container,
  Col,
  Row,
} from 'react-bootstrap'

const ProfiloSidebar2 = () => {
  return (
    <Container className="mt-3">
      <Card style={{ width: '15rem' }} className="border border-rounded">
        <Card.Body>
          <Card.Title className="fw-bold fs-7 pt-1 text-primary">
            Gruppi
          </Card.Title>
          <Card.Subtitle className="mb-1 mt-4 fw-bold fs-7 text-primary">
            <Row>
              <Col className="col-10 mt-1">Eventi</Col>
              <Col className="col-2 fs-6 text-black">
                <BsPlusLg />
              </Col>
            </Row>
          </Card.Subtitle>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="fs-6 fw-bold text-center text-secondary">
            Scopri di piú
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Container>
  )
}

export default ProfiloSidebar2
