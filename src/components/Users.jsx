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

function getCaret(direction) {
    return direction === 'desc'
    ?  <span className="sort-up"/>
    :  <span className="sort-down"/>;
}

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.afterSaveCell = this.afterSaveCell.bind(this);
        this.onRowSelect = this.onRowSelect.bind(this);
        this.handleDeletedRow = this.handleDeletedRow.bind(this);
        this.renderTotal = this.renderTotal.bind(this);
        this.selectedRows = [];
        this.selectRowProp = {
            mode: 'checkbox',
            onSelect: this.onRowSelect,
        };
        this.cellEditProp = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.afterSaveCell
        };
        this.state = {
            data: JSON.parse(localStorage.getItem('users')),
            roles: ['Администратор', 'Пользователь']
        }
    }

    afterSaveCell(row, cellName, cellValue) {
        let editedUserdata = this.state.data;
        let usersArray = [];
        for (let props in row) {
            if (props == "id") {
                for (let user in editedUserdata) {
                    if (user.id === row[props]) {
                        user[cellName] = cellValue;
                    }
                }
            }
        }
        for (let user of editedUserdata) {
            usersArray.push(user)
        }
        localStorage.setItem('users', JSON.stringify(usersArray));
        this.setState({
            data: JSON.parse(localStorage.getItem('users')),
        })
    }

    onRowSelect(row, isSelected) {
        (isSelected)
            ? this.selectedRows.push(row)
            : this.selectedRows.pop();
        let visibility = (this.selectedRows.length > 0)
            ? "visible"
            : "hidden";
        $(".delete-button").css("visibility", visibility);
    }

    createCustomDeleteButton(onBtnClick) {
        return (
            <button className="delete-button" onClick={ onBtnClick }>Delete selected</button>
        );
    }

    handleDeletedRow(row) {
        let usersArray = [];
        let editedUserdata = this.state.data.filter((user) => {
            if (!row.includes(user.id))
                return user.id;
        });
        for (let user of editedUserdata) {
            usersArray.push(user)
        }
        localStorage.setItem('users', JSON.stringify(usersArray));
        this.setState({
            data: JSON.parse(localStorage.getItem('users')),
        });
        $(".delete-button").css("visibility", "hidden");
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
            searchPanel: (props) => (<MySearchPanel { ...props }/>),
            afterDeleteRow: this.handleDeletedRow,
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
                            editable={ { type: 'select', options: { values: this.state.roles } } }
                        >
                            Роль
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='registered'
                            thStyle={ { 'text-align': 'center' } }
                            tdStyle={ { 'text-align': 'center' } }
                            width='120'
                            editable={ false }
                        >
                            Зарегистрирован
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='surveys'
                            thStyle={ { 'text-align': 'center' } }
                            tdStyle={ { 'text-align': 'center' } }
                            width='120'
                            editable={ false }
                        >
                            Опросы
                        </TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </main>
        )
    }
}