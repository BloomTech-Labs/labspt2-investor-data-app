import { FETCHING, GET_SETTINGS, ERROR } from './actions.js';

const initialState = {
    fetchingSettings: false,
    error: null,
    firstName: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCHING:
            return Object.assign({}, state, {fetchingSettings: true});
        case GET_SETTINGS:
            return Object.assign({}, state, {fetchingSettings: false, error: '', firstName: action.payload.firstName});
        case ERROR:
            return Object.assign({}, state, {fetchingSmurfs: false, error: action.error});
    }
};

export default reducer;