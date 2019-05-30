import axios from "axios";

// Export action types

export const FETCHING = "FETCHING";
export const SUCCESS = "SUCCESS";
export const LOGOUT = "LOGOUT";
export const ERROR = "ERROR";
// making a small change
//URL Endpoints
 const URL = "http://localhost:5000/api";
//const URL = "https://pickemm.herokuapp.com/api";

// Action creator to get current account type

export const getAcct = uid => {
  return dispatch => {
    // Dispatch to reducer that current account type are being obtained from API
    dispatch({ type: FETCHING });
    axios
      .get(`${URL}/billing/${uid}`)
      .then(response => {
        // Dispatch to reducer that account type have been successfully obtained, pass API response as payload
        dispatch({
          type: SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        // Dispatch to reducer that error has occurred, pass error message
        dispatch({
          type: ERROR,
          error: `The user's account type could not be obtained at this time.`
        });
      });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({ type: LOGOUT });
  };
};
