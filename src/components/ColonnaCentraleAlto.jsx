import React from 'react';
import '../assets/css/custom-bootstrap.css'

const ColonnaCentraleAlto = ({profile}) => {
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

    {/* Sezione Consigliati per Te */}
    <RecommendedForYou />

    {/* Sezione Analisi */}
    <Analytics />

    {/* Sezione Attività */}
    <Activity />
  </div>
);
};

// Componente Consigliati per Te
const RecommendedForYou = () => {
return (
  <div className="card mb-4">
    <div className="card-header">
      <h5>Consigliati per te</h5>
    </div>
    <div className="card-body">
      <ul className="list-group">
        <li className="list-group-item">Contatto 1</li>
        <li className="list-group-item">Contatto 2</li>
        <li className="list-group-item">Contatto 3</li>
      </ul>
    </div>
  </div>
);
};

// Componente Analisi
const Analytics = () => {
return (
  <div className="card mb-4">
    <div className="card-header">
      <h5>Analisi</h5>
    </div>
    <div className="card-body">
      <p>Visualizzazioni del profilo: 123</p>
      <p>Visualizzazioni dei post: 456</p>
    </div>
  </div>
);
};

// Componente Attività
const Activity = () => {
return (
  <div className="card mb-4">
    <div className="card-header">
      <h5>Attività</h5>
    </div>
    <div className="card-body">
      <ul className="list-group">
        <li className="list-group-item">Hai commentato un post</li>
        <li className="list-group-item">Hai condiviso un articolo</li>
        <li className="list-group-item">Hai aggiunto una nuova competenza</li>
      </ul>
    </div>
  </div>
);
}

export default ColonnaCentraleAlto

