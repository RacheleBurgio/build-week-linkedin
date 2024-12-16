import { useState } from 'react'
import { Container } from 'react-bootstrap'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './assets/css/custom-bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import ColonnaCentrale from './components/ColonnaCentrale'
import MyNav from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <MyNav />
      </header>
      <main>
        <Container>
          <ColonnaCentrale />
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
