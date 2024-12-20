import axios from 'axios'

//
// CONSTANTS
//
export const SET_ME = 'SET_ME'
export const SET_ME_LOADING = 'SET_ME_LOADING'
export const SET_ME_ERROR = 'SET_ME_ERROR'
export const SET_POSTS = 'SET_POSTS'
export const SET_POSTS_LOADING = 'SET_POSTS_LOADING'
export const SET_POSTS_ERROR = 'SET_POSTS_ERROR'
export const SET_POSTFETCH_TIME = 'SET_POSTFETCH_TIME'
export const SET_USER_POSTS_NUMBER = 'SET_USER_POSTS_NUMBER'
export const SET_USER_POSTS = 'SET_USER_POSTS'

export const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY

//
// PROFILE ACTIONS
//
export const setMe = (profileData) => {
  return {
    type: SET_ME,
    payload: profileData,
  }
}

export const setMeLoading = (loading) => {
  return {
    type: SET_ME_LOADING,
    payload: loading,
  }
}

export const setMeError = (error) => {
  return {
    type: SET_ME_ERROR,
    payload: error,
  }
}

export const getMe = (query = 'me') => {
  return async (dispatch) => {
    dispatch(setMeLoading(true))
    try {
      const baseEndpoint = 'https://striveschool-api.herokuapp.com/api/profile'

      const response = await axios.get(`${baseEndpoint}/${query}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      dispatch(setMe(response.data)) // Aggiorna lo stato con i dati ricevuti
      dispatch(setMeLoading(false))
    } catch (error) {
      console.error('Error fetching ME:', error)
      dispatch(setMeError(error))
      dispatch(setMeLoading(false))
    }
  }
}

//
// POST ACTIONS
//
export const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    payload: posts,
  }
}

export const setPostsLoading = (loading) => {
  return {
    type: SET_POSTS_LOADING,
    payload: loading,
  }
}

export const setPostsError = (error) => {
  return {
    type: SET_POSTS_ERROR,
    payload: error,
  }
}

export const setPostFetchTime = (time) => {
  return {
    type: SET_POSTFETCH_TIME,
    payload: time,
  }
}

export const setUserPostsNumber = (number) => {
  return {
    type: SET_USER_POSTS_NUMBER,
    payload: number,
  }
}

export const setUserPosts = (posts) => {
  return {
    type: SET_USER_POSTS,
    payload: posts,
  }
}

export const fetchPosts = (forceFetch = false) => {
  return async (dispatch, getState) => {
    const postFetchTime = getState().posts.postFetchTime
    const profileId = getState().profile.me._id
    const currentTime = new Date().getTime()
    const fetchTime = new Date(postFetchTime).getTime()
    const fiveMinutes = 5 * 60 * 1000

    console.log('currentTime is:', currentTime)
    console.log('Posts fetchTime is:', fetchTime)

    if (currentTime - fetchTime < fiveMinutes && !forceFetch) {
      console.log('forceFetch is:', forceFetch)
      console.log('Posts already fetched in the last 5 minutes')
      return
    }

    try {
      dispatch(setPostsLoading(true))
      const response = await axios.get(
        `https://striveschool-api.herokuapp.com/api/posts`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      const sortedPosts = response.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .filter((post) => post.text.length > 49) // Filtro un po' di mondezza...

      const userPosts = response.data.filter(
        (post) => post.user._id === profileId
      )

      dispatch(setPosts(sortedPosts))
      dispatch(setPostsLoading(false))
      dispatch(setPostFetchTime(new Date().toISOString()))
      dispatch(setUserPostsNumber(userPosts.length))
      dispatch(setUserPosts(userPosts))
    } catch (error) {
      console.error('Error fetching posts:', error)
      dispatch(setPostsLoading(false))
      dispatch(setPostsError(true))
    }
  }
}
