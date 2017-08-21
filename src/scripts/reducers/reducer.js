import {actionTypes} from '../actions/actionTypes';

const initialState = {
    isRegistered: JSON.parse(sessionStorage.getItem('isRegistered')),
    isAuthorized: JSON.parse(sessionStorage.getItem('isAuthorized')),
    loggedInAs: JSON.parse(sessionStorage.getItem('loggedInAs')),
    currentPage: '',
};

export default function renderApp(state = initialState, action) {
    switch(action.type){
        case actionTypes.LOG_IN:
            sessionStorage.setItem('isAuthorized', !state.isAuthorized);
            sessionStorage.setItem('loggedInAs', JSON.stringify(action.payload));
            return {...state, isAuthorized: !state.isAuthorized, loggedInAs: action.payload};
        case actionTypes.TOGGLE_REGISTERED:
            sessionStorage.setItem('isRegistered', !state.isRegistered);
            return {...state, isRegistered: !state.isRegistered};
        case actionTypes.UPDATE_CURRENT_PAGE:
            return {...state, currentPage: action.payload};
        default:
            return state
    }
}