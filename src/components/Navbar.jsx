import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

function MyNav() {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <img src="/assets/imgs/logo.svg" alt="Logo" />
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
              <Nav.Link href="#action1" className="d-column">
                <i className="bi bi-house-door-fill fs-3"></i>
                <span>Home</span>
              </Nav.Link>
              <Nav.Link href="#action2">
                <i className="bi bi-people fs-2"></i>
                <span>Rete</span>
              </Nav.Link>
              <Nav.Link href="#action3">
                <i className="bi bi-briefcase-fill fs-4"></i>
                <span>Lavoro</span>
              </Nav.Link>
              <Nav.Link href="#action4">
                <i className="bi bi-chat-dots-fill fs-4"></i>
                <span>Messaggistica</span>
              </Nav.Link>
              <Nav.Link href="#action5">
                <i className="bi bi-bell-fill fs-4"></i>
                <span>Notifiche</span>
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
                      src="/assets/imgs/profile.jpg"
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
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4"></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav
