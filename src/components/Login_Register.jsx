import React from 'react';
import ReactDOM from 'react-dom';

class HeaderAndMainContent extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.state = {
            isRegistered: true,
        };
    }
    handleRegisterClick(val) {
        this.setState({
            isRegistered: val
        });
    }
    render() {
        return (
            <div className="header-and-main">
                <Header handleRegisterClick = {this.handleRegisterClick} isRegistered={this.state.isRegistered} />
                <Main handleRegisterClick = {this.handleRegisterClick} isRegistered={this.state.isRegistered} />
            </div>
        )
    }
}

class Header extends React.Component {
    constructor () {
        super();
        this.changeState = this.changeState.bind(this)
    }
    changeState() {
        let val = true;
        this.props.handleRegisterClick(val);
    }
    render() {
        const isRegistered = this.props.isRegistered;
        if (isRegistered) {
            return (
                <header className="d-flex flex-row">
                    <nav className="navbar navbar-toggleable-sm fixed-top navbar-light">
                        <a className="navbar-brand hidden-sm-down" href="https://www.itechart.com/">
                            <img src="img/logo.jpg" alt="Logo" height="40" />
                        </a>
                        <a className="login-collapse logicon logicon-active ml-auto hidden-md-up" href="#"></a>
                        <div className="collapse navbar-collapse mr-auto" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="about.html">О компании <span className="sr-only">(current)</span></a>
                                </li>
                            </ul>
                        </div>
                        <button className="navbar-toggler navbar-toggler-left" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <a className="login mr-auto hidden-sm-down active-nav" href="#">Вход</a>
                    </nav>
                </header>
            )
        }
        else {
            return (
                <header className="d-flex flex-row">
                    <nav className="navbar navbar-toggleable-sm fixed-top navbar-light">
                        <a className="navbar-brand hidden-sm-down" href="https://www.itechart.com/">
                            <img src="img/logo.jpg" alt="Logo" height="40" />
                        </a>
                        <a className="login-collapse logicon ml-auto hidden-md-up" href="#" onClick={this.changeState}></a>
                        <div className="collapse navbar-collapse mr-auto" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="about.html">О компании <span className="sr-only">(current)</span></a>
                                </li>
                            </ul>
                        </div>
                        <button className="navbar-toggler navbar-toggler-left" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <a className="login mr-auto hidden-sm-down" href="#" onClick={this.changeState}>Вход</a>
                    </nav>
                </header>
                )
            }
        }

}

class Main extends React.Component {
    constructor () {
        super();
        this.changeState = this.changeState.bind(this)
    }
    changeState() {
        let val = false;
        this.props.handleRegisterClick(val);
    }
    render() {
        const isRegistered = this.props.isRegistered;
        if (isRegistered) {
            return (
                <main className="d-flex flex-row justify-content-center align-items-center">
                    <form className="login-form" id="login-register">
                        <h2 className="login-form-heading">Вход</h2>
                        <label htmlFor="inputLogin" className="sr-only">Логин</label>
                        <input type="text" id="inputLogin" className="form-control" placeholder="Логин" required autoFocus />
                        <label htmlFor="inputPassword" className="sr-only">Пароль</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="******" required />
                        <div className="d-flex justify-content-between">
                            <a className="signup" href="#" onClick={this.changeState}>Регистрация</a>
                            <a className="getpassword" href="#">Забыли пароль?</a>
                        </div>
                        <button className="login-form-btn" type="submit">Войти</button>
                    </form>
                </main>
            )
        }
        else {
            return (
                <main className="d-flex flex-row justify-content-center align-items-center">
                    <form className="login-form">
                        <h2 className="login-form-heading">Регистрация</h2>
                        <label htmlFor="inputName" className="sr-only">Имя</label>
                        <input type="text" id="inputName" className="form-control" placeholder="Имя" required autoFocus />
                        <label htmlFor="inputEmail" className="sr-only">Имя</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Логин (e-mail)" required />
                        <label htmlFor="inputPassword" className="sr-only">Пароль</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Пароль" required />
                        <label htmlFor="inputRepeatPassword" className="sr-only">Повторить пароль</label>
                        <input type="password" id="inputRepeatPassword" className="form-control" placeholder="Повторить пароль" required />
                        <button className="login-form-btn" type="submit">Создать аккаунт</button>
                    </form>
                </main>
            )
        }
     }

}

class Footer extends React.Component {
    render() {
        return (
            <footer className="d-flex flex-row justify-content-center">
                <span className="copyright">© 2002 - 2017. :iTechArt All Rights Reserved.</span>
            </footer>
        )
    }
}

ReactDOM.render(
    <div>
        <HeaderAndMainContent/>
        <Footer />
    </div>,
    document.getElementById('page-content'));

