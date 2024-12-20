import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MdEdit, MdAdd } from 'react-icons/md'
import axios from 'axios'
import {
  Button,
  Container,
  ListGroup,
  Form,
  Spinner,
  Alert,
} from 'react-bootstrap'
import { formatDate } from './tools'
import { fetchPosts } from '../redux/actions'

const ProfileContributes = ({ profileId }) => {
  const me = useSelector((state) => state.profile.me)
  const allPosts = useSelector((state) => state.posts.posts)
  const myPosts = useSelector((state) => state.posts.userPosts)

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [newPost, setNewPost] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts(false))
  }, [dispatch])

  useEffect(() => {
    if (me && allPosts) {
      if (me._id !== profileId) {
        const contributesPosts = allPosts.filter(
          (post) => post.user._id === profileId
        )
        setPosts(contributesPosts)
      } else {
        setPosts(myPosts)
      }
      setLoading(false)
    }
  }, [me, allPosts, myPosts, profileId])

  const handleEdit = (post) => {
    setEditingId(post._id)
    setNewPost(post.text)
  }

  const handleSave = async () => {
    try {
      await axios.put(
        `https://striveschool-api.herokuapp.com/api/posts/${editingId}`,
        { text: newPost },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_LINKEDIN_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )
      setEditingId(null)
      dispatch(fetchPosts(true))
    } catch (error) {
      console.error('Error saving post:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://striveschool-api.herokuapp.com/api/posts/${editingId}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_LINKEDIN_API_KEY}`,
          },
        }
      )
      setEditingId(null)
      dispatch(fetchPosts(true))
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  if (loading) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <Spinner animation='border' variant='primary' />
      </div>
    )
  }

  if (error) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <Alert variant='danger'>
          Errore nel recupero dei post dell'utente {profileId}
        </Alert>
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return <Alert variant='info'>Nessun post disponibile.</Alert>
  }

  return (
    <Container className='mt-4 border rounded border-1 p-2 bg-white'>
      <h3 className='mb-4 fs-6 fw-bold d-flex align-items-center justify-content-between'>
        Posts dell'utente
        {/* {profileId === me._id && (
          <Button
            variant='link'
            className='p-0 text-decoration-none'
            onClick={() => setNewPost('')}
          >
            <MdAdd size={20} />
          </Button>
        )} */}
      </h3>
      <ListGroup>
        {posts.map((post) => (
          <ListGroup.Item key={post._id} className='mb-3'>
            {editingId === post._id ? (
              <Form>
                <Form.Control
                  className='fs-7'
                  as='textarea'
                  rows={3}
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <div className='d-flex justify-content-end mt-2'>
                  <Button
                    variant='success'
                    onClick={handleSave}
                    size='sm'
                    className='me-2'
                  >
                    Salva
                  </Button>
                  <Button
                    variant='secondary'
                    onClick={() => setEditingId(null)}
                    size='sm'
                    className='me-2'
                  >
                    Annulla
                  </Button>
                  <Button variant='danger' onClick={handleDelete} size='sm'>
                    Elimina
                  </Button>
                </div>
              </Form>
            ) : (
              <>
                <p className='fs-7 fw-bold'>
                  {formatDate(new Date(post.createdAt))}
                </p>
                <p className='fs-7'>{post.text}</p>
                {profileId === me._id && (
                  <div className='d-flex justify-content-end'>
                    <Button
                      variant='link'
                      className='p-0 text-decoration-none'
                      onClick={() => handleEdit(post)}
                    >
                      <MdEdit />
                    </Button>
                  </div>
                )}
              </>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}

export default ProfileContributes
