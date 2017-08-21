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
            <Link to={props.href}
                  className={props.currentPage === props.href
                      ? "nav-link active"
                      : "nav-link"}>{props.name}
                  <span className="sr-only">(current)</span>
            </Link>
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
                         currentPage={props.currentPage}
                />
            )}
        </div>
    );
}

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    toggleLogOut() {
        let logout_visibility =  $(".logout-popup").css("visibility");
        if (logout_visibility == "hidden") {
            $(".logout-popup").css("visibility", "visible");
        } else {
            function hide() {
                $(".logout-popup").css("visibility", "hidden")
            }
            setTimeout(hide, 100);
        }
    }
    render() {
        const { isAuthorized, loggedInAs, isRegistered, handleRegisteredClick, handleLogOutClick } = this.props;

        const logiconBtnClass = classNames({'login-collapse ml-auto hidden-md-up': true,
            'logicon': !isAuthorized,
            'logicon-active': isRegistered
        });

        const loginBtnClass = classNames({'login mr-auto hidden-sm-down': true,
            'active-nav': isRegistered
        });

        const userName = (loggedInAs) ? loggedInAs.username : null;

        return (
            <header className="d-flex flex-row">
                <nav className="navbar navbar-toggleable-sm fixed-top navbar-light">
                    <a className="navbar-brand hidden-sm-down" href="https://www.itechart.com/">
                        <img src="img/logo.jpg" alt="Logo" height="40" />
                    </a>
                    {isAuthorized &&
                        <div className='login-collapse ml-auto hidden-md-up'>
                            <div><span className="username"> Привет, {userName}</span></div>
                        </div>
                    }
                    {!isAuthorized &&
                        <a className={logiconBtnClass} onClick={handleRegisteredClick}/>
                    }
                    <div className="collapse navbar-collapse mr-auto" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            {isAuthorized &&
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to='/about'
                                              className={this.props.currentPage === '/about'
                                                  ? "nav-link active"
                                                  : "nav-link"}>О компании
                                            <span className="sr-only">(current)</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item invisible-sm-item" id="logout">
                                        <a href="#" className="nav-link hidden-sm-down"
                                           onFocus={this.toggleLogOut}
                                           onBlur={this.toggleLogOut}>
                                            <span className="username"> Привет, {userName}</span>
                                        </a>
                                        <a href="#" className='logout-popup' onClick={() => handleLogOutClick(null)}>Выйти</a>
                                    </li>
                                </div>
                            }
                            {isAuthorized &&
                                <div className="hidden-md-up">
                                    <div className="dropdown-divider"/>
                                    <NavlinksList
                                        navlinks={navlinks}
                                        currentPage={this.props.currentPage}
                                    />
                                    <div className="dropdown-divider" />
                                    <li className="nav-item">
                                        <a href="#" className="nav-link hidden-md-up"
                                           onClick={() => handleLogOutClick(null)}>Выйти<span className="sr-only">(current)</span>
                                        </a>
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
                        <Link to="/" className={loginBtnClass} onClick={handleRegisteredClick}>Вход</Link>
                    }
                </nav>
            </header>
        )
    }
}

