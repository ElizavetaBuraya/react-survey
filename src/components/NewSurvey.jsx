import React from 'react';
import Sidebar from './Sidebar.jsx';

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            rangeValue: 0,
        }
    }

    handleChange(event) {
        this.setState({rangeValue: event.target.value});
    }

    render() {
        let question = null;
        if (this.props.type === "multi-choice") {
            question = <div>
                            <input type="checkbox" id="check-one" name="checkbox-question"/>
                            <label htmlFor="check-one">{this.props.answers[0]}</label><br/>
                            <input type="checkbox" id="check-two" name="checkbox-question" />
                            <label htmlFor="check-two">{this.props.answers[1]}</label><br/>
                            <input type="checkbox" id="check-three" name="checkbox-question" />
                            <label htmlFor="check-three">{this.props.answers[2]}</label><br/>
                        </div>
        }
        if (this.props.type === "single-choice") {
            question = <div>
                            <input type="radio" id="radio-one" name="radio-option"/>
                            <label htmlFor="radio-one">{this.props.answers[0]}</label><br/>
                            <input type="radio" id="radio-two" name="radio-option"/>
                            <label htmlFor="radio-two">{this.props.answers[0]}</label><br/>
                            <input type="radio" id="radio-three" name="radio-option"/>
                            <label htmlFor="radio-three">{this.props.answers[0]}</label><br/>
                        </div>
        }
        if (this.props.type === "text") {
            question = <div>
                            <textarea name="text-area" id="text-area" style={{width: 300, height: 100}} />
                        </div>
        }
        if (this.props.type === "file") {
            question = <div>
                            <input type="file" className="input-file" name="file" id="file" />
                            <label htmlFor="file">Файл</label><span className="filepath">Ничего не выбрано</span>
                        </div>
        }
        if (this.props.type === "rating") {
            question = <div>
                            <ul className="c-rating"/>
                        </div>;
        }
        if (this.props.type === "scale") {
            question = <div>
                            <input
                                id="rangeInput"
                                type="range"
                                min="0" max="100"
                                value={this.state.rangeValue}
                                onChange={(event) => this.handleChange(event)}
                                step="1"/>
                            <output name="amount" id="amount" htmlFor="rangeInput">{this.state.rangeValue}</output>
                        </div>
        }
        return(
            <div className="question">
                <i className="fa fa-pencil-square fa-lg" aria-hidden="true" />
                <p className="question-title"><span className="question-number">{this.props.number}.</span> {this.props.title} </p>
                { question }
            </div>
        )
    }
}

class GenerateQuestions extends React.Component {
    componentDidUpdate() {
        (function () {
            let starArray = document.querySelectorAll(".c-rating");
            let currentRating = 0;
            let maxRating= 5;

            [...starArray].forEach(function(el) {
                if (el) {
                    if (!el.hasChildNodes()) {
                        let myRating = rating(el, currentRating, maxRating);
                        myRating.setRating(1);
                    }
                }
            });
        })();
    }

    render() {
        const questions = this.props.questions;
        return (
            <div>
                {questions.map((question, index) =>
                    <Question
                        key={index}
                        number={index + 1}
                        title={question.title}
                        type={question.type}
                        answers={question.answers}
                    />
                )}
            </div>
        )
    }
}

class EditQuestions extends React.Component {
    render() {
        return (
            <div className="question edited">
                <i className="fa fa-trash fa-lg" aria-hidden="true" />
                <div className="edit-question-params">
                    <p className="move">Переместить</p>
                    <p><input className="edit-question" type="checkbox" name="required" defaultChecked={true} />Обязательный</p>
                </div>
                <span className="question-number ">2. </span>
                <input type="text" name="question-title" id="question-title" defaultValue={"Вопрос с одним ответом (в режиме редактирования)"} /><br/>
                <input type="radio" name="radio-option"/><input type="text" name="question-input" placeholder="Ответ 1"/><br/>
                <input type="radio" name="radio-option"/><input type="text" name="question-input" placeholder="Ответ 2"/><br/>
                <input type="radio" name="radio-option"/><input type="text" name="question-input" placeholder="Ответ 3"/><br/>
                <div className="save-edited">
                    <a href="#">Сохранить</a>
                    <a href="#">Отмена</a>
                </div>
            </div>
        )
    }
}

function toggleSurveyPanel() {
    $('.overlay').on('click', function () {
        $('#sidebar, #sidebarCollapse').removeClass('active-bar');
        $('.overlay').fadeOut();
    });

    $('#sidebarCollapse').on('click', function () {
        if ($('#sidebarCollapse').hasClass('active-bar')) {
            $('#sidebar, #sidebarCollapse').removeClass('active-bar');
            $('.overlay').fadeOut();
        } else {
            $('#sidebar, #sidebarCollapse').addClass('active-bar');
            $('.overlay').fadeIn();
        }
    });
}

export default class NewSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
        };
        this.handleAddQuestion = this.handleAddQuestion.bind(this);
    }

    componentDidMount() {
        if (this.props.currentPage !== '/new_survey')
        {
            this.props.handleChangePage('/new_survey');
        }
        toggleSurveyPanel();
    }

    handleAddQuestion(questionType) {
        let questionsArray = this.state.questions;
        let answersArray = (questionType === "multi-choice"
        || questionType === "single-choice")
            ? [ "Ответ 1", "Ответ 2", "Ответ 3"]
            : [];
        let newQuestion = {
            "index": questionsArray.length - 1,
            "title": "Новый вопрос",
            "type": questionType,
            "answers": answersArray
        };
        questionsArray.push(newQuestion);
        this.setState({
            questions: questionsArray,
        })
    }

    render() {
        return (
            <main className="d-flex flex-row">
                <Sidebar
                    currentPage = {this.props.currentPage}
                />
                <div className="main-content survey d-flex flex-column">
                    <div className="page-head">
                        <label htmlFor="new_survey"><p className="survey-title">Новый опрос:</p></label>
                        <input type="text" name="new-survey" id="new_survey" /><br/>
                        <div className="survey-stats">
                            <p className="question-number">Вопросов: <span>{this.state.questions.length}</span>,</p>
                            <p className="page-number">cтраниц: <span>1</span></p>
                        </div>
                        <div className="survey-command-panel">
                            <a href="#">Сохранить</a>
                            <a href="#">Сохранить как шаблон</a>
                            <a href="#">Отмена</a>
                            <a href="#">Новая страница</a>
                        </div>
                    </div>
                    <div id="page_1" className="survey-page">
                        <div className="tab">
                            <a className="tablinks active-tab">Страница 1</a>
                        </div>
                        <div className="survey-content">
                            <i className="fa fa-trash fa-lg" aria-hidden="true" />
                            <input type="text" name="page-head" id="page_name" placeholder="Страница 1" /><br/>
                            <GenerateQuestions questions={this.state.questions}/>
                        </div>
                    </div>
                    <aside className="survey-sidebar" id="sidebar">
                        <a className="survey-sidebar-collapse" id="sidebarCollapse" />
                        <div className="params">
                            <p>Тип вопроса</p>
                            <ul className="question-type-list">
                                <li className="single-answer" onClick={() => this.handleAddQuestion("single-choice")}>Варианты ответа (один)</li>
                                <li className="multiple-answer" onClick={() => this.handleAddQuestion("multi-choice")}>Варианты ответа (несколько)</li>
                                <li className="text-answer" onClick={() => this.handleAddQuestion("text")}>Текст</li>
                                <li className="file-answer" onClick={() => this.handleAddQuestion("file")}>Файл</li>
                                <li className="star-answer" onClick={() => this.handleAddQuestion("rating")}>Рейтинг в звездах</li>
                                <li className="range-answer" onClick={() => this.handleAddQuestion("scale")}>Шкала</li>
                            </ul>
                        </div>
                        <div className="params">
                            <p>Параметры опроса</p>
                            <ul className="survey-params-list">
                                <li><input type="checkbox" id="anonymous"/><label htmlFor="anonymous">Анонимный опрос</label></li>
                                <li><input type="checkbox" id="questions-are-numbered"/><label htmlFor="questions-are-numbered">Номера вопросов</label></li>
                                <li><input type="checkbox" id="pages-are-numbered"/><label htmlFor="pages-are-numbered">Номера страниц</label></li>
                                <li><input type="checkbox" id="random-order"/><label htmlFor="random-order">Случайный порядок вопросов</label></li>
                                <li><input type="checkbox" id="compulsory"/><label htmlFor="compulsory">Звездочки обязательных полей</label></li>
                                <li><input type="checkbox" id="progress"/><label htmlFor="progress">Индикатор выполнения</label></li>
                            </ul>
                        </div>
                    </aside>
                    <div className="progress d-flex justify-content-center">
                        <span className="done">12</span>/<span className="todo">12</span>
                        <div className="progress-bar">
                            <div className="bar new-survey-bar" />
                        </div>
                        <span className="percent">100%</span>
                    </div>
                </div>
                <div className="overlay" />
            </main>
        )
    }
}
