import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";

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
          <Card.Title className="fw-bold">In primo piano</Card.Title>
          <Card.Subtitle className="pb-3 fs-6 text-muted">
            a cura di Linkedin Notizie
          </Card.Subtitle>
          {/* Post */}
          {posts.slice(0, visiblePosts).map((post, index) => (
            <div key={index} className="mb-2">
              <strong
                style={{
                  fontSize: "0.85rem",
                }}
              >
                {post.text.slice(0, 35)}...
              </strong>
              <div>
                <small className="fs-7 fw-bold text-muted ">
                  {`${daySinceDate(post.createdAt)} giorni fa`} &nbsp;• &nbsp;
                  {`${randomReaders()} lettori`}
                </small>
              </div>
            </div>
          ))}

          {/* Pulsante "Vedi Altro" o "Meno dettagli" */}
          {visiblePosts < 10 ? (
            <Button
              variant="link"
              onClick={loadMore}
              style={{ textDecoration: "none", fontSize: "0.85rem" }}
              className="text-dark fw-bold ps-0"
            >
              Vedi Altro <IoChevronDown />
            </Button>
          ) : (
            <Button
              variant="link"
              onClick={showLess}
              style={{ textDecoration: "none", fontSize: "0.85rem" }}
              className="text-dark fw-bold ps-0"
            >
              Meno dettagli&nbsp;
              <IoChevronUp />
            </Button>
          )}
          <div className="fw-bold text-muted pt-2">I giochi di oggi</div>
          <Row className="mt-2">
            <Col className="col-2">
              <img src="/assets/imgs/quad.png" />
            </Col>
            <Col
              className="col-8 ps-4"
              style={{
                fontSize: "0.85rem",
              }}
            >
              <div className="fw-bold">Tango #74</div>
              <div className="fs-7 text-muted">Armonizza la griglia</div>
            </Col>
            <Col className="col-2">
              <SlArrowRight />
            </Col>
          </Row>
          <Row className="mt-1">
            <Col className="col-2">
              <img src="/assets/imgs/rubik.png" />
            </Col>
            <Col
              className="col-8 ps-4"
              style={{
                fontSize: "0.85rem",
              }}
            >
              <div className="fw-bold">Queens #234</div>
              <div className="fs-7 text-muted">Incorona ogni regione</div>
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
