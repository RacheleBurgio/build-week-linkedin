import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Form,
  Button,
  Card,
  Modal,
  Image,
  Alert,
  Spinner,
} from 'react-bootstrap';
import { fetchPosts } from '../redux/actions'; // Ensure correct import
import PostPictureUpload from './PostPictureUpload';

const NewPost = ({ onClosePopup }) => {
  const me = useSelector((state) => state.profile.me);
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY;
  const dispatch = useDispatch();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!postText) return;

    const body = {
      text: postText,
      ...(postImage && { image: postImage }), 
    };

    setLoading(true);
    setErrorMessage('');

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
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const newPost = await response.json();

      // Dispatch the fetchPosts action directly here
      dispatch(fetchPosts(true));

      resetForm();
    } catch (error) {
      console.error('Error creating post:', error);
      setErrorMessage('Errore nella creazione del post. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPostText('');
    setPostImage(null);
    setShowModal(false);
    onClosePopup();
  };

  const handleImageUpload = (imageUrl) => {
    setPostImage(imageUrl);
  };

  return (
    <Card
      className='mb-4'
      onClick={() => setShowModal(true)}
      style={{ cursor: 'pointer' }}
    >
      <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src={me.image}
          roundedCircle
          style={{ width: '40px', height: '40px', marginRight: '10px' }}
          alt='User Profile'
        />
        <p style={{ margin: 0 }}>Crea un nuovo post</p>
      </Card.Body>

      <Modal show={showModal} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>Nuovo post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
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
                maxLength={500}
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
  );
};

export default NewPost;