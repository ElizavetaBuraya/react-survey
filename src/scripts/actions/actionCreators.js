import {actionTypes} from './actionTypes';

export function setUserData(loggedInAs) {
    return {
        type: actionTypes.LOG_IN,
        payload: loggedInAs
    };
}

export function requestData() {
    return {
        type: actionTypes.REQUEST_DATA,
    }
}

export function getUsers(userData) {
    return {
        type: actionTypes.GET_USERS,
        payload: userData,
    }
}

export function getSurveys(surveyData) {
    return {
        type: actionTypes.GET_SURVEYS,
        payload: surveyData,
    }
}

export function redirect(path) {
    return {
        type: actionTypes.REDIRECT,
        payload: path
    }
}

export function toggleRegistered(){
    return {
        type: actionTypes.TOGGLE_REGISTERED
    };
}

export function updateCurrentPage(currentPage){
    return {
        type: actionTypes.UPDATE_CURRENT_PAGE,
        payload: currentPage,
    };
}