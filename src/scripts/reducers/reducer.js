import {actionTypes} from '../actions/actionTypes';

const initialState = {
    isRegistered: JSON.parse(sessionStorage.getItem('isRegistered')),
    isAuthorized: JSON.parse(sessionStorage.getItem('isAuthorized')),
    loggedInAs: JSON.parse(sessionStorage.getItem('loggedInAs')),
    currentPage: '',
    isFetching: false,
    userData: [{"id":"нет данных","name":"нет данных","role":"нет данных",
        "registered":"нет данных","completed_surveys":"нет данных"}],
    surveyData: [{'id':'нет данных','name':'нет данных','changed':'нет данных','answers':'нет данных',
        'link':'null', 'results':'null', 'pages':'нет данных','questions':'нет данных', 'description':'нет данных'}],
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
        case actionTypes.REQUEST_DATA:
            return {...state, isFetching: true};
        case actionTypes.REDIRECT:
            return {...state, redirect: !state.redirect, path: action.payload};
        case actionTypes.GET_USERS:
            return {...state, isFetching: false, userData: action.payload};
        case actionTypes.GET_SURVEYS:
            return {...state, isFetching: false, surveyData: action.payload};
        default:
            return state
    }
}