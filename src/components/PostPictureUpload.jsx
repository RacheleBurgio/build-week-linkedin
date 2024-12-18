
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const PostPictureUpload = ({ postId, onUpload }) => {
  const [file, setFile] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY; 

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('post', file);

    try {
      const response = await axios.post(`https://striveschool-api.herokuapp.com/api/posts/${postId}`, formData, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      onUpload(response.data); // Chiamata a funzione per gestire l'upload
      setFile(null); // Resetta il file dopo l'upload
    } catch (error) {
      console.error('Error uploading post picture:', error);
    }
  };

  return (
    <Form onSubmit={handleUpload}>
      <Form.Group controlId="formFile">
        <Form.Label>Carica immagine del post</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">Carica</Button>
    </Form>
  );
};

export default PostPictureUpload;