import { getUsers, requestData } from './actionCreators.js';
import { loadSurvey } from './surveyActionCreators.js';

const fetchUsers = 'http://localhost:3000/users/';

export function getUserData() {
    return (dispatch) => {
        dispatch(requestData());
        fetch(fetchUsers)
            .then((resp) => resp.json())
            .then(function (data) {
                dispatch(getUsers(data));
            });
    }
}

export function deleteUserData(id) {
    return (dispatch) => {
        fetch(fetchUsers + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }})
            .then((resp) => resp.json())
            .then(function() {
                dispatch(getUserData());
            });
    }
}

export function editUserData(user) {
    return (dispatch) => {
        fetch(fetchUsers + user.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)})
            .then((resp) => resp.json())
            .then(function() {
                dispatch(getUserData());
            });
    }
}

export function loadUser(userId, surveyId, survey) {
    return (dispatch) => {
        fetch(fetchUsers + userId)
            .then((resp) => resp.json())
            .then(function(data) {
                let completedSurveys = data.completed_surveys;
                let surveys = data.surveys;
                surveys.push(survey);

                dispatch(updateUser(userId, surveyId, {
                    'completed_surveys':++completedSurveys,
                    'surveys': surveys
                }));
            });
    }
}


export function updateUser(userId, surveyId, user) {
    return (dispatch, getState) => {
        fetch(fetchUsers + userId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)})
            .then((resp) => resp.json())
            .then(function() {
                let userSurveys = getState().renderApp.loggedInAs.surveys;
                userSurveys.push(surveyId);
                sessionStorage.setItem('loggedInAs', JSON.stringify(userSurveys));

                alert('Опрос отправлен успешно!');
                dispatch(loadSurvey(surveyId));
            });
    }
}



