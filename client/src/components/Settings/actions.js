import axios from 'axios';

// Export action types

export const FETCHING = 'FETCHING';
export const GET_SETTINGS = 'GET_SETTINGS';
export const ERROR = 'ERROR';

// Get current settings

export const getSettings = () => {
    return (dispatch) => {
        dispatch({type: FETCHING});
        axios
            .get(`http//localhost:5000/api/users/1`)
            .then(response => {
                dispatch({type: GET_SETTINGS, payload: response.data});
            })
            .catch(err => {
                dispatch({type: ERROR, error: `The user's current settings could not be obtained at this time.`});
            })
    }
}