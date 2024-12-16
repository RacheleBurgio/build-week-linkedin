import React from 'react'
import ColonnaCentraleAlto from './ColonnaCentraleAlto'
import ColonnaCentraleBasso from './ColonnaCentraleBasso'
import { Container } from 'react-bootstrap'

const ColonnaCentrale = () => {
  return (
    <Container fluid className='w-50'>
      <ColonnaCentraleAlto />
      <ColonnaCentraleBasso
        userId='675fedea0ea286001528b93d'
        section='experiences'
      />
      <ColonnaCentraleBasso
        userId='675fedea0ea286001528b93d'
        section='education'
      />
      <ColonnaCentraleBasso
        userId='675fedea0ea286001528b93d'
        section='courses'
      />
    </Container>
  )
}

export default ColonnaCentrale
