import axios from 'axios'

export const SET_ME = 'SET_ME'
export const SET_ME_LOADING = 'SET_ME_LOADING'
export const SET_ME_ERROR = 'SET_ME_ERROR'


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
            const apiKey = import.meta.env.VITE_LINKEDIN_API_KEY
            const baseEndpoint = 'https://striveschool-api.herokuapp.com/api/profile'

            const response = await axios.get(
                `${baseEndpoint}/${query}`,
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            )
            dispatch(setMe(response.data)) // Aggiorna lo stato con i dati ricevuti
            dispatch(setMeLoading(false))
        } catch (error) {
            console.error('Error fetching ME:', error)
            dispatch(setMeError(error))
            dispatch(setMeLoading(false))
        }
    }
}











//     try {
//         const response = await fetch(`${baseEndpoint}${query}`)
//         if (response.ok) {
//             const { data } = await response.json()
//             console.log('fetchJobs - data', data)
//             dispatch(setSearchResults(data))
//             dispatch(setSearchLoading(false))
//         } else {
//             throw new Error('Error fetching data')
//         }
//     } catch (error) {
//         console.error('Fetch error:', error)
//         dispatch(setSearchError(true))
//         dispatch(setErrorMessage(error.message))
//     }
// }
// }
