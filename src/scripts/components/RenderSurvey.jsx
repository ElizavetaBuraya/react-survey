import React from 'react';
import Sidebar from './Sidebar.jsx';
import GenerateQuestions from './GenerateQuestions.jsx';

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
                let template = data[0];
                this.setState({
                    survey_id:(path.includes("create")) ? null : template.id,
                    survey_title:template.name,
                    survey_page:'page_1',
                    numberOfPages: template.pages,
                    numberOfQuestions: template.questions,
                    is_anonymous: template.is_anonymous,
                    questions_are_numbered: template.questions_are_numbered,
                    pages_are_numbered: template.pages_are_numbered,
                    randomized: template.randomized,
                    required_fields: template.required_fields,
                    progress_bar: template.progress_bar,
                    questions_list: template.questions_list,
                    navtabs: template.navtabs
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
        let index = 0;
        let results = null;

        newQuestionsList[surveyPage].map((question) => {
           if (question.id == id) {
               if (question.type === "single-choice" || question.type === "multi-choice") {
                   results = (question.result) ? (question.result) : [];
                   if (checked) {
                       results.push(value)
                   } else {
                       index = results.indexOf(value);
                       results.splice(index, 1);
                   }
                   question.result = results;
               } else {
                   results = value;
               }

               question.result = results;
            }
        });

         this.setState({
            questions_list: newQuestionsList })

    }

    handleSubmitSurvey(template) {

    }

    render() {
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
                    currentPage = {this.props.currentPage}
                />
                <div className='main-content survey d-flex flex-column'>
                    <div className='page-head d-flex justify-content-center'>
                        <h1>{this.state.survey_title}</h1>
                    </div>
                    <div className="survey-page">
                        <div className="survey-content">
                            <h2>{pageName}</h2>
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
                                               progress_bar = {this.state.progress_bar}
                            />}
                        </div>
                    </div>
                    <div className="progress d-flex justify-content-center">
                        <span className="done">{pageIndex + 1}</span>/<span className="todo">{this.state.numberOfPages}</span>
                        <div className="progress-bar">
                            <div className="bar completing-survey-bar" />
                        </div>
                        <span className="percent">0%</span>
                    </div>
                    <div className="page-navigation d-flex justify-content-center">
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
