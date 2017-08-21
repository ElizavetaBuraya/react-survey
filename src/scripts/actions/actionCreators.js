import {actionTypes} from './actionTypes';

export function setUserData(loggedInAs) {
    return {
        type: actionTypes.LOG_IN,
        payload: loggedInAs
    };
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