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
            questions: this.props.questions,
        }
    }

    componentDidUpdate() {
        (function () {
            let starArray = document.querySelectorAll('.c-rating');
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


    moveQuestion(dragIndex, hoverIndex) {
        const questions = this.props.questions;
        const dragQuestion = questions[dragIndex];

        this.props.handleDragQuestion(dragIndex, hoverIndex, dragQuestion);
    }

    render() {
        const questions = this.props.questions;
        return (
            <div>
                {questions.map((question, index) =>
                    <Question
                        key={question.id}
                        index={index}
                        id={question.id}
                        title={question.title}
                        type={question.type}
                        answers={question.answers}
                        questions = {this.props.questions}
                        handleUpdateQuestion = {this.props.handleUpdateQuestion}
                        handleDeleteQuestion = {this.props.handleDeleteQuestion}
                        moveQuestion={this.moveQuestion}
                    />
                )}
            </div>
        )
    }
}