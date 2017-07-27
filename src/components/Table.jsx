import React from 'react';
import Sidebar from './Sidebar.jsx';
import Users from './Users.jsx';
import Surveys from './Surveys.jsx';

class MySearchPanel extends React.Component {
    render() {
        return (
            <div className="page-head d-flex justify-content-between align-items-center">
                <h1>Мои опросы {(this.props.location == 'users') &&<a className="create-survey" href="#">Создать опрос</a>}</h1>
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

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.onRowSelect = this.onRowSelect.bind(this);
        this.renderTotal = this.renderTotal.bind(this);
        this.selectedRows = [];
        this.selectRowProp = {
            mode: 'checkbox',
            onSelect: this.onRowSelect,
        };
        this.cellEditProp = {
            mode: 'click',
            blurToSave: true,
        };
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

    renderTotal() {
        return (
            <span className="users-number">
            Всего опросов: { this.state.data.length }
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
        };
        return (
            <main className="d-flex flex-row justify-content-start">
                <Sidebar/>
                <div className="main-content d-flex flex-column">
                    {(this.props.location == 'users') && <Users />}
                    {(this.props.location == 'surveys') && <Surveys />}
                </div>
            </main>
        )
    }
}