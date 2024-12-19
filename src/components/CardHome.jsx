import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Alert,
  Card,
  Image,
} from 'react-bootstrap'
import { SlLike } from 'react-icons/sl'
import { FaRegCommentDots } from 'react-icons/fa6'
import { LuGitCompareArrows } from 'react-icons/lu'
import { BsFillSendFill } from 'react-icons/bs'

const CardHome = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const myProfileId = useSelector((state) => state.profile.me._id)

  const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `https://striveschool-api.herokuapp.com/api/posts`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      setPosts(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching posts:', error)
      setIsLoading(false)
      setIsError(true)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  if (isError) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <Alert variant="danger">Errore nel recupero dei post</Alert>
      </div>
    )
  }

  return (
    <Container>
      {posts.map((post) => (
        <Card key={post._id} className="post-card my-3">
          <Card.Img
            variant="top"
            src={`https://picsum.photos/500/200?random=${post._id}`}
            alt={post._id}
          />
          <Card.Header className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Image
                src={`https://picsum.photos/50/50?random=${post.user._id}`}
                alt={post.username}
                roundedCircle
              />
              <div className="ms-3">
                <p className="m-0 fw-bold">{post.username}</p>
                <small className="text-muted">
                  {new Date(post.createdAt).toLocaleString()}
                </small>
              </div>
            </div>
            <Button variant="outline-primary">+ Segui</Button>
          </Card.Header>
          <Card.Body>
            <Card.Text>{post.text}</Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-around">
            <Button variant="light">
              <SlLike /> Consiglia
            </Button>
            <Button variant="light">
              <FaRegCommentDots /> Commenta
            </Button>
            <Button variant="light">
              <LuGitCompareArrows /> Diffondi il post
            </Button>
            <Button variant="light">
              <BsFillSendFill /> Invia
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </Container>
  )
}

export default CardHome
