import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Form,
  Button,
  Card,
  Modal,
  Image,
  Alert,
  Spinner,
} from 'react-bootstrap'
import PostPictureUpload from './PostPictureUpload'

const NewPost = ({ onPostCreated }) => {
  const me = useSelector((state) => state.profile.me)
  const [postText, setPostText] = useState('')
  const [postImage, setPostImage] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY

  const handleCreatePost = async (e) => {
    e.preventDefault()
    if (!postText) return

    const body = {
      text: postText,
      ...(postImage && { image: postImage }), // Conditionally add image
    }

    setLoading(true)
    setErrorMessage('') // Clear previous error messages

    try {
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/posts/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(body),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Network response was not ok')
      }

      const newPost = await response.json()
      onPostCreated(newPost)
      resetForm()
    } catch (error) {
      console.error('Error creating post:', error)
      setErrorMessage('Errore nella creazione del post. Riprova.') // Set error message
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setPostText('')
    setPostImage(null)
    setShowModal(false)
  }

  const handleImageUpload = (imageUrl) => {
    setPostImage(imageUrl)
  }

  return (
    <Card
      className='mb-4'
      onClick={() => setShowModal(true)}
      style={{ cursor: 'pointer' }}
    >
      <Card.Body
        className='button'
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Image
          src={me.image}
          roundedCircle
          style={{ width: '40px', height: '40px', marginRight: '10px' }}
          alt='User  Profile'
        />
        <p style={{ margin: 0 }}>Crea un nuovo post</p>
      </Card.Body>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuovo post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}{' '}
          {/* Display error message */}
          <PostPictureUpload onUpload={handleImageUpload} />
          <Form onSubmit={handleCreatePost}>
            <Form.Group controlId='newPost'>
              <Form.Control
                as='textarea'
                rows={3}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder='Scrivi qualcosa...'
                required
                aria-label='Post content'
              />
            </Form.Group>
            <Button
              variant='primary'
              type='submit'
              disabled={loading}
              className='my-2'
              size='sm'
            >
              {loading ? <Spinner animation='border' size='sm' /> : 'Pubblica'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  )
}

export default NewPost
