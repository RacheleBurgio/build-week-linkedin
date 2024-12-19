import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const PostPictureUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null)
  const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('image', file) // Aggiungi il file all'oggetto FormData

    try {
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: `Client-ID ${apiKey}`, // Usa il tuo Client ID di Imgur
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await response.json()
      onUpload(data.data.link) // Passa il link dell'immagine al componente genitore
      setFile(null) // Resetta il file dopo l'upload
    } catch (error) {
      console.error('Error uploading post picture:', error)
    }
  }

  return (
    <Form onSubmit={handleUpload}>
      <Form.Group controlId="formFile">
        <Form.Label>Carica immagine del post</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Carica
      </Button>
    </Form>
  )
}

export default PostPictureUpload
