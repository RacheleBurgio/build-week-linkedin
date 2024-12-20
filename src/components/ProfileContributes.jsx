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
} from 'react-bootstrap'
import { SlLike } from 'react-icons/sl'
import { FaRegCommentDots } from 'react-icons/fa6'
import { LuGitCompareArrows } from 'react-icons/lu'
import { BsFillSendFill } from 'react-icons/bs'

import { fetchPosts } from '../redux/actions'

const ProfileContributes = ({ profileId }) => {}

export default ProfileContributes
