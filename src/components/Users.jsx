import React from 'react';
import Sidebar from './Sidebar.jsx';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import userdata from '../content/users'

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
        this.toggleDelete = this.toggleDelete.bind(this);
        this.renderTotal = this.renderTotal.bind(this);
        this.selectRowProp = {
            mode: 'radio',
            onSelect: () => {
                this.toggleDelete();
            }
        };
        this.cellEditProp = {
            mode: 'click',
            blurToSave: true,
        };
        this.state = {
            data: userdata.users,
        }
    }

    toggleDelete() {
        $(".delete-button").css("visibility", "visible");
    }

    createCustomDeleteButton(onBtnClick) {
        return (
            <button className="delete-button" onClick={ onBtnClick }>Delete row</button>
        );
    }

    renderTotal() {
        return (
            <span className="users-number">
            Всего пользователей: { this.state.data.length }
        </span>
        );
    }

    render() {
        const options = {
            deleteBtn: this.createCustomDeleteButton,
            sizePerPage: 10,
            hideSizePerPage: true,
            paginationShowsTotal: this.renderTotal,
            defaultSortName: 'name',  // default sort column name
            defaultSortOrder: 'asc',  // default sort order
            searchPanel: (props) => (<MySearchPanel { ...props }/>)
        };
        return (
            <main className="d-flex flex-row justify-content-start">
                <Sidebar/>
                <div className="main-content d-flex flex-column">

                        <BootstrapTable data={this.state.data}
                                        options={ options }
                                        ref='table'
                                        searchPlaceholder={'Поиск'}
                                        cellEdit={ this.cellEditProp }
                                        selectRow={ this.selectRowProp }
                                        deleteRow={ true }
                                        search
                                        hover
                                        pagination
                        >
                            <TableHeaderColumn
                                isKey
                                dataField='id'
                                hidden
                            >
                                User ID
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField='name'
                                thStyle={ { 'text-align': 'center' } }
                                width='120'
                                dataSort
                                caretRender={ getCaret }
                            >
                                Имя
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField='role'
                                thStyle={ { 'text-align': 'center' } }
                                width='120'
                            >
                                Роль
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField='registered'
                                thStyle={ { 'text-align': 'center' } }
                                tdStyle={ { 'text-align': 'center' } }
                                width='120'
                            >
                                Зарегистрирован
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField='surveys'
                                thStyle={ { 'text-align': 'center' } }
                                tdStyle={ { 'text-align': 'center' } }
                                width='120'
                            >
                                Опросы
                            </TableHeaderColumn>
                        </BootstrapTable>
                </div>
            </main>
        )
    }
}