import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Alert,
  Card,
  Image,
  ListGroup,
} from 'react-bootstrap'
import { SlLike } from 'react-icons/sl'
import { FaRegCommentDots } from 'react-icons/fa6'
import { LuGitCompareArrows } from 'react-icons/lu'
import { BsFillSendFill } from 'react-icons/bs'

import { fetchPosts } from '../redux/actions'

const ProfileContributes = ({ profileId }) => {
  const myProfileId = useSelector((state) => state.profile.me._id)
  const userPosts = useSelector((state) => state.posts.userPosts)
  const postsLoading = useSelector((state) => state.posts.postsLoading)
  const postsError = useSelector((state) => state.posts.postsError)
  const dispatch = useDispatch()

  useEffect(() => {
    // Carica i dati del profilo all'avvio dell'app
    dispatch(fetchPosts()).finally(() => {})
  }, [dispatch])

  if (postsLoading) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <Spinner animation='border' variant='primary' />
      </div>
    )
  }

  if (postsError) {
    return (
      <Alert variant='danger' className='mt-3'>
        Errore nel caricamento dei post
      </Alert>
    )
  }

  return (
    <Container className='mt-3'>
      <h2>Ultimi Posts</h2>
      <ListGroup>
        {userPosts.map((post) => (
          <ListGroup.Item key={post._id} className='mb-3'>
            <h5>{post.text}</h5>
            <p>{post.createdAt}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}

export default ProfileContributes
