import { useState } from 'react'
import { Container } from 'react-bootstrap'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './assets/css/custom-bootstrap.css'
import ColonnaCentrale from './components/ColonnaCentrale'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container>
      <header></header>
      <main>
        <ColonnaCentrale />
      </main>
      <footer></footer>
    </Container>
  )
}

export default App
