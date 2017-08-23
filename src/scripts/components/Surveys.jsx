import React from 'react';
import Sidebar from './Sidebar.jsx';
import Table from './Table.jsx';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

class MySearchPanel extends React.Component {
    render() {
        let isAdmin = (this.props.loggedInAs.role === 'Администратор');
        return (
            <div className='page-head d-flex justify-content-between align-items-center'>
                <h1>Мои опросы {isAdmin && <Link to='/new_survey' className='create-survey'>Создать опрос</Link>}</h1>
                <div className='search-form'>
                    { this.props.searchField }
                </div>
            </div>
        );
    }
}

function createCustomDeleteButton(onBtnClick) {
    return (
        <button className='delete-button' onClick={ onBtnClick }>Delete selected</button>
    );
}

export default class Surveys extends React.Component {
    constructor(props) {
        super(props);
        this.afterSaveCell = this.afterSaveCell.bind(this);
        this.onRowSelect = this.onRowSelect.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
        this.handleDeletedRow = this.handleDeletedRow.bind(this);
        this.renderTotal = this.renderTotal.bind(this);
        this.surveyLink = this.surveyLink.bind(this);
        this.selectedRows = [];
        this.state = {
            data: [{'id':'нет данных','name':'нет данных','changed':'нет данных','answers':'нет данных','link':'null', 'results':'null'}],
            columnNames: ['id', 'Название','Изменен','Ответы','Ссылка','Результаты', 'Редактировать'],
        },
        this.options = {
            deleteBtn: createCustomDeleteButton,
            sizePerPage: 10,
            hideSizePerPage: true,
            paginationShowsTotal: this.renderTotal,
            defaultSortName: 'name',  // default sort column name
            defaultSortOrder: 'asc',  // default sort order
            searchPanel: (props) => (<MySearchPanel { ...props } loggedInAs = {this.props.loggedInAs} />),
            afterDeleteRow: this.handleDeletedRow,
        };
    }

    componentDidMount() {
        this.props.handleLoadSurveyData();
        if (this.props.currentPage !== '/surveys')
        {
            this.props.handleChangePage('/surveys');
        }
    }

    afterSaveCell(row) {
        $.ajax({
            url: 'http://localhost:3000/surveys/' + row.id,
            method: 'PUT',
            data: JSON.stringify(row),
            headers: { 'Content-Type': 'application/json' },
            success: function() {
                this.props.handleLoadSurveyData();
            }.bind(this)
        });
    }

    onRowSelect(row, isSelected) {
        (isSelected)
            ? this.selectedRows.push(row)
            : this.selectedRows.pop();
        let visibility = (this.selectedRows.length > 0)
            ? 'visible'
            : 'hidden';
        $('.delete-button').css('visibility', visibility);
    }

    onSelectAll(isSelected) {
        let visibility = (isSelected)
            ? 'visible'
            : 'hidden';
        $('.delete-button').css('visibility', visibility);
    }

    handleDeletedRow(row) {
        for (let index in row) {
            $.ajax({
                url: 'http://localhost:3000/surveys/' + row[index],
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                success: function() {
                    this.props.handleLoadSurveyData();
                }.bind(this)
            });
        }
        $('.delete-button').css('visibility', 'hidden');
    }

    renderTotal() {
        return (
            <span className='users-number'>
                Всего опросов: { this.props.surveyData.length }
            </span>
        );
    }

    surveyLink(cell, row) {

        const surveyLink = classNames({'survey-link': true,
            'inactive': (row.answers === 0 && cell.includes('results')),
            'edit-survey-link': cell.includes('new_survey')
        });

        return (
            <Link className={surveyLink} to={`${cell}`}>
                { cell.includes('results')
                    ? 'результаты'
                        : cell.includes('new_survey')
                            ? <span className="edit-survey"/>
                                : 'ссылка на опрос'
                }
            </Link>
        )
    }

    render() {
        let userRole = this.props.loggedInAs.role;
        const { currentPage, loggedInAs, surveyData, isFetching } = this.props;

        return (
            <main className='d-flex flex-row justify-content-start'>
                <Sidebar
                    currentPage = {currentPage}
                    loggedInAs = {loggedInAs}
                />
                <div className='main-content d-flex flex-column'>
                    <Table data={surveyData}
                           options={ this.options }
                           columnNames={ this.state.columnNames }
                           afterSaveCell = {(userRole === 'Администратор') ? this.afterSaveCell : undefined}
                           onRowSelect = {(userRole === 'Администратор') ? this.onRowSelect : undefined }
                           onSelectAll = {(userRole === 'Администратор') ? this.onSelectAll : undefined }
                           surveyLink = { this.surveyLink }
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