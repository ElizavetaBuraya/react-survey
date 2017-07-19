import React from 'react';
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
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
        return (
            <header className="d-flex flex-row">
                <nav className="navbar navbar-toggleable-sm fixed-top navbar-light">
                    <a className="navbar-brand hidden-sm-down" href="https://www.itechart.com/">
                        <img src="img/logo.jpg" alt="Logo" height="40" />
                    </a>
                    {isRegistered ? (
                        <a className="login-collapse logicon logicon-active ml-auto hidden-md-up" href="#" />
                    ) : (
                        <a className="login-collapse logicon ml-auto hidden-md-up" href="#" onClick={this.changeState} />
                    )}
                    <div className="collapse navbar-collapse mr-auto" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to='/about' className="nav-link">О компании <span className="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                    </div>
                    <button className="navbar-toggler navbar-toggler-left"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    {isRegistered ? (
                        <a className="login mr-auto hidden-sm-down active-nav" href="#">Вход</a>
                    ) : (
                        <a className="login mr-auto hidden-sm-down" href="#" onClick={this.changeState}>Вход</a>
                    )}
                </nav>
            </header>
        )
    }
}