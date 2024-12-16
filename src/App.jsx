import { useState } from 'react'
import { Container } from 'react-bootstrap'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './assets/css/custom-bootstrap.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container>
      <header></header>
      <main></main>
      <footer></footer>
    </Container>
  )
}

export default App
