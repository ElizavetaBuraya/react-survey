import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            registered: true,
        };
    }
    handleClick() {
        if (!this.state.registered) {
            this.state.registered = true;
            }
        }
    render() {
        if (this.state.registered) {
            return (
                <form className="login-form">
                    <h2 className="login-form-heading">Вход</h2>
                    <label htmlFor="inputLogin" className="sr-only">Логин</label>
                    <input type="text" id="inputLogin" className="form-control" placeholder="Логин" required autoFocus/>
                    <label htmlFor="inputPassword" className="sr-only">Пароль</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="******" required/>
                    <div className="d-flex justify-content-between">
                        <a className="signup" href="register.html">Регистрация</a>
                        <a className="getpassword" href="#">Забыли пароль?</a>
                    </div>
                    <button onClick={() => this.handleClick()} className="login-form-btn" type="submit">Войти</button>
                </form>
            )
        }
        else {
            return (
                <form className="login-form">
                    <h2 className="login-form-heading">Регистрация</h2>
                    <label htmlFor="inputName" className="sr-only">Имя</label>
                    <input type="text" id="inputName" className="form-control" placeholder="Имя" required autoFocus />
                    <label for="inputEmail" className="sr-only">Имя</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Логин (e-mail)" required />
                    <label for="inputPassword" className="sr-only">Пароль</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Пароль" required />
                    <label for="inputRepeatPassword" className="sr-only">Повторить пароль</label>
                    <input type="password" id="inputRepeatPassword" className="form-control" placeholder="Повторить пароль" required />
                    <button className="login-form-btn" type="submit">Создать аккаунт</button>
                 </form>
                )
            }
        }
}
ReactDOM.render(<Login />, document.getElementById('login-register'));