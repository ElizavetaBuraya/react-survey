import React from 'react';
import Sidebar from './Sidebar.jsx';
import GenerateQuestions from './GenerateQuestions.jsx'
import update from 'react/lib/update'

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
            questions: null,
        };
        this.handleAddQuestion = this.handleAddQuestion.bind(this);
        this.handleUpdateQuestion = this.handleUpdateQuestion.bind(this);
        this.handleDragQuestion = this.handleDragQuestion.bind(this);
        this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
    }

    componentDidMount() {
        if (this.props.currentPage !== '/new_survey')
        {
            this.props.handleChangePage('/new_survey');
        }
        toggleSurveyPanel();
    }

    handleAddQuestion(questionType) {
        let questionsArray = (this.state.questions) ? this.state.questions : [];
        let answersArray = (questionType === "multi-choice"
        || questionType === "single-choice")
            ? [ "Ответ 1", "Ответ 2", "Ответ 3"]
            : [];
        let newQuestion = {
            "id": (this.state.questions) ? questionsArray[questionsArray.length - 1].id + 1 : 0,
            "title": "Новый вопрос",
            "type": questionType,
            "answers": answersArray
        };
        questionsArray.push(newQuestion);
        this.setState({
            questions: questionsArray
        })
    }

    handleUpdateQuestion(newQuestions) {
        this.setState({
            questions:newQuestions,
        })
    }

    handleDragQuestion(dragIndex, hoverIndex, dragQuestion) {
        this.setState(update(this.state, {
            questions: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragQuestion],
                ],
            },
        }));
    }

    handleDeleteQuestion(id) {
        let deleteQuestion = confirm("Вы уверены, что хотите удалить вопрос?");

        if(deleteQuestion) {
            let newArray = this.state.questions.filter((question) => question.id !== id);

            this.setState ({
                questions: newArray,
            });

            $(".edit-question").show();
        }
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
                            <p className="question-number">Вопросов: <span>{(this.state.questions) ? this.state.questions.length : 0}</span>,</p>
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
                            {this.state.questions &&
                                <GenerateQuestions questions = {this.state.questions}
                                                   handleUpdateQuestion = {this.handleUpdateQuestion}
                                                   handleDragQuestion = {this.handleDragQuestion}
                                                   handleDeleteQuestion = {this.handleDeleteQuestion}
                                />
                            }
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
