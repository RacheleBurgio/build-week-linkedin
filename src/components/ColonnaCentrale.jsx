import React from 'react'
import ColonnaCentraleAlto from './ColonnaCentraleAlto'
import ColonnaCentraleBasso from './ColonnaCentraleBasso'
import { Container } from 'react-bootstrap'

const ColonnaCentrale = () => {
  return (
    <Container fluid className='w-50'>
      <ColonnaCentraleAlto />
      <ColonnaCentraleBasso section='experiences' />
      <ColonnaCentraleBasso section='education' />
      <ColonnaCentraleBasso section='courses' />
    </Container>
  )
}

export default ColonnaCentrale
