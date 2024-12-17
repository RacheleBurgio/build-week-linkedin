import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import ImpostazioniProfilo from './ImpostazioniProfilo'
import ProfiliSidebar from './ProfiliSidebar'

const Sidebar = () => {

    return(
      <div>
        <ImpostazioniProfilo/>
         <ProfiliSidebar title='Profili Per Te' profileNumber= {3}  type='perTe'/>
         <ProfiliSidebar title='Profili Consigliati' profileNumber= {10}  type='consigliati'/>
      </div>
    )
}

export default Sidebar