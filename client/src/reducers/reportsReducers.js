import { FETCHING, SUCCESS, LOGOUT, ERROR } from "../actions/reportsActions";

const initialState = {
  fetchingBilling: false,
  error: null,
  billing: {
    id: null,
    accountType: null,
    usersId: ""
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Signal to component that current billing are being fetched from the API
    case FETCHING:
      return { ...state, fetchingBilling: true };
    // Signal to component that current billing are no longer being fetched, and store the billing on state
    case SUCCESS:
      return {
        ...state,
        fetchingBilling: false,
        error: "",
        billing: action.payload
      };
    case LOGOUT:
      return {
        initialState
      };
    // Signal to component that there was an error in fetching the billing
    case ERROR:
      return { ...state, fetchingBilling: false, error: action.error };
    default:
      return state;
  }
};

export default reducer;
