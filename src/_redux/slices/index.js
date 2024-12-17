import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// API key per tutte le chiamate
const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY;

// **Funzione per recuperare i dati del profilo**
const getProfileData = async (profileId = 'me') => {
    const baseUrl = 'https://striveschool-api.herokuapp.com/api/profile';
    const profileUrl = profileId === 'me' ? `${baseUrl}/me` : `${baseUrl}/${profileId}`;
    const experiencesUrl = `${baseUrl}/${profileId}/experiences`;

    const headers = {
        Authorization: `Bearer ${apiKey}`,
    };

    try {
        const profileResponse = await axios.get(profileUrl, { headers });
        const experiencesResponse = await axios.get(experiencesUrl, { headers });

        return {
            profile: profileResponse.data,
            experiences: experiencesResponse.data,
        };
    } catch (error) {
        throw new Error(error.response?.data || 'Errore nel recupero dei dati');
    }
};

// **Slice per il profilo**
const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        me: {
            profile: null,
            experiences: [],
            status: 'idle',
            error: null,
        },
        otherProfile: {
            profile: null,
            experiences: [],
            status: 'idle',
            error: null,
        },
    },
    reducers: {
        setProfileLoading(state, action) {
            const { type } = action.payload; // "me" o "otherProfile"
            state[type].status = 'loading';
            state[type].error = null;
        },
        setProfileSuccess(state, action) {
            const { type, profile, experiences } = action.payload; // "me" o "otherProfile"
            state[type].status = 'succeeded';
            state[type].profile = profile;
            state[type].experiences = experiences;
        },
        setProfileError(state, action) {
            const { type, error } = action.payload; // "me" o "otherProfile"
            state[type].status = 'failed';
            state[type].error = error;
        },
    },
});

// **Actions generate automaticamente**
export const { setProfileLoading, setProfileSuccess, setProfileError } = profileSlice.actions;

// **Thunk manuale per recuperare il profilo personale**
export const fetchMe = () => async (dispatch) => {
    dispatch(setProfileLoading({ type: 'me' }));
    try {
        const data = await getProfileData('me');
        dispatch(setProfileSuccess({ type: 'me', ...data }));
    } catch (error) {
        dispatch(setProfileError({ type: 'me', error: error.message }));
    }
};

// **Thunk manuale per recuperare un altro profilo**
export const fetchOtherProfile = (profileId) => async (dispatch) => {
    dispatch(setProfileLoading({ type: 'otherProfile' }));
    try {
        const data = await getProfileData(profileId);
        dispatch(setProfileSuccess({ type: 'otherProfile', ...data }));
    } catch (error) {
        dispatch(setProfileError({ type: 'otherProfile', error: error.message }));
    }
};

// **Esporta il reducer**
export default profileSlice.reducer;
