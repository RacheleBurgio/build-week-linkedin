import { configureStore, combineReducers } from "@reduxjs/toolkit"
import profilesReducers from "../reducers/profileReducer"

const linkedin = combineReducers({
    profile: profilesReducers,
    // posts: postsReducers,
});

const store = configureStore({
    reducer: linkedin, // ricostruito tramite le fette
})

export default store
