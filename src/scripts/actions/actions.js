import { setUserData, toggleRegistered, getUsers, getSurveys, requestData } from './actionCreators.js';

const fetchUsers = 'http://localhost:3000/users/';
const fetchSurveys = 'http://localhost:3000/surveys/';

export function logIn(userData){
    return (dispatch) => {
        if (!userData) {
            dispatch(setUserData(userData));
        } else {
            return fetch(fetchUsers)
                .then((resp) => resp.json())
                .then(function (data) {
                    let login = userData.login;
                    let password = userData.password;

                    return data.find((user) => (user.login === login && user.password === password));
                })
                .then(function (user) {
                    if (user === undefined) {
                        alert("Неверное имя пользователя или пароль");
                    } else {
                        let userData = {
                            "id": user.id,
                            "username": user.name,
                            "role": user.role,
                            "surveys": user.surveys.map((survey) => survey.id)
                        };

                        alert("Вход успешен");
                        dispatch(setUserData(userData));
                    }
                });
        }
    }
}

export function createUser(values) {
    return (dispatch) => {
        fetch(fetchUsers)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.find((user) => (user.login === values.email))) {
                    alert('Такой пользователь уже существует!')
                } else if (values.password !== values.repeat_password) {
                    alert('Пароли не совпадают!')
                } else {
                    let date = new Date();
                    let day = date.getDate();
                    let month = date.getMonth() + 1;
                    let year = date.getFullYear();

                    day = (day < 10) ? '0' + day : day;
                    month = (month < 10) ? '0' + month : month;
                    date = day + '.' + month + '.' + year;

                    let newUser = {
                        "id": (new Date).getTime(),
                        "name": values.name,
                        "role": 'Пользователь',
                        "registered": date,
                        "completed_surveys": 0,
                        "login": values.email,
                        "password": values.password
                    };

                    return newUser;
                }
            })
            .then((newUser) => {
                if (newUser) {
                    return fetch(fetchUsers, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newUser)
                    }).then((response) => {
                        if (response.ok) {
                            alert('Профиль создан успешно!');
                            dispatch(toggleRegistered);
                        } else {
                            throw new Error('Ошибка при создании профиля');
                        }
                    });
                } else {
                    return null;
                }
            })
    }
}

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

