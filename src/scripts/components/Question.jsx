import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

class Checkbox extends React.Component {
    render() {
        return(
            <div>
                {this.props.isEdited &&
                    <p>
                        <input type="checkbox" id={this.props.id} name="checkbox-question"/>
                        <label>
                            <input type="text" defaultValue={this.props.answer}
                                   onChange={(e) => this.props.handleEditAnswer(e.target.value, this.props.index) } />
                        </label>
                    </p>
                }
                {!this.props.isEdited &&
                    <p>
                        <input type="checkbox" id={this.props.id} name="checkbox-question" />
                        <label htmlFor={this.props.id}>{this.props.answer}</label>
                    </p>
                }
            </div>
        )
    }
}

class Radio extends React.Component {
    render() {
        return(
            <div>
                {this.props.isEdited &&
                    <p>
                        <input type="radio" id={this.props.id} name="radio-question"/>
                        <label>
                            <input type="text" defaultValue={this.props.answer}
                                   onChange={(e) => this.props.handleEditAnswer(e.target.value, this.props.index) } />
                        </label>
                    </p>
                }
                {!this.props.isEdited &&
                    <p>
                        <input type="radio" id={this.props.id} name="radio-question" />
                        <label htmlFor={this.props.id}>{this.props.answer}</label>
                    </p>
                }
            </div>
        )
    }
}

/* Drag and Drop logic start */

const ItemTypes = {
    QUESTION: 'question',
};

const questionSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        };
    },
};

const questionTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveQuestion(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
};

/* Drag and Drop logic end */

function hideQuestionControls() {
    $(".question").removeClass("edited");
    $(".edit-question-params, .stop-edit-question").hide();
    $(".edit-question").show();
}

@DropTarget(ItemTypes.QUESTION, questionTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.QUESTION, questionSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleEditedQuestion = this.handleEditedQuestion.bind(this);
        this.handleSaveEdited = this.handleSaveEdited.bind(this);
        this.handleEditAnswer = this.handleEditAnswer.bind(this);
        this.state = {
            rangeValue: 0,
            isEdited: false,
        };
        this.title = null;
        this.answersArray = [];
    }

    handleChange(event) {
        this.setState({rangeValue: event.target.value});
    }

    handleEditedQuestion(val, target) {
        this.setState({
            isEdited: val,
        });

        if (val) {
            let editedQuestion = $(target).parent(".question");
            $(".edit-question").hide();
            editedQuestion.addClass("edited");
            editedQuestion.find(".edit-question-params, .stop-edit-question").css("display", "flex");
        } else {
            hideQuestionControls();
        }
    }

    handleSaveEdited(editedIndex) {
        hideQuestionControls();
        let newArray = this.props.questions;

        this.setState({
            isEdited: false,
        });

        newArray.map((question) => {
            if (question.id === editedIndex) {
                question.title = (this.title)
                    ? this.title
                    : question.title;

                if (question.answers) {
                    question.answers[0] = (this.answersArray[0])
                        ? this.answersArray[0]
                        : question.answers[0];
                    question.answers[1] = (this.answersArray[1])
                        ? this.answersArray[1]
                        : question.answers[1];
                    question.answers[2] = (this.answersArray[2])
                        ? this.answersArray[2]
                        : question.answers[2];
                }
            }
        });

        this.props.handleUpdateQuestion(newArray);
    }

    handleEditAnswer(newValue, index) {
        this.answersArray[index] = newValue;
    }

    render() {
        const { connectDragSource, connectDropTarget } = this.props;
        let question = null;
        if (this.props.type === "multi-choice") {
            question = <div>
                            <Checkbox index = {0}
                                      answer = {this.props.answers[0]}
                                      handleEditAnswer = {this.handleEditAnswer}
                                      isEdited = {this.state.isEdited}
                                      id = {"check-one" + this.props.index}
                            />
                            <Checkbox index = {1}
                                      answer = {this.props.answers[1]}
                                      handleEditAnswer = {this.handleEditAnswer}
                                      isEdited = {this.state.isEdited}
                                      id = {"check-two" + this.props.index}
                            />
                            <Checkbox index = {2}
                                      answer = {this.props.answers[2]}
                                      handleEditAnswer = {this.handleEditAnswer}
                                      isEdited = {this.state.isEdited}
                                      id = {"check-three" + this.props.index}
                            />
                        </div>
        }
        if (this.props.type === "single-choice") {
            question = <div>
                            <Radio    index = {0}
                                      answer = {this.props.answers[0]}
                                      handleEditAnswer = {this.handleEditAnswer}
                                      isEdited = {this.state.isEdited}
                                      id = {"radio-one" + this.props.index}
                            />
                            <Radio    index = {1}
                                      answer = {this.props.answers[1]}
                                      handleEditAnswer = {this.handleEditAnswer}
                                      isEdited = {this.state.isEdited}
                                      id = {"radio-two" + this.props.index}
                            />
                            <Radio    index = {2}
                                      answer = {this.props.answers[2]}
                                      handleEditAnswer = {this.handleEditAnswer}
                                      isEdited = {this.state.isEdited}
                                      id = {"radio-three" + this.props.index}
                            />
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
        return connectDropTarget(
            <div className="question">
                <span className="edit-question" onClick={(e) => this.handleEditedQuestion(true, e.currentTarget)}/>
                <div className="edit-question-params">
                    {connectDragSource(
                        <p className="move">Переместить</p>
                    )}
                    <p><input className="required-question" type="checkbox" name="required" defaultChecked={true} />Обязательный</p>
                    <span className="delete-question" onClick={() => this.props.handleDeleteQuestion(this.props.id)}/>
                </div>
                <p className="question-title">
                    <span className="question-number">{this.props.index + 1}.</span>
                    {this.state.isEdited &&
                        <input type="text"
                               name="question-title"
                               defaultValue={this.props.title}
                               onChange={(event) => this.title = event.target.value }
                        />
                    }
                    {!this.state.isEdited &&
                        <span>
                           {this.props.title}
                        </span>
                    }
                </p>
                { question }
                <div className="stop-edit-question">
                    <a className="save-edited" href="#"
                       onClick={() => this.handleSaveEdited(this.props.id)}>Сохранить
                    </a>
                    <a className="quit-edited" href="#" onClick={() => this.handleEditedQuestion(false)}>Отмена</a>
                </div>
            </div>
        );
    }
}