import { setUserData, toggleRegistered } from './actionCreators.js';
import { getCurrentDate } from '../utils/helperFunctions.js'
import { SubmissionError } from 'redux-form';

const fetchUsers = 'http://localhost:3000/users/';

export function logIn(userData){
    return (dispatch) => {
        if (!userData) {
            dispatch(setUserData(userData));
        } else {
            return fetch(fetchUsers)
                .then((resp) => resp.json())
                .then(function (data) {
                    return data.find((user) =>
                        (user.login === userData.login && user.password === userData.password));
                })
                .then(function (user) {
                    if (user === undefined) {
                        throw new SubmissionError({
                            login: 'Неверное имя пользователя или пароль',
                            _error: 'Ошибка входа'
                        })
                    } else {
                        let userData = {
                            "id": user.id,
                            "username": user.name,
                            "role": user.role,
                            "surveys": user.surveys.map((survey) => survey.id)
                        };

                        dispatch(setUserData(userData));
                    }
                });
        }
    }
}

export function createUser(values) {
    return (dispatch) => {
        return fetch(fetchUsers)
            .then((resp) => resp.json())
            .then(function (data) {
                if (data.find((user) => (user.login === values.email))) {
                    throw new SubmissionError({
                        email: 'Такой пользователь уже существует',
                        _error: 'Ошибка регистрации'
                    });
                } else {
                    return {
                        "id": (new Date).getTime(),
                        "name": values.name.trim(),
                        "role": 'Пользователь',
                        "registered": getCurrentDate(),
                        "completed_surveys": 0,
                        "login": values.email,
                        "password": values.password,
                        "surveys": []
                    };
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
                            dispatch(toggleRegistered());
                        } else {
                            throw new Error('Ошибка при создании профиля');
                        }
                    });
                }
            })
    }
}