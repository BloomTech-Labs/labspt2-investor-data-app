import axios from 'axios';

// Export action types

export const FETCHING = 'FETCHING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

// Action creator to get current settings

export const getSettings = () => {
    return dispatch => {
        // Dispatch to reducer that current settings are being obtained from API
        dispatch({type: FETCHING});
        axios
            .get(`http://localhost:5000/api/users/1`)
            .then(response => {
                // Dispatch to reducer that settings have been successfully obtained, pass API response as payload
                dispatch({
                    type: SUCCESS, 
                    payload: response.data
                });
            })
            .catch(err => {
                // Dispatch to reducer that error has occurred, pass error message
                dispatch({
                    type: ERROR, 
                    error: `The user's current settings could not be obtained at this time.`
                });
            });
    }
}