import { useEffect, useState } from 'react'
import { Alert, Container, Row, Col } from 'react-bootstrap'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  useLocation,
} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getMe } from './redux/actions'
import './assets/css/custom-bootstrap.css'
import './assets/css/footer.css'

import MyNav from './components/Navbar'
import Feed from './components/Feed'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Profile from './components/Profile'
import Post from './components/Post'
import Comment from './components/Comment'
import JobPage from './components/JobPage'
import { Display } from 'react-bootstrap-icons'

// Wrapper per il profilo
const ProfileWrapper = () => {
  const { profileId: paramProfileId } = useParams()
  const [profileId, setProfileId] = useState(null) // Stato locale per il profileId
  const me = useSelector((state) => state.profile.me)

  useEffect(() => {
    // Aggiorna profileId in base a paramProfileId o a me._id
    if (paramProfileId) {
      setProfileId(paramProfileId)
    } else if (me && me._id) {
      setProfileId(me._id)
    }
  }, [paramProfileId, me])

  if (!profileId) {
    return <div>Caricamento profilo...</div> // Renderizza un loader temporaneo
  }

  return <Profile profileId={profileId} />
}

// Wrapper per i post
const PostWrapper = () => {
  const { postId } = useParams()
  return <Post postId={postId} />
}

// Wrapper per i commenti
const CommentWrapper = () => {
  const { id } = useParams()
  return <Comment commentId={id} />
}

function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    // Carica i dati del profilo all'avvio dell'app
    dispatch(getMe())
  }, [dispatch])

  return (
    <>
      <header>
        <MyNav />
      </header>
      <main style={{ backgroundColor: '#F4F2EE' }}>
        <Container>
          <Row>
            <Sidebar type="sx" />
            <Col className={location.pathname === '/jobs' ? 'col-12' : 'col-6'}>
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/profile" element={<ProfileWrapper />} />
                <Route
                  path="/profile/:profileId"
                  element={<ProfileWrapper />}
                />
                <Route path="/post/:postId" element={<PostWrapper />} />
                <Route path="/comment/:id" element={<CommentWrapper />} />
                <Route
                  path="*"
                  element={<Alert variant="danger">Pagina non trovata</Alert>}
                />
                <Route path="/jobs" element={<JobPage />} />
              </Routes>
            </Col>
            <Sidebar type="dx" />
          </Row>
        </Container>
      </main>
      {location.pathname !== '/jobs' && (
        <footer>
          <Footer />
        </footer>
      )}
    </>
  )
}

export default App
