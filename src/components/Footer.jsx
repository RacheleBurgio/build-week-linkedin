import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { HiMiniQuestionMarkCircle } from 'react-icons/hi2'
import { IoMdSettings } from 'react-icons/io'
import { MdOutlineImportContacts } from 'react-icons/md'

const Footer = () => {
  return (
    <Container className="main-container my-5">
      <Row>
        <Col>
          <ul>
            <li>
              <a href="#">Informazioni</a>
            </li>
            <li>
              <a href="#">Informativa sulla community professionale</a>
            </li>
            <li>
              <a href="#">Privacy e condizioni </a>
            </li>
            <li>
              <a href="#">Sales Solutions</a>
            </li>
            <li>
              <a href="#">Centro sicurezza</a>
            </li>
          </ul>
        </Col>
        <Col>
          <ul>
            <li>
              <a href="#">Accessibilità</a>
            </li>
            <li>
              <a href="#">Carriera</a>
            </li>
            <li>
              <a href="#">Opzioni per gli annunci pubblicitari</a>
            </li>
            <li>
              <a href="#">Mobile</a>
            </li>
          </ul>
        </Col>
        <Col>
          <ul>
            <li>
              <a href="#">Talent Solutions</a>
            </li>
            <li>
              <a href="#">Soluzioni di marketing</a>
            </li>
            <li>
              <a href="#">Pubblicità</a>
            </li>
            <li>
              <a href="#">Piccole imprese</a>
            </li>
          </ul>
        </Col>
        <Col>
          <ul>
            <li>
              <div className="item">
                <HiMiniQuestionMarkCircle className="footer-icon" />
                <div>
                  <a href="#">Domande?</a>
                  <p>Visita il nostro Centro assistenza.</p>
                </div>
              </div>
            </li>
            <li>
              <div className="item">
                <IoMdSettings className="footer-icon" />
                <div>
                  <a href="#">Gestisci il tuo account e la tua privacy</a>
                  <p>Vai alle impostazioni</p>
                </div>
              </div>
            </li>
            <li>
              <div className="item">
                <MdOutlineImportContacts className="footer-icon" />
                <div>
                  <a href="#">Trasparenza sui contenuti consigliati</a>
                  <p>Scopri di più sui contenuti consigliati.</p>
                </div>
              </div>
            </li>
          </ul>
        </Col>
        <Col>
          <form>
            <label className='label'>Seleziona lingua</label>
            <select className='select'>
              <option>Italiano</option>
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
              <option>Deutsch</option>
            </select>
          </form>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="fine">LinkedIn Corporation © 2024</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
