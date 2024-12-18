import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import ImpostazioniProfilo from './ImpostazioniProfilo'
import ProfiliSidebar from './ProfiliSidebar'
import { useLocation } from 'react-router'
import { Col } from 'react-bootstrap'

const Sidebar = (props) => {
  const location = useLocation()

  if (location.pathname === '/jobs') {
    return <></>
  }

  if (props.type === 'sx') {
    return (
      <Col className="col-3">
        <h2>Componente Sidebar {props.type}</h2>
      </Col>
    )
  }

  if (props.type === 'dx') {
    return (
      <Col className="col-3">
        <ImpostazioniProfilo />
        <ProfiliSidebar
          title="Altri Profili Per Te"
          profileNumber={3}
          type="perTe"
        />
        <ProfiliSidebar
          title="Profili Consigliati"
          profileNumber={10}
          type="consigliati"
        />
      </Col>
    )
  }
}

export default Sidebar
