import { configureStore, combineReducers } from '@reduxjs/toolkit'
import profilesReducers from '../reducers/profileReducer'
import postsReducers from '../reducers/postsReducer'

const linkedin = combineReducers({
  profile: profilesReducers,
  posts: postsReducers,
})

const store = configureStore({
  reducer: linkedin, // ricostruito tramite le fetteposts
})

export default store
