import { useState } from 'react'
import { Container } from 'react-bootstrap'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/css/custom-bootstrap.css'

import ColonnaCentrale from './components/ColonnaCentrale'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from 'react-router-dom'
import Profile from './components/Profile'
import Post from './components/Post'
import Comment from './components/Comment'

// Wrapper per estrarre i parametri e passarli ai componenti
const ProfileWrapper = () => {
  const { profileId } = useParams()
  return <Profile profileId={profileId} />
}

const PostWrapper = () => {
  const { postId } = useParams()
  return <Post postId={postId} />
}

const CommentWrapper = () => {
  const { id } = useParams()
  return <Comment commentId={id} />
}
import MyNav from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <>
        <header>
          <MyNav />
        </header>
        <main>
          <Container>
            <Routes>
              <Route path='/' element={<ColonnaCentrale />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/profile/:profileId' element={<ProfileWrapper />} />
              <Route path='/post/:postId' element={<PostWrapper />} />
              <Route path='/comment/:id' element={<CommentWrapper />} />
            </Routes>
          </Container>
        </main>
        <footer></footer>
      </>
    </Router>
  )
}

export default App
