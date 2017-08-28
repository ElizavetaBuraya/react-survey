import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
    const { loggedInAs, currentPage } = props;
    const asUser = (loggedInAs && loggedInAs.role === 'Пользователь');

    return (
        <div className='d-flex flex-column sidebar hidden-sm-down'>
            {asUser &&
                <div className='sidebar-navigation'>
                    <Link to='/surveys'
                          className={currentPage === '/surveys'
                              ? 'sidebar-nav active-nav'
                                              : 'sidebar-nav'}>Пройти опрос
                    </Link>
                </div>
            }
            {!asUser &&
                <div className='sidebar-navigation'>
                    <Link to='/new_survey'
                          className={currentPage === '/new_survey'
                          || currentPage === 'new_survey/:link'
                              ? 'sidebar-nav active-nav'
                              : 'sidebar-nav'}>Новый опрос
                    </Link>
                    <Link to='/surveys'
                          className={currentPage === '/surveys'
                              ? 'sidebar-nav active-nav'
                              : 'sidebar-nav'}>Мои опросы
                    </Link>
                    <Link to='/templates'
                          className={currentPage === '/templates'
                              ? 'sidebar-nav active-nav'
                              : 'sidebar-nav'}>Шаблоны опросов
                    </Link>
                    <Link to='/users'
                          className={currentPage === '/users'
                              ? 'sidebar-nav active-nav'
                              : 'sidebar-nav'}>Пользователи
                    </Link>
                </div>
            }
        </div>
    )
};

export default Sidebar;