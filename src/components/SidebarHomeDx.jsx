import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { SlArrowRight } from "react-icons/sl";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { PiGridFourFill } from "react-icons/pi";

const SidebarHomeDx = () => {
  const [visiblePosts, setVisiblePosts] = useState(5);
  const posts = useSelector((state) => state.posts.posts);
  const postsLoading = useSelector((state) => state.posts.postsLoading);
  const postsError = useSelector((state) => state.posts.postsError);
  const dispatch = useDispatch();

  // const posts = [
  //     { title: "Tech: le tendenze del 2025", date: "2 giorni fa", readers: "2.371 lettori" },
  //     { title: "Come sarà il lavoro nel 2025", date: "1 giorno fa", readers: "442 lettori" },
  //     { title: "\"Chiuso per festa\"", date: "22 minuti fa", readers: "" },
  //     { title: "Big Ideas: 15 spunti per il 2025", date: "2 giorni fa", readers: "4.647 lettori" },
  //     { title: "Unicredit-Banco Bpm", date: "1 giorno fa", readers: "3.743 lettori" },
  //     { title: "Revolut diventa banca italiana", date: "2 giorni fa", readers: "1.048 lettori" },
  //     { title: "Che cosa fa Gemini 2.0", date: "2 giorni fa", readers: "665 lettori" },
  //     { title: "Istantanee dal Maximall Pompeii", date: "2 giorni fa", readers: "456 lettori" },
  //     { title: "Approvato il Ddl Lavoro", date: "2 giorni fa", readers: "445 lettori" },
  //     { title: "Censis fotografa gli italiani", date: "2 giorni fa", readers: "371 lettori" }
  // ]

  const loadMore = () => {
    setVisiblePosts((prev) => Math.min(prev + 5, posts.length));
  };

  const showLess = () => {
    setVisiblePosts(5);
  };

  const randomReaders = () => {
    return Math.floor(Math.random() * 10000) + 1;
  };

  const daySinceDate = (isoDate) => {
    const date = new Date(isoDate);
    const today = new Date();
    const differenceInTime = today - date;
    const differenceInDays = Math.floor(
      differenceInTime / (1000 * 60 * 60 * 24)
    );
    return differenceInDays;
  };

  if (postsLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (postsError) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Alert variant="danger">Errore nel recupero dei post</Alert>
      </div>
    );
  }

  return (
    <Container style={{ width: "18rem" }}>
      <Card>
        <Card.Body>
          <Card.Title>In primo piano</Card.Title>
          <Card.Subtitle>a cura di Linkedin Notizie</Card.Subtitle>
          {/* Post */}
          {posts.slice(0, visiblePosts).map((post, index) => (
            <div key={index} className="mb-2">
              <strong>{post.text.slice(0, 35)}...</strong>
              <div>
                <small>
                  {`${daySinceDate(post.createdAt)} giorni fa`} &nbsp;
                  {`${randomReaders()} lettori`}
                </small>
              </div>
            </div>
          ))}

          {/* Pulsante "Vedi Altro" o "Meno dettagli" */}
          {visiblePosts < posts.length ? (
            <Button variant="link" onClick={loadMore}>
              Vedi Altro
            </Button>
          ) : (
            <Button variant="link" onClick={showLess}>
              Meno dettagli
            </Button>
          )}
          <div>I giochi di oggi</div>
          <Row>
            <Col>
              <PiGridFourFill />
            </Col>
            <Col>
              Tango #74
              <div>Armonizza la griglia</div>
            </Col>
            <Col>
              <SlArrowRight />
            </Col>
          </Row>
          <Row>
            <Col>
              <BsGrid3X3GapFill />
            </Col>
            <Col>
              Queens #234
              <div>Incorona ogni regione</div>
            </Col>
            <Col>
              <SlArrowRight />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SidebarHomeDx;
