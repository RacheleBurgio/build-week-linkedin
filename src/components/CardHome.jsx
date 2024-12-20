import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Alert,
  Card,
  Image,
} from "react-bootstrap";
import { SlLike } from "react-icons/sl";
import { FaRegCommentDots } from "react-icons/fa6";
import { LuGitCompareArrows } from "react-icons/lu";
import { BsFillSendFill } from "react-icons/bs";

import { fetchPosts } from "../redux/actions";
import { formatDate } from "./tools";

const CardHome = () => {
  // ****************************************************
  // NOTE
  // ****************************************************
  // Per rigenerare l'elenco dei post ricordarsi di:

  // 1. Importare useDispatch e useSelector da react-redux
  // 2. Importare fetchPosts da '../redux/actions'
  // 3. Eseguire il dispatch di fetchPosts(false o true) all'avvio del componente (true forza il ricaricamento, false prende i post già caricati)

  //  useEffect(() => {
  //    // Carica i dati del profilo all'avvio dell'app
  //      dispatch(fetchPosts(false)) // false o true impone il refresh dei posts all'interno dello stato redux
  //    }, [dispatch])

  // 4. Gestire il caricamento e l'errore dei post

  const myProfileId = useSelector((state) => state.profile.me._id);
  const posts = useSelector((state) => state.posts.posts);
  const postsLoading = useSelector((state) => state.posts.postsLoading);
  const postsError = useSelector((state) => state.posts.postsError);
  const dispatch = useDispatch();

  useEffect(() => {
    // Carica i dati del profilo all'avvio dell'app
    dispatch(fetchPosts(false)); // false o true impone il refresh dei posts all'interno dello stato redux
  }, [dispatch]);

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
    <Container className="p-0">
      {posts.map((post) => (
        <Card key={post._id} className="post-card my-3">
          <Card.Img
            variant="top"
            src={`https://picsum.photos/500/200?random=${post._id}`}
            alt={post._id}
          />
          <Card.Header className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Image
                src={`https://picsum.photos/50/50?random=${post.user._id}`}
                alt={post.username}
                roundedCircle
              />
              <div className="ms-3">
                <Link
                  to={`/profile/${post.user._id}`}
                  className="m-0 fw-bold text-dark text-decoration-none"
                >
                  {post.username}
                </Link>
                <p className="text-muted fs-7">
                  {formatDate(new Date(post.createdAt))}
                </p>
              </div>
            </div>
            <Button variant="outline-primary">+ Segui</Button>
          </Card.Header>
          <Card.Body>
            <Card.Text>{post.text}</Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-around">
            <Button variant="light">
              <SlLike /> Consiglia
            </Button>
            <Button variant="light">
              <FaRegCommentDots /> Commenta
            </Button>
            <Button variant="light">
              <LuGitCompareArrows /> Diffondi il post
            </Button>
            <Button variant="light">
              <BsFillSendFill /> Invia
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </Container>
  );
};

export default CardHome;
