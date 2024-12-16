import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ColonnaCentraleAlto = () => {
  return (
    <div className="container mt-4">
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <img 
            src={profile.image || 'https://via.placeholder.com/150'} 
            alt={`${profile.name} ${profile.surname}`} 
            className="rounded-circle me-3" 
            style={{ width: '100px', height: '100px' }} 
          />
          <div>
            <h1 className="h5">{profile.name} {profile.surname}</h1>
            <h2 className="h6 text-muted">{profile.title}</h2>
            <p className="mb-1">{profile.bio}</p>
            <p className="text-primary">{profile.area}</p>
          </div>
        </div>
        <div className="mt-3">
          <button className="btn btn-primary me-2">Connect</button>
          <button className="btn btn-outline-primary">Message</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ColonnaCentraleAlto

