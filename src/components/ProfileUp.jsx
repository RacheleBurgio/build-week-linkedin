
import React from 'react'
import '../assets/css/custom-bootstrap.css'
import Profile from './Profile'

const ProfileUp = ({
  profile,
  recommendedContacts,
  analyticsData,
  activityList,
}) => {
  return (
    <div className='container mt-4'>
      <div className='card mb-4'>
        <div className='card-body'>
          <div className='d-flex align-items-center'>
            <img
              src={profile.image || 'https://via.placeholder.com/150'}
              alt={`${profile.name} ${profile.surname}`}
              className='rounded-circle me-3'
              style={{ width: '100px', height: '100px' }}
            />
            <div>
              <h1 className='h5'>
                {profile.name} {profile.surname}
              </h1>
              <h2 className='h6 text-muted'>{profile.title}</h2>
              <p className='mb-1'>{profile.bio}</p>
              <p className='text-primary'>{profile.area}</p>
            </div>
          </div>
          <div className='mt-3'>
            <button className='btn btn-primary me-2'>Connect</button>
            <button className='btn btn-outline-primary'>Message</button>
          </div>
        </div>
      </div>

      {/* Sezione Consigliati per Te */}
      <RecommendedForYou contacts={recommendedContacts} />

      {/* Sezione Analisi */}
      <Analytics data={analyticsData} />

      {/* Sezione Attività */}
      <Activity activities={activityList} />
    </div>
  )
}

// Componente Consigliati per Te
const RecommendedForYou = ({ contacts }) => {
  return (
    <div className='card mb-4'>
      <div className='card-header'>
        <h5>Consigliati per te</h5>
      </div>
      <div className='card-body'>
        <ul className='list-group'>
          {contacts.map((contact, index) => (
            <li key={index} className='list-group-item'>
              {contact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Componente Analisi
const Analytics = ({ data }) => {
  return (
    <div className='card mb-4'>
      <div className='card-header'>
        <h5>Analisi</h5>
      </div>
      <div className='card-body'>
        <p>Visualizzazioni del profilo: {data.profileViews}</p>
        <p>Visualizzazioni dei post: {data.postViews}</p>
      </div>
    </div>
  )
}

// Componente Attività
const Activity = ({ activities }) => {
  return (
    <div className='card mb-4'>
      <div className='card-header'>
        <h5>Attività</h5>
      </div>
      <div className='card-body'>
        <ul className='list-group'>
          {activities.map((activity, index) => (
            <li key={index} className='list-group-item'>
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProfileUp

