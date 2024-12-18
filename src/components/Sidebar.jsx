import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import ImpostazioniProfilo from './ImpostazioniProfilo'
import ProfiliSidebar from './ProfiliSidebar'

const Sidebar = (props) => {

  //if(props.type === "sx") { 
    //return (
     // <h2>Componente Sidebar { props.type}</h2>)
 // }

  if (props.type === "dx") {

    return (
      <div>
        <ImpostazioniProfilo />
        <ProfiliSidebar title='Altri Profili Per Te' profileNumber={3} type='perTe' />
        <ProfiliSidebar title='Profili Consigliati' profileNumber={10} type='consigliati' />
      </div>
    )
  }
}

export default Sidebar

