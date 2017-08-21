import React from 'react';
import Sidebar from './Sidebar.jsx';
import Table from './Table.jsx';
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
        this.onLoad = this.onLoad.bind(this);
        this.selectedRows = [];
        this.state = {
            data: [{'id':'нет данных','name':'нет данных','changed':'нет данных','answers':'нет данных','link':'null', 'results':'null'}],
            columnNames: ['id', 'Название','Изменен','Ответы','Ссылка','Результаты'],
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
        this.onLoad();
        if (this.props.currentPage !== '/surveys')
        {
            this.props.handleChangePage('/surveys');
        }
    }

    onLoad() {
        $.ajax({
            url: 'http://localhost:3000/surveys',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            success: function(data) {
                let userSurveysArray = [];

                data.forEach((survey) => {
                    let userSurvey = {
                        "id": survey.id,
                        "name": survey.name,
                        "link": survey.link
                    };
                    userSurveysArray.push(userSurvey);
                });

                (this.props.loggedInAs.role === 'Администратор')
                    ? this.setState({data: data})
                    : this.setState({data: userSurveysArray});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    afterSaveCell(row) {
        $.ajax({
            url: 'http://localhost:3000/surveys/' + row.id,
            method: 'PUT',
            data: JSON.stringify(row),
            headers: { 'Content-Type': 'application/json' },
            success: function() {
                this.onLoad();
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
                  this.onLoad();
                }.bind(this)
            });
        }
        $('.delete-button').css('visibility', 'hidden');
    }

    renderTotal() {
        return (
            <span className='users-number'>
                Всего опросов: { this.state.data.length }
            </span>
        );
    }

    surveyLink(cell) {
        return (
            <Link to={`${cell}`}>
                { cell.includes('results')
                    ? 'результаты'
                    : 'ссылка на опрос'
                }
            </Link>
        )
    }

    render() {
        let userRole = this.props.loggedInAs.role;
        const { currentPage, loggedInAs } = this.props;

        return (
            <main className='d-flex flex-row justify-content-start'>
                <Sidebar
                    currentPage = {currentPage}
                    loggedInAs = {loggedInAs}
                />
                <div className='main-content d-flex flex-column'>
                    <Table data={this.state.data}
                           options={ this.options }
                           columnNames={ this.state.columnNames }
                           afterSaveCell = {(userRole === 'Администратор') ? this.afterSaveCell : undefined}
                           onRowSelect = {(userRole === 'Администратор') ? this.onRowSelect : undefined }
                           onSelectAll = {(userRole === 'Администратор') ? this.onSelectAll : undefined }
                           surveyLink = { this.surveyLink }
                           loggedInAs = {loggedInAs}
                    />
                </div>
            </main>
        )
    }
}