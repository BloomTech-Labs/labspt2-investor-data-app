import { FETCHING, SUCCESS, ERROR } from '../actions/settingsActions.js';

const initialState = {
    fetchingSettings: false,
    error: null,
    settings: {
        id: null, 
        firstName: '', 
        lastName: '', 
        email: '', 
        password: ''
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        // Signal to component that current settings are being fetched from the API
        case FETCHING:
            return Object.assign({}, state, {fetchingSettings: true});
        // Signal to component that current settings are no longer being fetched, and store the settings on state
        case SUCCESS:
            return Object.assign({}, state, {fetchingSettings: false, error: '', settings: action.payload});
        // Signal to component that there was an error in fetching the settings
        case ERROR:
            return Object.assign({}, state, {fetchingSettings: false, error: action.error});
        default:
            return state;
    }
};

export default reducer;