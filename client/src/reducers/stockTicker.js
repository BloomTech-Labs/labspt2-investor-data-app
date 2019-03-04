import { FETCHING, FETCHED, ERROR } from  "../actions/index";


const initialState = {
  stocks: [],
  fetching: false,
  error: null
};

export const stockTickerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
    return { ...state, fetching: true };
    case FETCHED:
    return { ...state, fetching: false, stocks: action.payload };
    case ERROR:
    return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
};