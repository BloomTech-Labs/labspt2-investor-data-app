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
    };
};

// Action creator to update current email

export const updateEmail = (id, updatedEmail) => {
    return dispatch => {
        // Dispatch to reducer that current settings are being obtained from API
        dispatch({type: FETCHING});
        console.log(id, updatedEmail);
        axios
            // Update email on file in database
            .put(`http://localhost:5000/api/users/${id}`, updatedEmail);
        axios
            .get(`http://localhost:5000/api/users/1`)
            .then(response => {
                // Dispatch to reducer that settings have been successfully updated and obtained, pass API response as payload
                dispatch({
                    type: SUCCESS,
                    payload: response.data
                });
            })
            // Dispatch to reducer that error has occurred, pass error message
            .catch(err => {
                dispatch({
                    type: ERROR,
                    error: `The user's email could not be updated at this time.`
                });
            });
    };
};