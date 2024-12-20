import { SET_ME, SET_ME_ERROR, SET_ME_LOADING } from '../actions'

const initialState = {
  me: {},
  isLoading: true,
  isError: false,
}

const profileReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_ME: {
      return {
        ...state,
        me: action.payload,
      }
    }
    case SET_ME_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    case SET_ME_ERROR: {
      return {
        ...state,
        isError: action.payload,
      }
    }
    default:
      return state
  }
}

export default profileReducers
