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
            sessionStorage.setItem('isAuthorized', action.payload);
            sessionStorage.setItem('loggedInAs', JSON.stringify(action.data));
            return {...state, isAuthorized: action.payload, loggedInAs: action.data};
        case actionTypes.TOGGLE_REGISTERED:
            sessionStorage.setItem('isRegistered', action.payload);
            return {...state, isRegistered: action.payload};
        case actionTypes.UPDATE_CURRENT_PAGE:
            return {...state, currentPage: action.payload};
        default:
            return state
    }
}