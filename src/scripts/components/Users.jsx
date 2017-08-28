import React from 'react';
import Sidebar from './Sidebar.jsx';
import Table from './Table.jsx';

let selectedRows = [];

const MySearchPanel = (props) => {
    return (
        <div className="page-head d-flex justify-content-between align-items-center">
            <h1>Пользователи</h1>
            <div className="search-form">
                {props.searchField}
            </div>
        </div>
    );
};

function createCustomDeleteButton(onBtnClick) {
    return (
        <button className="delete-button" onClick={onBtnClick}>Delete selected</button>
    );
}

function customConfirm(next) {
    if (confirm('Вы уверены, что хотите удалить выбранных пользователей?')) {
        next();
    }
}

export default class Users extends React.Component {

    componentDidMount() {
        this.props.handleLoadUserData();
        if (this.props.currentPage !== '/users')
        {
            this.props.handleChangePage('/users');
        }
    }

    afterSaveCell = (row) => {
        this.props.handleEditUserData(row);
    };

    onRowSelect = (row, isSelected) => {
        (isSelected)
            ? selectedRows.push(row)
            : selectedRows.pop();
        let visibility = (selectedRows.length > 0)
            ? "visible"
            : "hidden";
        $(".delete-button").css("visibility", visibility);
    };

    onSelectAll = (isSelected) => {
        let visibility = (isSelected)
            ? "visible"
            : "hidden";
        $(".delete-button").css("visibility", visibility);
    };

    handleDeletedRow = (row) => {
        for (let index in row) {
            this.props.handleDeleteUserData(row[index]);
        }
        $(".delete-button").css("visibility", "hidden");
    };

    renderTotal = () => {
        return (
            <span className="users-number">
                Всего пользователей: {this.props.userData.length}
            </span>
        );
    };

    render() {
        const { currentPage, loggedInAs, userData, isFetching } = this.props;
        const options = {
            noDataText: 'Нет записей',
            deleteBtn: createCustomDeleteButton,
            sizePerPage: 10,
            hideSizePerPage: true,
            handleConfirmDeleteRow: customConfirm,
            paginationShowsTotal: this.renderTotal,
            defaultSortName: 'name',  // default sort column name
            defaultSortOrder: 'asc',  // default sort order
            searchPanel: (props) => (<MySearchPanel { ...props }/>),
            afterDeleteRow: this.handleDeletedRow,
        };

        return (
            <main className="d-flex flex-row justify-content-start">
                <Sidebar
                    currentPage = {currentPage}
                />
                <div className="main-content">
                    <Table data={userData}
                           roles={['Администратор', 'Пользователь']}
                           options={options}
                           columnNames={['id', 'Имя','Роль','Зарегистрирован','Опросы']}
                           afterSaveCell = {this.afterSaveCell}
                           handleDeletedRow = {this.handleDeletedRow}
                           onRowSelect = {this.onRowSelect}
                           onSelectAll = {this.onSelectAll}
                           loggedInAs = {loggedInAs}
                           isFetching = {isFetching}
                           search = {true}
                           pagination = {true}
                    />
                </div>
            </main>
        )
    }
}