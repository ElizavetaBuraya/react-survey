import React from 'react';
import Question from './Question.jsx';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export default class GenerateQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.moveQuestion = this.moveQuestion.bind(this);
        this.state = {
            questions: this.props.questions_list,
        }
    }

    moveQuestion(dragIndex, hoverIndex) {
        const questionsList = this.props.questions_list;
        const survey_page = this.props.survey_page;
        const newQuestionsList = questionsList[survey_page];

        const dragQuestion = newQuestionsList[dragIndex];

        this.props.handleDragQuestion(dragIndex, hoverIndex, dragQuestion);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    render() {
        const questions_list = this.props.questions_list;
        const survey_page = this.props.survey_page;

        if (this.props.randomized) {
            questions_list[survey_page] = this.shuffleArray(questions_list[survey_page]);
        }

        return (
            <div>
                {questions_list[survey_page].map((question, index) =>
                    <Question
                        key={question.id}
                        index={index}
                        id={question.id}
                        title={question.title}
                        type={question.type}
                        required={question.required}
                        answers={question.answers}
                        result={question.result}
                        questions_list = {this.props.questions_list}
                        survey_page = {this.props.survey_page}
                        currentPage = {this.props.currentPage}
                        handleUpdateQuestion = {this.props.handleUpdateQuestion}
                        handleDeleteQuestion = {this.props.handleDeleteQuestion}
                        handleSaveAnswer = {this.props.handleSaveAnswer}
                        moveQuestion={this.moveQuestion}
                        is_anonymous = {this.props.is_anonymous}
                        questions_are_numbered = {this.props.questions_are_numbered}
                        required_fields = {this.props.required_fields}
                        progress_bar = {this.props.progress_bar}
                    />
                )}
            </div>
        )
    }
}
