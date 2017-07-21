import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

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
    constructor(props) {
        super(props);
    }
    render() {
        let logiconBtnClass = classNames({'login-collapse ml-auto hidden-md-up': true,
            'logicon': !this.props.isAuthorized,
            'logicon-active': this.props.isRegistered
        });

        let loginBtnClass = classNames({'login mr-auto hidden-sm-down': true,
            'active-nav': this.props.isRegistered
        });

        const isAuthorized = this.props.isAuthorized;

        return (
            <header className="d-flex flex-row">
                <nav className="navbar navbar-toggleable-sm fixed-top navbar-light">
                    <a className="navbar-brand hidden-sm-down" href="https://www.itechart.com/">
                        <img src="img/logo.jpg" alt="Logo" height="40" />
                    </a>
                    {isAuthorized &&
                        <a className='login-collapse ml-auto hidden-md-up' href="#"><span className="username"> Привет, admin</span></a>
                    }
                    {!isAuthorized &&
                        <a className={logiconBtnClass} href="#" onClick={this.props.handleRegisteredClick}/>
                    }
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
                    {!isAuthorized &&
                        <Link to="/" className={loginBtnClass} onClick={this.props.handleRegisteredClick}>Вход</Link>
                    }
                </nav>
            </header>
        )
    }
}

