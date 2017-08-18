import {actionTypes} from './actionTypes';

export function logIn(isAuthorized, loggedInAs){
    return {
        type: actionTypes.LOG_IN,
        payload: isAuthorized,
        data: loggedInAs
    };
}

export function toggleRegistered(isRegistered){
    return {
        type: actionTypes.TOGGLE_REGISTERED,
        payload: isRegistered,
    };
}

export function updateCurrentPage(currentPage){
    return {
        type: actionTypes.UPDATE_CURRENT_PAGE,
        payload: currentPage,
    };
}