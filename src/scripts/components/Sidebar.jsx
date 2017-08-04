import React from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends React.Component {
    render() {
        return(
            <div className='d-flex flex-column sidebar hidden-sm-down'>
                <Link to='/new_survey'
                      className={this.props.currentPage === '/new_survey'
                          ? 'sidebar-nav active-nav'
                          : 'sidebar-nav'}>Новый опрос
                </Link>
                <Link to='/surveys'
                      className={this.props.currentPage === '/surveys'
                          ? 'sidebar-nav active-nav'
                          : 'sidebar-nav'}>Мои опросы
                </Link>
                <Link to='/templates'
                      className={this.props.currentPage === '/templates'
                          ? 'sidebar-nav active-nav'
                          : 'sidebar-nav'}>Шаблоны опросов
                </Link>
                <Link to='/users'
                      className={this.props.currentPage === '/users'
                          ? 'sidebar-nav active-nav'
                          : 'sidebar-nav'}>Пользователи
                </Link>
            </div>
        )
    }
}