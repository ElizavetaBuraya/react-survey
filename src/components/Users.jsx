import React from 'react';
import Sidebar from './Sidebar.jsx';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class MySearchPanel extends React.Component {
    render() {
        return (
        <div className="page-head d-flex justify-content-between align-items-center">
            <h1>Пользователи</h1>
            <div className="search-form">
                { this.props.searchField }
            </div>
        </div>
        );
    }
}

let users = [
    { id: 1, name: "Админ", role: "Администратор", registered: '01.01.2017', surveys: 12},
    { id: 2, name: "Юзер", role: "Пользователь", registered: '02.01.2017', surveys: 0},
    { id: 3, name: "Юзер", role: "Пользователь", registered: '03.01.2017', surveys: 0},
    { id: 4, name: "Юзер", role: "Пользователь", registered: '04.01.2017', surveys: 0},
    { id: 5, name: "Юзер", role: "Пользователь", registered: '05.01.2017', surveys: 0},
    { id: 6, name: "Юзер", role: "Пользователь", registered: '06.01.2017', surveys: 0},
    { id: 7, name: "Юзер", role: "Пользователь", registered: '07.01.2017', surveys: 0},
    { id: 8, name: "Юзер", role: "Пользователь", registered: '08.01.2017', surveys: 0},
    { id: 9, name: "Юзер", role: "Пользователь", registered: '09.01.2017', surveys: 0},
    { id: 10, name: "Юзер", role: "Пользователь", registered: '10.01.2017', surveys: 0},
    { id: 11, name: "Юзер", role: "Пользователь", registered: '11.01.2017', surveys: 0}];


const cellEditProp = {
    mode: 'click',
    blurToSave: true,
};

function actionIcons(){
    return '<span class="delete-row" /><span class="edit-row"/>'
}

function renderShowsTotal() {
    return (
        <span className="users-number">
                Всего пользователей: { users.length }
            </span>
    );
}

function getCaret(direction) {
    if (direction === 'asc') {
        return (
            <span className="sort-down"/>
        );
    }
    if (direction === 'desc') {
        return (
            <span className="sort-up"/>
        );
    }
    return (
        <span className="sort-down"/>
    );
}

export default class Users extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const options = {
            page: 1,
            sizePerPage: 10,
            pageStartIndex: 1,
            paginationSize: 3,
            firstPage: 'Первая',
            lastPage: 'Последняя',
            paginationShowsTotal: renderShowsTotal,
            paginationPosition: 'bottom',
            hideSizePerPage: true,
            withFirstAndLast: false,
            searchPanel: (props) => (<MySearchPanel { ...props }/>),
            defaultSortName: 'name',  // default sort column name
            defaultSortOrder: 'asc'  // default sort order
        };

        return(
            <main className="d-flex flex-row justify-content-start">
                <Sidebar />
                <div className="main-content d-flex flex-column">
                    <BootstrapTable ref="table"
                                    data={ users }
                                    pagination={ true }
                                    options={ options }
                                    cellEdit={ cellEditProp }
                                    search
                                    searchPlaceholder={'Поиск'}
                    >
                        <TableHeaderColumn
                            dataField='name'
                            isKey
                            dataSort
                            caretRender={ getCaret }
                            thStyle={ { 'text-align': 'center' } }
                            width='150'
                        >
                            Имя
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='role'
                            thStyle={ { 'text-align': 'center' } }
                            width='150'
                        >
                            Роль
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='registered'
                            thStyle={ { 'text-align': 'center' } }
                            tdStyle={ { 'text-align': 'center' } }
                            width='150'
                        >
                            Зарегистрирован
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='surveys'
                            thStyle={ { 'text-align': 'center' } }
                            tdStyle={ { 'text-align': 'center' } }
                            width='150'
                        >
                            Опросы
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='actions'
                            dataFormat={actionIcons}
                            editable={ false }
                            thStyle={ { 'text-align': 'center' } }
                            tdStyle={ { 'text-align': 'center' } }
                            width='150'
                        >
                            Действия
                        </TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </main>
        )
    }
}