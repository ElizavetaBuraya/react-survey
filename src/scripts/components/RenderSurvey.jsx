import React from 'react';
import Sidebar from './Sidebar.jsx';
import GenerateQuestions from './GenerateQuestions.jsx';
import { Redirect } from 'react-router-dom';

export default class GenerateSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            survey_id:null,
            survey_title:"",
            questions_list:{"page_1" : null},
            survey_page:"page_1",
            numberOfPages: 1,
            numberOfQuestions: 0,
            is_anonymous: false,
            questions_are_numbered: true,
            pages_are_numbered: true,
            randomized: false,
            required_fields: true,
            progress_bar: false,
            redirectToAbout:false,
            navtabs: [
                { 'href':'#page_1', 'id':'page_1', 'name':'Страница 1', 'active':true }
            ]
        };
        this.onLoad = this.onLoad.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleSubmitSurvey = this.handleSubmitSurvey.bind(this);
        this.handleSaveAnswer = this.handleSaveAnswer.bind(this);
    }

    componentDidMount() {
        this.onLoad(this.props.location.pathname);
    }

    onLoad(path) {
        let pathId = path.split("/");
        $.ajax({
            url: 'http://localhost:3000/surveys?link=survey/' + pathId[pathId.length-1],
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            success: function(data) {
                let survey = data[0];
                this.setState({
                    survey_id:survey.id,
                    survey_title:survey.name,
                    survey_page:'page_1',
                    numberOfPages: survey.pages,
                    numberOfQuestions: survey.questions,
                    is_anonymous: survey.is_anonymous,
                    questions_are_numbered: survey.questions_are_numbered,
                    pages_are_numbered: survey.pages_are_numbered,
                    randomized: survey.randomized,
                    required_fields: survey.required_fields,
                    progress_bar: survey.progress_bar,
                    questions_list: survey.questions_list,
                    navtabs: survey.navtabs
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleChangePage(page) {
        this.setState({
            survey_page: page,
        })
    }

    handleSaveAnswer(id, value, checked) {
        let newQuestionsList = this.state.questions_list;
        let surveyPage = this.state.survey_page;
        let results = null;

        newQuestionsList[surveyPage].map((question) => {
           if (question.id === id) {
               switch (question.type) {
                   case 'multi-choice':
                       results = (question.result) ? (question.result) : [];
                       if (checked) {
                           results.push(value);
                           question.result = results;
                       } else {
                           results.splice(results.indexOf(value), 1);
                           (results.length === 0)
                               ? delete question.result
                               : question.result = results;
                       }
                       break;
                   case 'single-choice':
                       results = (question.result) ? (question.result) : [];
                       results.pop();
                       results.push(value);
                       question.result = results;
                       break;
                   case 'text' || 'scale':
                       results = value;
                       (results.replace(/\s/g,'') === '')
                           ? delete question.result
                           :  question.result = results;
                       break;
                   default:
                       results = value;
                       question.result = results;
               }
            }
        });

        this.setState({
            questions_list: newQuestionsList
        });

        this.updateProgressBar();

    }

    updateProgressBar() {
        let questionsList = this.state.questions_list;
        let questionNumber = this.state.numberOfQuestions;
        let requiredQuestionNumber = 0;
        let answeredQuestions = 0;

        for (let page in questionsList){
            questionsList[page].forEach((question) => {
                if (question.required) {
                    requiredQuestionNumber++;
                }
            })
        }

         for (let page in questionsList){
            questionsList[page].forEach((question) => {
                if (question.result) {
                    answeredQuestions++;

                    (question.required)
                        ? requiredQuestionNumber--
                        : requiredQuestionNumber;
                    }
                })
        }

        let percent = Math.round((answeredQuestions * 100)/questionNumber);
        let progressBar = $('.bar');

        progressBar.css('width', percent + '%');
        $('.percent').html(percent + '%');

        if (requiredQuestionNumber === 0) {
            progressBar.css('background-color', 'green');
            $('.submit-button').removeClass('disabled');
        } else {
            progressBar.css('background-color', 'red');
            $('.submit-button').addClass('disabled');
        }
    }

    handleSubmitSurvey(path) {
        let pathId = path.split("/");
        let questionsList = this.state.questions_list;
        let textAreaLength = 100;

        for (let page in questionsList){
            questionsList[page].forEach((question) => {
                if (question.result && question.type === 'text' && question.required) {
                    if (question.result.length < 100)
                        textAreaLength = 0;
                }
            })
        }

        if (textAreaLength === 0) {
            alert('Текстовый ответ не может содержать менее 100 символов');
            return;
        }

        let submitSurvey = confirm('Вы уверены, что хотите завершить опрос?');

        if (submitSurvey) {
            let completedSurveys = 0;
            let surveys = [];
            let that = this;

            let newSurvey = {
                "id": this.state.survey_id,
                "results": this.state.questions_list,
            };

            fetch('http://localhost:3000/users/' + this.props.loggedInAs.id)
                .then((resp) => resp.json())
                .then(function (data) {
                    completedSurveys = data.completed_surveys;
                    surveys = data.surveys;
                    surveys.push(newSurvey);

                    return fetch('http://localhost:3000/users/' + that.props.loggedInAs.id, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            'completed_surveys':++completedSurveys,
                            'surveys': surveys
                        })
                    }).then((response) => {
                        if (response.ok) {
                            alert('Опрос отправлен успешно!');
                            that.setState({
                                redirectToAbout: true,
                            });
                        } else {
                            throw new Error('Ошибка при отправке опроса!');
                        }
                    });
                });

            fetch('http://localhost:3000/surveys/' + pathId[pathId.length-1])
                .then((resp) => resp.json())
                .then(function (data) {
                    let timesCompleted = data.answers;

                    return fetch('http://localhost:3000/surveys/' + pathId[pathId.length-1], {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            'answers':++timesCompleted,
                        })
                    })
                });
            }
    }

    render() {
        const redirectToAbout = this.state.redirectToAbout;
        const { currentPage, loggedInAs } = this.props;

        if (redirectToAbout) {
            return (
                <Redirect to="/about"/>
            )
        }

        let pageName = null;
        let pageIndex = null;
        const navs = this.state.navtabs;

        this.state.navtabs.map((tab, index) => {
            if (tab.id === this.state.survey_page) {
                pageName = tab.name;
                pageIndex = index;
            }
        });

        return (
            <main className='d-flex flex-row'>
                <Sidebar
                    currentPage = {currentPage}
                    loggedInAs = {loggedInAs}
                />
                <div className='main-content survey d-flex flex-column'>
                    <div className='page-head d-flex justify-content-center'>
                        <h1>{this.state.survey_title}</h1>
                    </div>
                    <div className='survey-page'>
                        <div className='survey-content'>
                            {this.state.pages_are_numbered &&
                                <h2>{pageName}</h2>
                            }
                            {this.state.questions_list[this.state.survey_page] &&
                                <GenerateQuestions questions_list = {this.state.questions_list}
                                                   survey_page = {this.state.survey_page}
                                                   currentPage = '/survey'
                                                   navtabs={this.state.navtabs}
                                                   handleChangePage = {this.handleChangePage}
                                                   handleSaveAnswer = {this.handleSaveAnswer}
                                                   is_anonymous = {this.state.is_anonymous}
                                                   questions_are_numbered = {this.state.questions_are_numbered}
                                                   randomized = {this.state.randomized}
                                                   required_fields = {this.state.required_fields}
                                />
                           }
                        </div>
                    </div>
                    <div className='submit-survey d-flex justify-content-center'>
                        <a className='submit-button disabled'
                           onClick={() => this.handleSubmitSurvey(this.props.location.pathname)}>Завершить опрос
                        </a>
                    </div>
                    {this.state.progress_bar &&
                        <div className='progress d-flex justify-content-center'>
                            <span className='done'>{pageIndex + 1}</span>/<span className="todo">{this.state.numberOfPages}</span>
                            <div className='progress-bar'>
                                <div className='bar completing-survey-bar' />
                            </div>
                            <span className='percent'>0%</span>
                        </div>
                    }
                    <div className='page-navigation d-flex justify-content-center'>
                        <a className={(this.state.survey_page === 'page_1')
                            ? 'active-nav'
                            : ''}
                           onClick={() => this.handleChangePage(navs.length > 1
                               ? navs[pageIndex - 1].id
                               : navs[0])}>Предыдущая страница</a>
                        <a className={(this.state.survey_page === navs[navs.length - 1].id)
                            ? 'active-nav'
                            : ''}
                           onClick={() => this.handleChangePage(navs.length > 1
                               ? navs[pageIndex + 1].id
                               : navs[0])}>Следующая страница</a>
                    </div>
                </div>
            </main>
        )
    }
}
