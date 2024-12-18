import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'

function MyNav() {
  const profile = useSelector((state) => state.profile.me)
  console.log('Profile Navbar', profile)
  useEffect(() => {}, [profile])

  return (
    <Navbar bg="light" expand="lg" style={{ minHeight: '60px' }}>
      <Container>
        <Link to={'/'}>
          <img
            src="/assets/imgs/logo.svg"
            alt="Logo"
            style={{ height: '40px' }}
          />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex w-100 justify-content-between align-items-center">
            {/* Search Bar */}
            <Form className="d-flex">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
              </div>
            </Form>

            {/* Navigation Icons */}
            <Nav className="d-flex align-items-center">
              <Nav.Link
                as={Link}
                to="/"
                className="d-flex flex-column align-items-center"
              >
                <i className="bi bi-house-door-fill fs-5"></i>
                <span className="small mt-0">Home</span>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/"
                className="d-flex flex-column align-items-center"
              >
                <i className="bi bi-people fs-5"></i>
                <span className="small mt-0">Rete</span>
              </Nav.Link>
              <Nav.Link
                className="d-flex flex-column align-items-center"
                as={Link}
                to="/jobs"
              >
                <i className="bi bi-briefcase-fill fs-5"></i>
                <span className="small mt-0">Lavoro</span>
              </Nav.Link>
              <Nav.Link
                href="#action4"
                className="d-flex flex-column align-items-center"
              >
                <i className="bi bi-chat-dots-fill fs-5"></i>
                <span className="small mt-0">Messaggistica</span>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/"
                className="d-flex flex-column align-items-center"
              >
                <i className="bi bi-bell-fill fs-4"></i>
                <span className="small mt-0">Notifiche</span>
              </Nav.Link>

              {/* Profile Dropdown */}
              <NavDropdown
                title={
                  <div
                    style={{
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={profile.image}
                      alt="Profile"
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        marginRight: '5px',
                      }}
                    />
                    <div style={{ fontSize: '12px', marginRight: '5px' }}>
                      Tu
                    </div>
                  </div>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Vai al profilo
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4"></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>

              {/* Line Divider */}
              <div
                className="border-start mx-2"
                style={{ height: '100%' }}
              ></div>

              {/* Aziende Dropdown */}
              <NavDropdown
                title={
                  <div className="d-flex flex-column align-items-center">
                    <i className="bi bi-microsoft"></i>
                    <span className="small mt-0">Per le aziende</span>
                  </div>
                }
                id="azienda-nav-dropdown"
              >
                <NavDropdown.Item href="#azienda1">
                  Servizi per aziende
                </NavDropdown.Item>
                <NavDropdown.Item href="#azienda2">
                  Soluzioni Premium
                </NavDropdown.Item>
                <NavDropdown.Item href="#azienda3">Pubblicità</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#azienda4">
                  Gestione aziendale
                </NavDropdown.Item>
              </NavDropdown>

              {/* Prova Premium */}
              <Nav.Link
                href="#action7"
                className="d-flex flex-column align-items-center"
              >
                <span className="small mt-0 text-center">
                  Prova Premium <br /> per 0 EUR
                </span>
              </Nav.Link>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav
