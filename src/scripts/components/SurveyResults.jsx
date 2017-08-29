import React from 'react';
import Sidebar from './Sidebar.jsx';
import Tabs from './Tabs.jsx';
import { getSurveyStats, getUserResults } from '../utils/helperFunctions.js'

export default class NewSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            survey_id:null,
            survey_title:"",
            times_completed:0,
            user_results:[],
            selectedUser:0,
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
    }

    componentDidMount() {
        this.props.handleChangePage('/survey/:link/results');
        this.onLoad(this.props.location.pathname);
    }

    onLoad = (path) => {
        let pathId = path.split("/");
        let surveyId = pathId[pathId.length-2];

        let p1 = Promise.resolve(getSurveyStats(pathId));
        let p2 = Promise.resolve(getUserResults());

        Promise.all([p1, p2]).then(values => {
            let surveyData = values[0];
            let userData = values[1];

            let template = surveyData[0];
            let userResults = [];

            userData.map((user) => {
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
                survey_id : template.id,
                survey_title:template.name,
                survey_page:'page_1',
                numberOfPages: template.pages,
                numberOfQuestions: template.questions,
                is_anonymous: template.is_anonymous,
                questions_are_numbered: template.questions_are_numbered,
                pages_are_numbered: template.pages_are_numbered,
                required_fields: template.required_fields,
                navtabs: template.navtabs,
                times_completed:userResults.length,
                user_results: userResults,
                questions_list:userResults[0].results
            })
        })
    };

    handleChangePage = (page) => {
        this.setState({
            survey_page: page,
        })
    };

    handleChangeUser = (event, userIndex) => {
        let index = (userIndex !== undefined) ? userIndex : event.target.value;
        let userResults = this.state.user_results;

        this.setState({
            selectedUser: index,
            questions_list:userResults[index].results
        })
    };

    handleToggleCharts = (event, userIndex) => {
        if (userIndex !== undefined) {
            this.handleChangeUser(event, userIndex)
        }

        this.setState({
            displayChart:!this.state.displayChart
        })
    };

    render() {
        const { currentPage } = this.props;

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
                               onClick={() => this.handleToggleCharts(event)}>Сводные данные по вопросам</a>
                            <a href="#" className={(!this.state.displayChart) ? 'active' : ''}
                               onClick={() => this.handleToggleCharts(event)}>Отдельные ответы</a>
                            <span>Всего ответов: <span className="answers-count">{this.state.times_completed}</span></span>
                        </div>
                        {!this.state.displayChart &&
                            <Select user_results={this.state.user_results}
                                    selectedUser = {this.state.selectedUser}
                                    handleChangeUser = {this.handleChangeUser}
                                    is_anonymous = {this.state.is_anonymous}
                            />
                        }
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
                          handleToggleCharts = {this.handleToggleCharts}
                    />
                </div>
            </main>
        )
    }
}

const Select = React.createClass({
    render(){
        const userResults = this.props.user_results;

        return (
            <div className="choose">
                <div>
                    <select value={this.props.selectedUser} onChange={(e) => this.props.handleChangeUser(e)}>
                        {userResults.map((user, index) =>
                            <option value={index} key={index}>
                                {(this.props.is_anonymous) ? "Респондент " + ++index : user.name}
                            </option>)
                        }
                    </select>
                </div>
            </div>
        );
    }
});
