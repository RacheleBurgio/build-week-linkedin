import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfilePictureUpload from "./ProfilePictureUpload";
import { FaEdit } from "react-icons/fa";
import { Spinner, Alert } from "react-bootstrap";

const ProfileUp = ({ profileId }) => {
  const me = useSelector((state) => state.profile.me);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      if (me._id !== profileId) {
        try {
          const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY;
          const baseEndpoint =
            "https://striveschool-api.herokuapp.com/api/profile";
          const response = await axios.get(`${baseEndpoint}/${profileId}`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          });
          setUser(response.data);
          setError(null);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setError(error);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(me);
        setLoading(false);
      }
    };
    fetchUser();
  }, [me._id, profileId]);

  const handleImageChange = (newImage) => {
    setUser((prevUser) => ({ ...prevUser, image: newImage }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedUser = {
      ...user,
      name: formData.get("name"),
      title: formData.get("title"),
      bio: formData.get("bio"),
    };
    setUser(updatedUser);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Alert variant="danger">
          Errore nel recupero dele esperienze {props.profileId}
        </Alert>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Alert variant="danger">Utente {props.profileId} non trovato</Alert>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-top">
      <div className="card p-5 d-flex">
        <img
          src={user.image}
          alt={`${user.name}'s profile`}
          className="img-fluid rounded-circle me-3"
          style={{ width: "100px", height: "100px" }}
        />
        <div className="text-left flex-grow-1">
          <h1 className="h4 pt-2">{user.name}</h1>
          <h2 className="h6">{user.title}</h2>
          <p>{user.bio}</p>
        </div>
        <button className="btn btn-light" onClick={() => setIsEditing(true)}>
          <FaEdit />
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSave} className="mt-3">
          <ProfilePictureUpload onImageChange={handleImageChange} />
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nome:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              defaultValue={user.name}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Titolo:
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              defaultValue={user.title}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bio" className="form-label">
              Descrizione:
            </label>
            <textarea
              className="form-control"
              id="bio"
              name="bio"
              defaultValue={user.bio}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Salva
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setIsEditing(false)}
          >
            Annulla
          </button>
        </form>
      )}

      <div className="mt-4">
        <h3 className="fs-5 ps-0 pt-2 fw-bold">Consigliato per te</h3>
        <ul className="card">
          {["Giovanni Bianchi", "Laura Verdi", "Marco Neri"].map(
            (name, index) => (
              <li key={index} className="list-group-item ">
                <a
                  href="#"
                  className="text-decoration-none py-0 text-primary"
                  style={{
                    fontSize: "0.85rem",
                  }}
                >
                  {name}
                </a>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="mt-4">
        <div className="card">
          <h3 className="fs-6 ps-2 pt-2 fw-bold">Analisi del Profilo</h3>
          <div className="card-body">
            <p>
              <strong
                style={{
                  fontSize: "0.85rem",
                }}
              >
                Visibilità del Profilo:
              </strong>{" "}
              85%
            </p>
            <p>
              <strong
                style={{
                  fontSize: "0.85rem",
                }}
              >
                Connessioni:
              </strong>{" "}
              150
            </p>
            <p>
              <strong
                style={{
                  fontSize: "0.85rem",
                }}
              >
                Articoli Pubblicati:
              </strong>{" "}
              5
            </p>
            <p>
              <strong
                style={{
                  fontSize: "0.85rem",
                }}
              >
                Competenze Aggiunte:
              </strong>{" "}
              10
            </p>
            <p>
              <strong
                style={{
                  fontSize: "0.85rem",
                }}
              >
                Feedback Positivi:
              </strong>{" "}
              95%
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="card">
          <h3 className="fs-6 ps-2 pt-2 fw-bold ">Attività Recenti</h3>

          <ul>
            <li
              className="list-group-item"
              style={{
                fontSize: "0.85rem",
              }}
            >
              Commentato su "Le ultime tendenze nel frontend".
            </li>
            <li
              className="list-group-item"
              style={{
                fontSize: "0.85rem",
              }}
            >
              Pubblicato un articolo: "Introduzione a React Hooks".
            </li>
            <li
              className="list-group-item"
              style={{
                fontSize: "0.85rem",
              }}
            >
              Condiviso un post su LinkedIn riguardo le nuove tecnologie.
            </li>
            <li
              className="list-group-item"
              style={{
                fontSize: "0.85rem",
              }}
            >
              Partecipato a un webinar su Sviluppo Web.
            </li>
            <li
              className="list-group-item"
              style={{
                fontSize: "0.85rem",
              }}
            >
              Aggiornato le competenze: "TypeScript" e "GraphQL".
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileUp;
