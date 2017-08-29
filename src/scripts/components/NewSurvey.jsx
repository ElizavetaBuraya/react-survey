import React from 'react';
import Sidebar from './Sidebar.jsx';
import Tabs from './Tabs.jsx';
import SurveySidebar from './SurveySidebar.jsx'
import { getCurrentDate, getSurvey } from '../utils/helperFunctions.js'
import { Link, Redirect } from 'react-router-dom';

export default class NewSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            survey_id:null,
            survey_title:"",
            questions_list:{"page_1" : null},
            survey_page:"page_1",
            description: "",
            numberOfPages: 1,
            numberOfQuestions: 0,
            is_anonymous: false,
            questions_are_numbered: true,
            pages_are_numbered: true,
            randomized: false,
            required_fields: false,
            progress_bar: false,
            navtabs: [
                { 'href':'#page_1', 'id':'page_1', 'name':'Страница 1', 'active':true }
            ]
        };
    }

    componentDidMount() {
        if (this.props.currentPage === '/new_survey') {
            this.props.handleChangePage('/new_survey')
        } else {
            this.props.handleChangePage(this.props.currentPage);
            this.onLoad(this.props.location.pathname);
        }
    }

    onLoad = (path) => {
        let pathId = path.split("/");
        let p1 = Promise.resolve(getSurvey(pathId));

        p1.then((data) => {
            let template = data[0];
            this.setState({
                survey_id:(path.includes("create")) ? null : template.id,
                survey_title:template.name,
                survey_page:'page_1',
                numberOfPages: template.pages,
                numberOfQuestions: template.questions,
                description: template.description,
                is_anonymous: template.is_anonymous,
                questions_are_numbered: template.questions_are_numbered,
                pages_are_numbered: template.pages_are_numbered,
                randomized: template.randomized,
                required_fields: template.required_fields,
                progress_bar: template.progress_bar,
                questions_list: template.questions_list,
                navtabs: template.navtabs
            })
        });
    };

    createSurvey = (surveyId, template) => {
        let newSurvey = {
            "id": surveyId,
            "name": this.state.survey_title,
            "changed": getCurrentDate(),
            "answers": 0,
            "link": "survey/" + surveyId,
            "results": "survey/" + surveyId + "/results",
            "edit_survey": "new_survey/survey/" + surveyId,
            "template": template,
            "pages": this.state.numberOfPages,
            "questions": this.state.numberOfQuestions,
            "is_anonymous": this.state.is_anonymous,
            "questions_are_numbered": this.state.questions_are_numbered,
            "pages_are_numbered": this.state.pages_are_numbered,
            "randomized": this.state.randomized,
            "required_fields": this.state.required_fields,
            "progress_bar": this.state.progress_bar,
            "navtabs": this.state.navtabs,
            "questions_list":this.state.questions_list
        };

        return newSurvey;
    };


    handleTogglePanel = () => {
        if ($('#sidebarCollapse').hasClass('active-bar')) {
            $('#sidebar, #sidebarCollapse').removeClass('active-bar');
            $('.overlay').fadeOut();
        } else {
            $('#sidebar, #sidebarCollapse').addClass('active-bar');
            $('.overlay').fadeIn();
        }
    };

    handleAddQuestion = (questionType) => {
        let newQuestionsList = this.state.questions_list;
        let surveyPage = this.state.survey_page;
        let newNumberOfQuestions = this.state.numberOfQuestions + 1;

        let questionsArray = (newQuestionsList[surveyPage])
            ? newQuestionsList[surveyPage]
            : [];

        let answersArray = (questionType === 'multi-choice'
        || questionType === 'single-choice')
            ? [ 'Ответ 1', 'Ответ 2', 'Ответ 3']
            : [];

        let newQuestion = {
            'id': (new Date).getTime(),
            'title': 'Новый вопрос',
            'type': questionType,
            'required': true,
            'answers': answersArray
        };

        questionsArray.push(newQuestion);
        newQuestionsList[surveyPage] = questionsArray;

        this.setState({
            questions_list:newQuestionsList,
            numberOfQuestions:newNumberOfQuestions
        });
    };

    handleUpdateQuestion = (newQuestions) => {
        let newQuestionsList = this.state.questions_list;
        let surveyPage = this.state.survey_page;
        newQuestionsList[surveyPage] = newQuestions;

        this.setState({
            questions_list: newQuestionsList,
        })
    };

    handleDragQuestion = (dragIndex, hoverIndex, dragQuestion) => {
        let newQuestionsList = this.state.questions_list;
        let surveyPage = this.state.survey_page;

        newQuestionsList[surveyPage].splice(dragIndex, 1);
        newQuestionsList[surveyPage].splice(hoverIndex, 0, dragQuestion);

        this.setState({
            questions_list: newQuestionsList
        });
    };

    handleDeleteQuestion = (id) => {
        let deleteQuestion = confirm('Вы уверены, что хотите удалить вопрос?');

        if(deleteQuestion) {
            let newQuestionsList = this.state.questions_list;
            let surveyPage = this.state.survey_page;
            let newNumberOfQuestions = this.state.numberOfQuestions - 1;

            let newArray = newQuestionsList[surveyPage].filter((question) => question.id !== id);
            newQuestionsList[surveyPage] = newArray;

            this.setState ({
                questions_list: newQuestionsList,
                numberOfQuestions:newNumberOfQuestions
            });

            $('.edit-question').show();
        }
    };

    handleChangePage = (page) => {
        this.setState({
            survey_page: page,
        })
    };

    handleAddPage = () => {
        if (this.state.numberOfPages === 5) {
            alert("В опросе не может быть более 5 страниц");
            return;
        }
        let newTabs = this.state.navtabs;
        let newQuestionsList = this.state.questions_list;
        let newPageNumber = this.state.numberOfPages + 1;

        let prevPage = newTabs[newTabs.length - 1].name;
        const prevPageNumber = (parseInt(prevPage.replace(/[^0-9\.]/g, ''), 10));

        let pageName = (isNaN(prevPageNumber))
            ? 'Страница ' + newPageNumber
            : 'Страница ' + (prevPageNumber + 1);

        let newPage = {
            'href':'#page_' + (new Date).getTime(),
            'id':'page_' + (new Date).getTime(),
            'name':pageName,
            'active':false
        };

        //create new tab
        newTabs.push(newPage);

        //create page in questions_list
        newQuestionsList[newPage['id']] = null;

        this.setState({
            navtabs: newTabs,
            numberOfPages: newPageNumber,
            questions_list: newQuestionsList,
        });
    };

    handleChangePageName = (value, tabId) => {
        let navTabs = this.state.navtabs;

        navTabs.map((tab) => {
            if (tab.id === tabId) {
                tab.name = value;
            }
        });

        this.setState({
            navtabs: navTabs,
        })
    };

    handleDeletePage = (tabId) => {
        let deletePage = confirm('Вы уверены, что хотите удалить страницу?');

        if (deletePage) {
            let questionsList = this.state.questions_list;
            let surveyPage = this.state.survey_page;
            let navTabs = this.state.navtabs;
            let newPageIndex = this.state.numberOfPages - 1;
            let newQuestionsNumber = (questionsList[surveyPage])
                ? this.state.numberOfQuestions - questionsList[surveyPage].length
                : this.state.numberOfQuestions;

            //delete tab
            let newNavs = navTabs.filter((tab) => tab.id !== tabId);

            //delete page from questions_list
            questionsList[tabId] = undefined;
            questionsList = JSON.parse(JSON.stringify(questionsList));

            this.setState({
                navtabs: newNavs,
                questions_list: questionsList,
                numberOfPages: newPageIndex,
                numberOfQuestions: newQuestionsNumber,
                survey_page: newNavs[newNavs.length - 1].id
            });
        }
    };

    handleChangeSurveySettings = (stateName, value) => {
        this.setState({
            [stateName]: value,
        })
    };

    handleSaveSurvey = (template) => {
        if (this.state.survey_title.length === 0) {
            alert("Введите название опроса!");
            return;
        }

        let surveyId = (this.state.survey_id)
            ? this.state.survey_id
            : (new Date).getTime();

        let newSurvey = this.createSurvey(surveyId, template);
        let description = prompt("Введите описание опроса", this.state.description);

        (description !== null)
                ? newSurvey.description = description
                    : newSurvey.description = this.state.description;


        (!this.state.survey_id)
            ? this.props.handleCreateSurvey(newSurvey, '/surveys')
                : this.props.handleUpdateSurvey(newSurvey, surveyId, template);
    };

    render() {
        const { currentPage, redirect, redirectPath } = this.props;

        if (redirect) {
            return (
                <Redirect to = {redirectPath} />
            )
        }

        return (
            <main className='d-flex flex-row'>
                <Sidebar
                    currentPage = {currentPage}
                />
                <div className='main-content survey d-flex flex-column'>
                    <div className='page-head'>
                        <label htmlFor='new_survey'><p className='survey-title'>Новый опрос:</p></label>
                        <input type='text'
                               name='new-survey'
                               id='new_survey'
                               value={this.state.survey_title}
                               onChange={(e) => {this.setState({survey_title:e.target.value})}}/><br/>
                        <div className='survey-stats'>
                            <p className='question-number'>Вопросов: <span>{this.state.numberOfQuestions}</span>,</p>
                            <p className='page-number'>cтраниц: <span>{this.state.numberOfPages}</span></p>
                        </div>
                        <div className='survey-command-panel'>
                            <a href='#' onClick = {() => this.handleSaveSurvey(false)}>Сохранить</a>
                            <a href='#' onClick = {() => this.handleSaveSurvey(true)}>Сохранить как шаблон</a>
                            <Link to='/surveys'>Отмена</Link>
                            <a href='#' onClick = {this.handleAddPage}>Новая страница</a>
                        </div>
                    </div>
                    <Tabs questions_list = {this.state.questions_list}
                          survey_page = {this.state.survey_page}
                          currentPage = '/new_survey'
                          navtabs={this.state.navtabs}
                          handleUpdateQuestion = {this.handleUpdateQuestion}
                          handleDragQuestion = {this.handleDragQuestion}
                          handleDeleteQuestion = {this.handleDeleteQuestion}
                          handleChangePage = {this.handleChangePage}
                          handleChangePageName = {this.handleChangePageName}
                          handleDeletePage = {this.handleDeletePage}
                          questions_are_numbered = {this.state.questions_are_numbered}
                          required_fields = {this.state.required_fields}
                    />
                    <SurveySidebar handleAddQuestion = {this.handleAddQuestion}
                                   handleTogglePanel = {this.handleTogglePanel}
                                   handleChangeSurveySettings = {this.handleChangeSurveySettings}
                                   is_anonymous = {this.state.is_anonymous}
                                   questions_are_numbered = {this.state.questions_are_numbered}
                                   pages_are_numbered = {this.state.pages_are_numbered}
                                   randomized = {this.state.randomized}
                                   required_fields = {this.state.required_fields}
                                   progress_bar = {this.state.progress_bar}
                    />
                </div>
                <div className='overlay' onClick={this.handleTogglePanel}/>
            </main>
        )
    }
}
