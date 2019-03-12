import { FETCHING, SUCCESS, ERROR } from './actions.js';

const initialState = {
    fetchingSettings: false,
    error: null,
    settings: null
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCHING:
            return Object.assign({}, state, {fetchingSettings: true});
        case SUCCESS:
            return Object.assign({}, state, {fetchingSettings: false, error: '', settings: action.payload});
        case ERROR:
            return Object.assign({}, state, {fetchingSettings: false, error: action.error});
        default:
            return state;
    }
};

export default reducer;