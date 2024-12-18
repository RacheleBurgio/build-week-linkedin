import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import PostPictureUpload from './PostPictureUpload';

const NewPost = ({ onPostCreated }) => {
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY; 

  // Funzione per gestire la creazione di un nuovo post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!postText) return; // Non inviare post vuoti

    try {
      const response = await fetch('https://striveschool-api.herokuapp.com/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ text: postText, image: postImage }), // Includi l'immagine nel corpo della richiesta
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newPost = await response.json();
      onPostCreated(newPost); // Notifica il componente genitore del nuovo post
      setPostText(''); // Resetta il campo di input
      setPostImage(null); // Resetta l'immagine
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Funzione per gestire l'upload dell'immagine
  const handleImageUpload = (imageUrl) => {
    setPostImage(imageUrl); // Imposta l'URL dell'immagine caricata
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <h2>Crea un nuovo post</h2>
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
          <Button variant="primary" type="submit">Pubblica</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NewPost;