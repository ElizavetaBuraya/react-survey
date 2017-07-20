import React from 'react';
import { Link } from 'react-router-dom';

export default class Login_Register extends React.Component {
    constructor () {
        super();
    }
    render() {
        const isRegistered = this.props.isRegistered;
        return (
            <main className="d-flex flex-row justify-content-center align-items-center">
                <form className="login-form">
                    <h2 className="login-form-heading">{isRegistered ? 'Вход' : 'Регистрация'}</h2>
                    {isRegistered &&
                    <div>
                        <label htmlFor="inputLogin" className="sr-only">Логин</label>
                        <input type="text" id="inputLogin" className="form-control" placeholder="Логин" required autoFocus />
                        <label htmlFor="inputPassword" className="sr-only">Пароль</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="******" required />
                        <div className="d-flex justify-content-between">
                            <a className="signup" href="#" onClick={this.props.handleChangeStateClick}>Регистрация</a>
                            <a className="getpassword" href="#">Забыли пароль?</a>
                        </div>
                        <button className="login-form-btn" type="submit">
                            <Link className="login-redirect" to='/starter_page' onClick={this.props.handleLogInClick}>Войти</Link>
                        </button>
                    </div>
                    }
                    {!isRegistered &&
                    <div>
                        <label htmlFor="inputName" className="sr-only">Имя</label>
                        <input type="text" id="inputName" className="form-control" placeholder="Имя" required autoFocus />
                        <label htmlFor="inputEmail" className="sr-only">E-mail</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Логин (e-mail)" required />
                        <label htmlFor="inputPassword" className="sr-only">Пароль</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Пароль" required />
                        <label htmlFor="inputRepeatPassword" className="sr-only">Повторить пароль</label>
                        <input type="password" id="inputRepeatPassword" className="form-control" placeholder="Повторить пароль" required />
                        <button className="login-form-btn" type="submit">
                            <Link className="login-redirect" to='/starter_page' onClick={this.props.handleLogInClick}>Создать аккаунт</Link>
                        </button>
                    </div>
                    }
                </form>
            </main>
        )
    }
}

