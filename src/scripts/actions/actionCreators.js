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
        isFetching: true
    }
}

export function getUsers(userData) {
    return {
        type: actionTypes.GET_USERS,
        payload: userData,
        isFetching: false
    }
}

export function getSurveys(surveyData) {
    return {
        type: actionTypes.GET_SURVEYS,
        payload: surveyData,
        isFetching: false
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