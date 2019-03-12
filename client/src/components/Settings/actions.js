import axios from 'axios';

// Export action types

export const FETCHING = 'FETCHING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

// Action creator to get current settings

export const getSettings = () => {
    return dispatch => {
        dispatch({type: FETCHING});
        axios
            .get(`http://localhost:5000/api/users/1`)
            .then(response => {
                dispatch({
                    type: SUCCESS, 
                    payload: response.data
                });
            })
            .catch(err => {
                dispatch({
                    type: ERROR, 
                    error: `The user's current settings could not be obtained at this time.`
                });
            });
    }
}