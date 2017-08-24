import React from 'react';
import Sidebar from './Sidebar.jsx';
import Table from './Table.jsx';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const selectedRows = [];

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

function customConfirm(next) {
    if (confirm('Вы уверены, что хотите удалить выбранные опросы?')) {
        next();
    }
}

export default class Surveys extends React.Component {

    componentDidMount() {
        this.props.handleLoadSurveyData();
        if (this.props.currentPage !== '/surveys')
        {
            this.props.handleChangePage('/surveys');
        }
    }

    afterSaveCell = (row) => {
        this.props.handleEditSurveyData(row);
    };

    onRowSelect = (row, isSelected) => {
        (isSelected)
            ? selectedRows.push(row)
            : selectedRows.pop();
        let visibility = (selectedRows.length > 0)
            ? 'visible'
            : 'hidden';
        $('.delete-button').css('visibility', visibility);
    };

    onSelectAll = (isSelected) => {
        let visibility = (isSelected)
            ? 'visible'
            : 'hidden';
        $('.delete-button').css('visibility', visibility);
    };

    handleDeletedRow = (row) => {
        for (let index in row) {
            this.props.handleDeleteSurveyData(row[index]);
        }
        $('.delete-button').css('visibility', 'hidden');
    };

    renderTotal = () => {
        return (
            <span className='users-number'>
                Всего опросов: { this.props.surveyData.length }
            </span>
        );
    };

    surveyLink = (cell, row) => {
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
    };

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