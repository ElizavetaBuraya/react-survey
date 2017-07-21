import React from 'react';
import Sidebar from './Sidebar.jsx';

export default class Users extends React.Component {
    render() {
        return(
            <main className="d-flex flex-row justify-content-start">
                <Sidebar />
                <div className="main-content d-flex flex-column">
                    <div className="page-head d-flex justify-content-between align-items-center">
                        <h1>Пользователи</h1>
                        <div className="search-form">
                          <span className="search-btn">
                            <button type="button">Go</button>
                          </span>
                          <input className="search" type="text" placeholder="Search..."/>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th className="sort-column">Имя</th>
                                <th>Роль</th>
                                <th>Зарегистрирован</th>
                                <th>Опросы</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Админ</td>
                                <td>Администратор</td>
                                <td><date>01.01.2017</date></td>
                                <td>12</td>
                                <td className="action">
                                    <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"/>
                                    <i className="fa fa-trash-o fa-2x" aria-hidden="true"/>
                                    <i className="fa fa-sort-desc fa-2x" aria-hidden="true"/>
                                </td>
                            </tr>
                            </tbody>
                            <tr className="table-footer">
                                <td colSpan="4">Всего пользователей: <span>112</span></td>
                                <td className="paginate"/>
                            </tr>
                        </table>
                    </div>
                </div>
            </main>
        )
    }
}