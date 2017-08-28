import { getSurveys, requestData, redirect } from './actionCreators.js';

const fetchSurveys = 'http://localhost:3000/surveys/';

export function getSurveyData() {
    return (dispatch, getState) => {
        dispatch(requestData());
        fetch(fetchSurveys)
            .then((resp) => resp.json())
            .then(function (data) {
                let userSurveysArray = [];

                data.forEach((survey) => {
                    let userSurveys = getState().renderApp.loggedInAs.surveys;
                    if (!userSurveys.includes(survey.id)) {
                        let userSurvey = {
                            "id": survey.id,
                            "name": survey.name,
                            "link": survey.link
                        };
                        userSurveysArray.push(userSurvey);
                    }
                });

                if (getState().renderApp.currentPage === '/templates') {
                    let templates = data.filter((obj) => obj.template === true);

                    dispatch(getSurveys(templates));
                } else {
                    (getState().renderApp.loggedInAs.role === 'Администратор')
                        ? dispatch(getSurveys(data))
                        : dispatch(getSurveys(userSurveysArray));
                }
            });
    }
}

export function deleteSurveyData(id) {
    return (dispatch) => {
        fetch(fetchSurveys + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }})
            .then((resp) => resp.json())
            .then(function() {
                dispatch(getSurveyData());
            });
    }
}

export function editSurveyData(survey) {
    return (dispatch) => {
        fetch(fetchSurveys + survey.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(survey)})
            .then((resp) => resp.json())
            .then(function() {
                dispatch(getSurveyData());
            });
    }
}

export function deleteTemplate(id) {
    return (dispatch) => {
        fetch(fetchSurveys + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'template':false
            })})
            .then((resp) => resp.json())
            .then(function() {
                dispatch(getSurveyData());
            });
    }
}

export function createSurvey(survey, path) {
    return (dispatch) => {
        fetch(fetchSurveys, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(survey)})
            .then((resp) => resp.json())
            .then(function() {
                alert('Опрос создан успешно!');
                dispatch(redirect(path));
            })
            .then(function() {
                dispatch(redirect(null));
            })
    }
}

export function updateSurvey(survey, id, template) {
    return (dispatch) => {
        fetch(fetchSurveys + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(survey)})
            .then((resp) => resp.json())
            .then(function() {
                let path = (!template || template === undefined) ? '/surveys' : '/templates';
                if (template !== undefined) {
                    let alertSurvey = (template) ? 'Шаблон' : 'Опрос';
                    alert(alertSurvey + ' обновлен успешно!');
                }
                dispatch(redirect(path));
            })
            .then(function() {
                dispatch(redirect(null));
            })
    }
}

export function loadSurvey(id, template) {
    return (dispatch) => {
        fetch(fetchSurveys + id)
            .then((resp) => resp.json())
            .then(function (data) {
                let completedSurveys = data.answers;
                dispatch(updateSurvey({'answers' : ++completedSurveys}, id, template));
            });
    }
}


