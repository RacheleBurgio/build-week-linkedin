import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProfilePictureUpload from './ProfilePictureUpload'
import { FaEdit } from 'react-icons/fa'

const ProfileUp = () => {
  const me = useSelector((state) => state.profile.me)
  // const [user, setUser] = useState({
  //   name: 'Mario Rossi',
  //   title: 'Sviluppatore Frontend',
  //   bio:
  //     'Appassionato di tecnologia e innovazione. Sempre alla ricerca di nuove sfide.',
  //   image: 'https://via.placeholder.com/150', // Sostituisci con l'URL dell'immagine del profilo
  // })

  const [user, setUser] = useState(me)
  const [isEditing, setIsEditing] = useState(false)

  // Esempio di elementi raccomandati (sostituisci con dati reali)
  const recommendedItems = [
    { id: 1, title: 'Giovanni Bianchi', link: '#' },
    { id: 2, title: 'Laura Verdi', link: '#' },
    { id: 3, title: 'Marco Neri', link: '#' },
  ]

  const handleImageChange = (newImage) => {
    setUser({ ...user, image: newImage })
  }

  const handleSave = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const updatedUser = {
      ...user,
      name: formData.get('name'),
      title: formData.get('title'),
      bio: formData.get('bio'),
    }
    setUser(updatedUser)
    setIsEditing(false)
  }

  return (
    <div className=' p-4 rounded-top'>
      <div className='card p-5 d-flex '>
        <img
          src={user.image}
          alt={`${user.name}'s profile`}
          className='img-fluid rounded-circle me-3'
          style={{ width: '100px', height: '100px' }}
        />
        <div className='text-left flex-grow-1'>
          <h1 className='h4 pt-2'>{user.name}</h1>
          <h2 className='h6'>{user.title}</h2>
          <p>{user.bio}</p>
        </div>
        <button className='btn btn-light' onClick={() => setIsEditing(true)}>
          <FaEdit />
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSave} className='mt-3'>
          <ProfilePictureUpload onImageChange={handleImageChange} />
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Nome:
            </label>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              defaultValue={user.name}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Titolo:
            </label>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
              defaultValue={user.title}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='bio' className='form-label'>
              Descrizione:
            </label>
            <textarea
              className='form-control'
              id='bio'
              name='bio'
              defaultValue={user.bio}
              required
            />
          </div>
          <button type='submit' className='btn btn-success'>
            Salva
          </button>
          <button
            type='button'
            className='btn btn-secondary ms-2'
            onClick={() => setIsEditing(false)}
          >
            Annulla
          </button>
        </form>
      )}

      {/* Sezione Consigliati per te */}
      <div className='mt-4'>
        <h3 className='h5'>Consigliati per te</h3>
        <ul className=' card'>
          {recommendedItems.map((item) => (
            <li key={item.id} className='list-group-item'>
              <a href={item.link} className='text-decoration-none text-primary'>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Sezione Analisi del Profilo */}
      <div className='mt-4'>
        <h3 className='h5'>Analisi del Profilo</h3>
        <div className='card'>
          <div className='card-body'>
            <p>
              <strong>Visibilità del Profilo:</strong> 85%
            </p>
            <p>
              <strong>Connessioni:</strong> 150
            </p>
            <p>
              <strong>Articoli Pubblicati:</strong> 5
            </p>
            <p>
              <strong>Competenze Aggiunte:</strong> 10
            </p>
            <p>
              <strong>Feedback Positivi:</strong> 95%
            </p>
          </div>
        </div>
      </div>

      {/* Sezione Attività del Profilo */}
      <div className='mt-4 '>
        <h3 className='h5'>Attività Recenti</h3>
        <ul className='card'>
          <li className='list-group-item'>
            Commentato su "Le ultime tendenze nel frontend".
          </li>
          <li className='list-group-item'>
            Pubblicato un articolo: "Introduzione a React Hooks".
          </li>
          <li className='list-group-item'>
            Condiviso un post su LinkedIn riguardo le nuove tecnologie.
          </li>
          <li className='list-group-item'>
            Partecipato a un webinar su Sviluppo Web.
          </li>
          <li className='list-group-item'>
            Aggiornato le competenze: "TypeScript" e "GraphQL".
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileUp
