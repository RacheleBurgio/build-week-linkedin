import React, { useState } from 'react';
import { Form, Button, Card, Modal, Image } from 'react-bootstrap';
import PostPictureUpload from './PostPictureUpload';

const NewPost = ({ onPostCreated, userProfileImage }) => { // Aggiungi una prop per l'immagine del profilo
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY;

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!postText) return;

    try {
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/posts/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ text: postText, image: postImage }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newPost = await response.json();
      onPostCreated(newPost);
      setPostText('');
      setPostImage(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleImageUpload = (imageUrl) => {
    setPostImage(imageUrl);
  };

  return (
    <Card className="mb-4" onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>
      <Card.Body className='button' style={{ display: 'flex', alignItems: 'center' }}>
        {/** Immagine del profilo */}
        <Image
          src={userProfileImage} // Percorso dell'immagine del profilo
          roundedCircle
          style={{ width: '40px', height: '40px', marginRight: '10px' }} // Dimensioni e margine
         
        />
        <p style={{ margin: 0 }}>Crea un nuovo post</p>
      </Card.Body>

      {/* Modal per la creazione del post */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuovo post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostPictureUpload onUpload={handleImageUpload} />
          <Form onSubmit={handleCreatePost}>
            <Form.Group controlId="newPost">
              <Form.Control
                as="textarea"
                rows={3}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Scrivi qualcosa..."
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Pubblica
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default NewPost;