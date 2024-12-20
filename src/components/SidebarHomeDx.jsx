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

  const loadMore = () => {
    setVisiblePosts((prev) => Math.min(prev + 5, posts.length));
  };

  const showLess = () => {
    setVisiblePosts((prev) => Math.max(prev - 5, 5));
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
    <Container style={{ width: "18rem" }} className="mt-3">
      <Card>
        <Card.Body>
          <Card.Title>In primo piano</Card.Title>
          <Card.Subtitle className="pb-3">
            a cura di Linkedin Notizie
          </Card.Subtitle>
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
          {visiblePosts < 10 ? (
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
            <Col className="col-2">
              <PiGridFourFill />
            </Col>
            <Col className="col-8">
              Tango #74
              <div>Armonizza la griglia</div>
            </Col>
            <Col className="col-2">
              <SlArrowRight />
            </Col>
          </Row>
          <Row>
            <Col className="col-2">
              <BsGrid3X3GapFill />
            </Col>
            <Col className="col-8">
              Queens #234
              <div>Incorona ogni regione</div>
            </Col>
            <Col className="col-2">
              <SlArrowRight />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SidebarHomeDx;
