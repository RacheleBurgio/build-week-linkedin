import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import ImpostazioniProfilo from './ImpostazioniProfilo'
import ProfiliPerTe from './ProfiliPerTe'

const Sidebar = () => {

    return(
      <div>
        <ImpostazioniProfilo/>
        <ProfiliPerTe/>
      </div>
    )
}

export default Sidebar