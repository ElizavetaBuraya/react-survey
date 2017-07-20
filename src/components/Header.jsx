import React from 'react';
import { Link } from 'react-router-dom'

const navlinks = [
    {'href':'/new_survey', 'name':'Новый опрос'},
    {'href':'/surveys', 'name':'Мои опросы'},
    {'href':'/templates', 'name':'Шаблоны опросов'},
    {'href':'/users', 'name':'Пользователи'}
];

function NavlinkItem(props) {
    return <li className="nav-item">
            <Link to={props.href} className="nav-link hidden-md-up">{props.name}<span className="sr-only">(current)</span></Link>
        </li>
}

function NavlinksList(props) {
    const navlinks = props.navlinks;
    return (
        <div className="hidden-md-up">
            {navlinks.map((navlink, index) =>
                <NavlinkItem key={index}
                         href={navlink.href}
                         name={navlink.name}
                />
            )}
        </div>
    );
}

export default class Header extends React.Component {
    render() {
        const isRegistered = this.props.isRegistered;
        const isAuthorized = this.props.isAuthorized;
        let logiconButton = null;
        let logButton = null;
        if (isAuthorized) {
            logiconButton =  <a className="login-collapse hidden-md-up ml-auto" href="#"><span className="username"> Привет, admin</span></a>
        } else {
            if (isRegistered) {
                logiconButton = <a className="login-collapse logicon logicon-active ml-auto hidden-md-up" href="#" />;
                logButton =  <a className="login mr-auto hidden-sm-down active-nav" href="#">Вход</a>
            } else {
                logiconButton = <a className="login-collapse logicon ml-auto hidden-md-up" href="#" onClick={this.props.handleChangeStateClick} />;
                logButton = <Link to="/" className="login mr-auto hidden-sm-down" href="#" onClick={this.props.handleChangeStateClick}>Вход</Link>
            }
        }
        return (
            <header className="d-flex flex-row">
                <nav className="navbar navbar-toggleable-sm fixed-top navbar-light">
                    <a className="navbar-brand hidden-sm-down" href="https://www.itechart.com/">
                        <img src="img/logo.jpg" alt="Logo" height="40" />
                    </a>
                    {logiconButton}
                    <div className="collapse navbar-collapse mr-auto" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to='/about' className="nav-link">О компании <span className="sr-only">(current)</span></Link>
                            </li>
                            {isAuthorized &&
                                <li className="nav-item invisible-sm-item">
                                    <a className="nav-link hidden-sm-down" href="#"><span className="username"> Привет, admin</span></a>
                                </li>
                            }
                            {isAuthorized &&
                                <div className="hidden-md-up">
                                    <div className="dropdown-divider"/>
                                    <NavlinksList navlinks={navlinks}/>
                                    <div className="dropdown-divider" />
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link hidden-md-up" >Выйти<span className="sr-only">(current)</span></Link>
                                    </li>
                                </div>
                            }
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
                    {logButton}
                </nav>
            </header>
        )
    }
}