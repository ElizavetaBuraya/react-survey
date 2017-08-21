import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogInClick = this.handleLogInClick.bind(this);
        this.handleLogOutClick = this.handleLogOutClick.bind(this);
        this.handleRegisteredClick = this.handleRegisteredClick.bind(this);
        this.handleNotRegisteredClick = this.handleNotRegisteredClick.bind(this);
        this.handleCreateUserClick = this.handleCreateUserClick.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    handleRegisteredClick() {
        this.props.handleRegisteredClick(true);
    }

    handleNotRegisteredClick() {
        this.props.handleRegisteredClick(false);
    }

    handleLogInClick(data) {
        let that = this;
        let login = data.login;
        let password = data.password;

        fetch('http://localhost:3000/users/')
            .then((resp) => resp.json())
            .then(function (data) {
                return data.find((user) => (user.login === login && user.password === password));
            })
            .then(function (user) {
                if (user !== undefined) {
                    let userData =  {"id": user.id, "username": user.name, "role": user.role};

                    alert("Вход успешен");
                    that.props.handleLogInOutClick(true, userData);
                } else {
                    alert("Неверное имя пользователя или пароль");
                }
            });
    }

    handleLogOutClick() {
        this.props.handleLogInOutClick(false, null);
    }

    handleCreateUserClick(values) {
        let that = this;

        fetch('http://localhost:3000/users/')
            .then((resp) => resp.json())
            .then(function (data) {
                if (data.find((user) => (user.login === values.email))) {
                    alert('Такой пользователь уже существует!')
                } else if (values.password !== values.repeat_password) {
                    alert('Пароли не совпадают!')
                } else {
                    let date = new Date();
                    let day = date.getDate();
                    let month = date.getMonth()+1;
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

                    $.ajax({
                        url: 'http://localhost:3000/users/' ,
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        data: JSON.stringify(newUser),
                        success: function() {
                            alert('Профиль создан успешно!');
                            that.props.handleRegisteredClick(true);
                        }
                    })
                }
            });
    }

    handleChangePage(value) {
        this.props.handleUpdatePage(value);
    }

    render() {
        const { isAuthorized,
            isRegistered,
            loggedInAs,
            currentPage,
            handleRegisteredClick,
            handleLogInClick,
            handleCreateUserClick,
            handleUpdatePage } = this.props;

        return (
            <div>
                <Header
                    handleRegisteredClick = {this.handleRegisteredClick}
                    handleLogOutClick = {this.handleLogOutClick}
                    isRegistered = {this.props.isRegistered}
                    isAuthorized = {this.props.isAuthorized}
                    currentPage = {this.props.currentPage}
                    loggedInAs = {this.props.loggedInAs}
                />
                <Main
                    isRegistered = {this.props.isRegistered}
                    isAuthorized = {this.props.isAuthorized}
                    handleLogInClick = {this.handleLogInClick}
                    handleLogOutClick = {this.handleLogOutClick}
                    handleCreateUserClick = {this.handleCreateUserClick}
                    handleNotRegisteredClick = {this.handleNotRegisteredClick}
                    handleChangePage = {this.handleChangePage}
                    currentPage = {this.props.currentPage}
                    loggedInAs = {this.props.loggedInAs}
                />
                <Footer />
            </div>
        )
    }
}

