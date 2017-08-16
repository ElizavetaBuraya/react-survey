import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import Checkbox from './Checkbox.jsx'
import Radio from './Radio.jsx'

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
    $('.question').removeClass('edited');
    $('.edit-question-params, .stop-edit-question').hide();
    $('.edit-question').show();
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
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.state = {
            rangeValue: 0,
            textboxValue:"",
            isEdited: false
        };
        this.title = null;
        this.required = this.props.required;
        this.answersArray = [];
    }

    handleChange(event) {
        this.setState({
            rangeValue: event.target.value
        });
    }

    handleEditedQuestion(val, target) {
        this.setState({
            isEdited: val,
        });

        if (val) {
            let editedQuestion = $(target).parent('.question');
            $('.edit-question').hide();
            editedQuestion.addClass('edited');
            editedQuestion.find('.edit-question-params, .stop-edit-question').css('display', 'flex');
        } else {
            hideQuestionControls();
        }
    }

    handleSaveEdited(editedIndex) {
        hideQuestionControls();
        let newArray = this.props.questions_list[this.props.survey_page];

        this.setState({
            isEdited: false,
        });

        newArray.map((question) => {
            if (question.id === editedIndex) {
                question.title = (this.title)
                    ? this.title
                    : question.title;

                question.required = this.required;

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

    handleUploadFile(id, event) {
        let chosenFile = $(event.target).parent('div');

        let fileName = event.target.value;
        if(fileName) {
            $(chosenFile).find('.filepath').html(fileName);
            this.props.handleSaveAnswer(id, fileName);
        }
    }

    render() {
        const { connectDragSource, connectDropTarget } = this.props;
        let question = null;
        if (this.props.type === 'multi-choice') {
            question = <div>
                            <Checkbox index = {0}
                                      answer = {this.props.answers[0]}
                                      handleEditAnswer = {this.handleEditAnswer}
                                      isEdited = {this.state.isEdited}
                                      name = {this.props.id}
                                      result={this.props.result}
                                      handleSaveAnswer = {this.props.handleSaveAnswer}
                            />
                            <Checkbox index = {1}
                                      answer = {this.props.answers[1]}
                                      handleEditAnswer = {this.handleEditAnswer}
                                      isEdited = {this.state.isEdited}
                                      name = {this.props.id}
                                      result={this.props.result}
                                      handleSaveAnswer = {this.props.handleSaveAnswer}
                            />
                            <Checkbox index = {2}
                                      answer = {this.props.answers[2]}
                                      handleEditAnswer = {this.handleEditAnswer}
                                      isEdited = {this.state.isEdited}
                                      name = {this.props.id}
                                      result={this.props.result}
                                      handleSaveAnswer = {this.props.handleSaveAnswer}
                            />
                        </div>
        }
        if (this.props.type === 'single-choice') {
            question = <div>
                            <Radio    index = {0}
                                      answer = {this.props.answers[0]}
                                      handleEditAnswer = {this.handleEditAnswer}
                                      isEdited = {this.state.isEdited}
                                      name = {this.props.id}
                                      result={this.props.result}
                                      handleSaveAnswer = {this.props.handleSaveAnswer}
                            />
                            <Radio    index = {1}
                                      answer = {this.props.answers[1]}
                                      handleEditAnswer = {this.handleEditAnswer}
                                      isEdited = {this.state.isEdited}
                                      name = {this.props.id}
                                      result={this.props.result}
                                      handleSaveAnswer = {this.props.handleSaveAnswer}
                            />
                            <Radio    index = {2}
                                      answer = {this.props.answers[2]}
                                      handleEditAnswer = {this.handleEditAnswer}
                                      isEdited = {this.state.isEdited}
                                      name = {this.props.id}
                                      result={this.props.result}
                                      handleSaveAnswer = {this.props.handleSaveAnswer}
                            />
                        </div>
        }
        if (this.props.type === 'text') {
            question = <div>
                            <textarea name='text-area'
                                      id='text-area'
                                      style={{width: 300, height: 100}}
                            />
                        </div>
        }
        if (this.props.type === 'file') {
            question = <div>
                            <input name="file" className='input-file' id='file' type="file"
                                   onChange={(e) => this.props.handleSaveAnswer(this.props.id, e.target.value)} />
                            <label htmlFor='file'>Файл</label><span className='filepath'>Ничего не выбрано</span>
                                   onChange={(event) => this.handleUploadFile(this.props.id, event)} />
                            <label htmlFor='file'>Файл</label>
                            <span className='filepath'>{(this.props.result) ? this.props.result : "Ничего не выбрано"}</span>
                        </div>
        }
        if (this.props.type === 'rating') {
            question = <div>
                            <ul className='c-rating'/>
                        </div>;
        }
        if (this.props.type === 'scale') {
            question = <div>
                <input
                    id='rangeInput'
                    type='range'
                    min='0' max='100'
                    value={this.state.rangeValue}
                    onChange={(event) => this.handleChange(this.props.type, this.props.id, event)}
                    step='1'/>
                <output name='amount' id='amount' htmlFor='rangeInput'>{this.state.rangeValue}</output>
            </div>
        }
        return connectDropTarget(
            <div className='question'>
                {(this.props.currentPage !== '/survey') &&
                    <span className='edit-question'
                          onClick={(e) => this.handleEditedQuestion(true, e.currentTarget)}/>
                }
                <div className='edit-question-params'>
                    {connectDragSource(
                        <p className='move'>Переместить</p>
                    )}
                    <Checkbox className='required-question'
                                  answer = 'Обязательный'
                                  id = {'required' + this.props.id}
                                  isChecked = {this.props.required}
                                  onChange={(val) => this.required = val}
                    />
                    <span className='delete-question' onClick={() => this.props.handleDeleteQuestion(this.props.id)}/>
                </div>
                <p className='question-title'>
                    <span className='question-number'>{this.props.index + 1}.</span>
                    {this.state.isEdited &&
                        <input type='text'
                               name='question-title'
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
                <div className='stop-edit-question'>
                    <a className='save-edited' href='#'
                       onClick={() => this.handleSaveEdited(this.props.id)}>Сохранить
                    </a>
                    <a className='quit-edited' href='#' onClick={() => this.handleEditedQuestion(false)}>Отмена</a>
                </div>
            </div>
        );
    }
}