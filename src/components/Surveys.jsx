import React from 'react';
import Sidebar from './Sidebar.jsx';
import Table from './Table.jsx';
import { Link } from 'react-router-dom';

class MySearchPanel extends React.Component {
    render() {
        return (
            <div className="page-head d-flex justify-content-between align-items-center">
                <h1>Мои опросы <Link to='/new_survey' className="create-survey" >Создать опрос</Link></h1>
                <div className="search-form">
                    { this.props.searchField }
                </div>
            </div>
        );
    }
}

export default class Surveys extends React.Component {
    constructor(props) {
        super(props);
        this.afterSaveCell = this.afterSaveCell.bind(this);
        this.onRowSelect = this.onRowSelect.bind(this);
        this.handleDeletedRow = this.handleDeletedRow.bind(this);
        this.renderTotal = this.renderTotal.bind(this);
        this.surveyLink = this.surveyLink.bind(this);
        this.selectedRows = [];
        this.state = {
            data: JSON.parse(localStorage.getItem('surveys')),
            columnNames: ['ID', 'Название','Изменен','Ответы','Ссылка','Результаты'],
        }
        this.options = {
            deleteBtn: this.createCustomDeleteButton,
            sizePerPage: 10,
            hideSizePerPage: true,
            paginationShowsTotal: this.renderTotal,
            defaultSortName: 'name',  // default sort column name
            defaultSortOrder: 'asc',  // default sort order
            searchPanel: (props) => (<MySearchPanel { ...props }/>),
            afterDeleteRow: this.handleDeletedRow,
        };
    }

    afterSaveCell(row, cellName, cellValue) {
        let editedSurveydata = this.state.data;
        let surveysArray = [];
        for (let props in row) {
            if (props == "id") {
                for (let survey in editedSurveydata) {
                    if (survey.id === row[props]) {
                        survey[cellName] = cellValue;
                    }
                }
            }
        }
        for (let survey of editedSurveydata) {
            surveysArray.push(survey)
        }
        localStorage.setItem('surveys', JSON.stringify(surveysArray));
        this.setState({
            data: JSON.parse(localStorage.getItem('surveys')),
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
        let surveysArray = [];
        let editedSurveydata = this.state.data.filter((survey) => {
            if (!row.includes(survey.id))
                return survey.id;
        });
        for (let survey of editedSurveydata) {
            surveysArray.push(survey)
        }
        localStorage.setItem('surveys', JSON.stringify(surveysArray));
        this.setState({
            data: JSON.parse(localStorage.getItem('surveys')),
        });
        $(".delete-button").css("visibility", "hidden");
    }

    renderTotal() {
        return (
            <span className="users-number">
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
        return (
            <main className="d-flex flex-row justify-content-start">
                <Sidebar/>
                <div className="main-content d-flex flex-column">
                    <Table data={this.state.data}
                           roles={this.state.roles}
                           options={ this.options }
                           columnNames={ this.state.columnNames }
                           afterSaveCell = { this.afterSaveCell }
                           onRowSelect = { this.onRowSelect }
                           surveyLink = { this.surveyLink }
                    />
                </div>
            </main>
        )
    }
}