import React from 'react';
import Sidebar from './Sidebar.jsx';
import Tabs from './Tabs.jsx';

export default class NewSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            survey_id:null,
            survey_title:"",
            times_completed:0,
            user_results:[],
            displayChart:false,
            questions_list:{"page_1" : null},
            survey_page:"page_1",
            numberOfPages: 1,
            numberOfQuestions: 0,
            is_anonymous: false,
            questions_are_numbered: true,
            pages_are_numbered: true,
            randomized: false,
            required_fields: false,
            navtabs: [
                { 'href':'#page_1', 'id':'page_1', 'name':'Страница 1', 'active':true }
            ]
        };
        this.handleToggleCharts = this.handleToggleCharts.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
    }

    componentDidMount() {
        this.props.handleChangePage
            ? this.props.handleChangePage('/new_survey')
            : this.onLoad(this.props.location.pathname);
    }

    onLoad(path) {
        let pathId = path.split("/");
        let surveyId = pathId[pathId.length-2];

        $.ajax({
            url: 'http://localhost:3000/surveys?link=survey/' + pathId[pathId.length-2],
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            success: function(data) {
                let template = data[0];
                this.setState({
                    survey_id : template.id,
                    survey_title:template.name,
                    survey_page:'page_1',
                    numberOfPages: template.pages,
                    numberOfQuestions: template.questions,
                    is_anonymous: template.is_anonymous,
                    questions_are_numbered: template.questions_are_numbered,
                    pages_are_numbered: template.pages_are_numbered,
                    required_fields: template.required_fields,
                    navtabs: template.navtabs
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        $.ajax({
            url: 'http://localhost:3000/users/',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            success: function(data) {
                let userResults = [];

                data.map((user) => {
                    user.surveys.map((survey) => {
                        if (survey.id.toString() === surveyId) {
                            let results = {
                                'id': user.id,
                                'name': user.name,
                                'results': survey.results
                            };
                            userResults.push(results);
                        }
                    })
                });

                this.setState({
                    times_completed:userResults.length,
                    user_results: userResults,
                    questions_list:userResults[0].results
                })
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

    handleChangeUser(event) {
        let index = event.target.value;
        let userResults = this.state.user_results;

        this.setState({
            questions_list: userResults[index].results
        })
    }

    handleToggleCharts() {
        this.setState({
            displayChart:!this.state.displayChart
        })
    }

    render() {
        const { currentPage } = this.props;
        let userResults = this.state.user_results;

        return (
            <main className='d-flex flex-row'>
                <Sidebar
                    currentPage = {currentPage}
                />
                <div className='main-content survey d-flex flex-column'>
                    <div className='page-head'>
                        <h1 className="survey-answers">Просмотр ответов: </h1><span>{this.state.survey_title}</span>
                        <div className="survey-stats">
                            <p className="question-number">Вопросов: <span>{this.state.numberOfQuestions}</span>,</p>
                            <p className="page-number">страниц: <span>{this.state.numberOfPages}</span></p>
                        </div>
                        <div className="survey-command-panel result-panel">
                            <a href="#" className={(this.state.displayChart) ? 'active' : ''}
                               onClick={this.handleToggleCharts}>Сводные данные по вопросам</a>
                            <a href="#" className={(!this.state.displayChart) ? 'active' : ''}
                               onClick={this.handleToggleCharts}>Отдельные ответы</a>
                            <span>Всего ответов: <span className="answers-count">{this.state.times_completed}</span></span>
                        </div>
                        <div className="choose">
                            <i className="fa fa-user fa-2x" aria-hidden="true" />
                            <select className="choose-user" onChange={this.handleChangeUser}>
                                {userResults.map((user, index) =>
                                    <option value={index} key={index}>
                                        {(this.state.is_anonymous) ? "Респондент " + ++index : user.name}
                                        </option>)
                                }
                            </select>
                        </div>
                    </div>
                    <Tabs questions_list = {this.state.questions_list}
                          survey_page = {this.state.survey_page}
                          user_results = {this.state.user_results}
                          currentPage = '/survey/results'
                          navtabs={this.state.navtabs}
                          handleChangePage = {this.handleChangePage}
                          questions_are_numbered = {this.state.questions_are_numbered}
                          pages_are_numbered = {this.state.pages_are_numbered}
                          required_fields = {this.state.required_fields}
                          displayChart = {this.state.displayChart}
                    />
                </div>
            </main>
        )
    }
}
