import Chart from './Chart.jsx'
import Table from './Table.jsx'
import React from 'react';

const AnswerStats = (props) => {
    const getAnswers = () => {
        let user_results = props.user_results;
        let survey_page = props.survey_page;
        let answered = 0;
        let missed = 0;

        user_results.map((user) => {
            user.results[survey_page].map((question) => {
                if (question.id === props.id) {
                    (question.result && question.result.length !== 0)
                        ? answered ++
                        : missed ++;
                }
            })
        });

        return {
            'answered': answered,
            'missed': missed
        };
    };

    const getResults = (type) => {
        let user_results = props.user_results;
        let survey_page = props.survey_page;
        let resultsArray = [];

        user_results.map((user, index) => {
            user.results[survey_page].map((question) => {
                if (question.id === props.id) {
                    let result = (type === 'file')
                        ? {
                            'id':index,
                            "name": (question.result) ? question.result : 'Нет ответа',
                            "respondent": user.id
                          }
                        : {
                            'id':index,
                            "name": (question.result && question.result.length) ? question.result : 'Нет ответа',
                            "respondent": user.id
                          };

                    resultsArray.push(result);
                }
            })
        });

        return resultsArray;
    };

    const surveyLink = (event, row) => {
        return (
            <a href="#" onClick={(e) => props.handleToggleCharts(event, row.id)}>
                Показать ответы респондента
            </a>
        )
    };

    const fileLink = (cell) => {
      if (cell === 'Нет ответа') {
          return (
              <span>Нет ответа</span>
          )
      } else {
          return (
              <a href={cell.url} download={cell.name.split('\\')[2]}>{cell.name.split('\\')[2]}</a>
          )
      }
    };

    const { required,
        title,
        index,
        id,
        type,
        user_results,
        answers,
        questions_list,
        survey_page,
        questions_are_numbered,
        required_fields } = props;

    const options = {
        defaultSortName: 'name',
        defaultSortOrder: 'asc',
    };

    const lastQuestion  = (questions_list[survey_page].length === index + 1);
    const userAnswers = getAnswers();
    const columnNames =['id', 'Ответы', 'Респондент'];
    const data = getResults(type);

    let question = null;

    if (type === 'multi-choice' || type === 'single-choice' || type === 'rating') {
        question = <Chart id={id}
                          type={type}
                          user_results={user_results}
                          answers={answers}
                          answered={userAnswers.answered}
                          survey_page = {survey_page}
        />
    }

    if (type === 'text' || type === 'file' || type === 'scale') {
        question = <div className='answers-table'>
            <Table data={data}
                   options = {options}
                   columnNames = {columnNames}
                   afterSaveCell = {undefined}
                   onRowSelect = {undefined}
                   onSelectAll = {undefined}
                   surveyLink = {surveyLink}
                   fileLink = {fileLink}
                   type={type}
                   search = {false}
                   pagination = {false}
                   loggedInAs = 'Администратор'
            />
        </div>
    }

    return (
        <div className='question'>
            <p className='question-title'>
                {questions_are_numbered &&
                    <span className='question-number'>{index + 1}.</span>
                }
                {required_fields &&
                    <span className="required-field">{(required) ? " * " : ""}</span>
                }
                <span>
                    {title}
                </span>
            </p>
            <p className="number-of-users">
                <span>Ответили: <span className="users-answered">{userAnswers.answered}</span> Пропустили: <span>{userAnswers.missed}</span></span>
            </p>
            { question }
            {!lastQuestion && <hr/>}
        </div>
    );
};

export default AnswerStats;