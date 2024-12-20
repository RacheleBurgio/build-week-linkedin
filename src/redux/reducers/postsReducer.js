import {
  SET_POSTS,
  SET_POSTS_LOADING,
  SET_POSTS_ERROR,
  SET_POSTFETCH_TIME,
  SET_USER_POSTS_NUMBER
} from '../actions'

const initialState = {
  posts: {},
  postsLoading: true,
  postsError: false,
  postFetchTime: new Date(0).toISOString(),
  setUserPostsNumber: 0,
}

const postReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS: {
      return {
        ...state,
        posts: action.payload,
      }
    }
    case SET_POSTS_LOADING: {
      return {
        ...state,
        postsLoading: action.payload,
      }
    }
    case SET_POSTS_ERROR: {
      return {
        ...state,
        postsError: action.payload,
      }
    }
    case SET_POSTFETCH_TIME: {
      return {
        ...state,
        postFetchTime: action.payload,
      }
    }

    case SET_USER_POSTS_NUMBER: {
      return {
        ...state,
        setUserPostsNumber: action.payload,
      }
    }
    default:
      return state
  }
}

export default postReducers
