import React from 'react';
import Question from './Question.jsx';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export default class GenerateQuestions extends React.Component {
    componentWillMount() {
        const questions_list = this.props.questions_list;
        const survey_page = this.props.survey_page;

        if (this.props.randomized) {
            questions_list[survey_page] = this.shuffleArray(questions_list[survey_page]);
        }
    }

    moveQuestion = (dragIndex, hoverIndex) => {
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
        const { questions_list,
            survey_page,
            currentPage,
            handleUpdateQuestion,
            handleDeleteQuestion,
            handleSaveAnswer,
            is_anonymous,
            questions_are_numbered,
            required_fields } = this.props;

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
                        questions_list = {questions_list}
                        survey_page = {survey_page}
                        currentPage = {currentPage}
                        handleUpdateQuestion = {handleUpdateQuestion}
                        handleDeleteQuestion = {handleDeleteQuestion}
                        handleSaveAnswer = {handleSaveAnswer}
                        moveQuestion={this.moveQuestion}
                        is_anonymous = {is_anonymous}
                        questions_are_numbered = {questions_are_numbered}
                        required_fields = {required_fields}
                    />
                )}
            </div>
        )
    }
}
