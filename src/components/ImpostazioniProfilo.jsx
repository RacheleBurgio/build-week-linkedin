import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Container, Row, Col } from 'react-bootstrap'


const ImpostazioniProfilo = () => {

    return(
        
        <Container className='bg-white'>
            <Row>
               <Col sm={8}>Lingua del profilo</Col>
               <Col sm={4}><i className="bi bi-pencil"></i></Col>
               <Col sm={8}>Italiano</Col>
               <Col sm={4}></Col>
            </Row>
            <Row>
                <Col sm={8}>Profilo pubblico e URL</Col>
               <Col sm={4}><i className="bi bi-pencil"></i></Col>
               <Col sm={8}>www.linkedin.com/in/annatokky/idUtente</Col>
               <Col sm={4}></Col>
            </Row>
        </Container>
        
    )
}

export default ImpostazioniProfilo