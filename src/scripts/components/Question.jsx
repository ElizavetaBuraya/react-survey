import React from 'react';
import ReactStars from 'react-stars'
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import Checkbox from './Checkbox.jsx'
import Radio from './Radio.jsx'
import ReactQuill from 'react-quill';

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
        this.state = {
            rangeValue: 0,
            textboxValue:(this.props.result) ? this.props.result : "",
            isEdited: false
        };

        this.title = null;
        this.required = this.props.required;
        this.answersArray = [];
        this.modules = {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],
            ],
        };
    }

    handleChange = (id, event) => {
        this.setState({
            rangeValue: event.target.value
        });
        this.props.handleSaveAnswer(id, event.target.value);
    };

    handleEditedQuestion = (val, target) => {
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
    };

    handleSaveEdited = (editedIndex) => {
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
    };

    handleEditAnswer = (newValue, index) => {
        this.answersArray[index] = newValue;
    };

    handleUploadFile = (id, event) => {
        let chosenFile = $(event.target).parent('div');
        let fileName = event.target.value;
        if(fileName) {
            $(chosenFile).find('.filepath').html(fileName);
        }

        let that = this;
        let file = event.target.files[0];
        let reader = new FileReader();

        reader.onloadend = function() {
            let fileObject = {'name': fileName, 'url': reader.result, 'type': file.type};
            that.props.handleSaveAnswer(id, fileObject);
        };
        reader.readAsDataURL(file);
    };

    handleChangeRating = (newRating) => {
        this.props.handleSaveAnswer(this.props.id, newRating);
    };

    handleChangeTextAnswer = (value) => {
        this.setState({
            textboxValue: value
        });
        (this.props.handleSaveAnswer)
            ? this.props.handleSaveAnswer(this.props.id, this.state.textboxValue)
                : '';
    };

    render() {
        const { connectDragSource,
            connectDropTarget,
            currentPage,
            answers,
            id,
            result,
            required,
            title,
            index,
            type,
            handleSaveAnswer,
            handleDeleteQuestion,
            questions_are_numbered,
            required_fields } = this.props;

        let question = null;
        if (type === 'multi-choice') {
            question = <div>
                            {answers.map((answer, index) =>
                                <Checkbox key = {index}
                                          index = {index}
                                          answer = {answer}
                                          handleEditAnswer = {this.handleEditAnswer}
                                          isEdited = {this.state.isEdited}
                                          name = {id}
                                          result={result}
                                          handleSaveAnswer = {handleSaveAnswer}
                                />)
                            }
                        </div>
        }
        if (type === 'single-choice') {
            question = <div>
                            {answers.map((answer, index) =>
                                <Radio    index = {index}
                                          answer = {answer}
                                          handleEditAnswer = {this.handleEditAnswer}
                                          isEdited = {this.state.isEdited}
                                          name = {id}
                                          result={result}
                                          handleSaveAnswer = {handleSaveAnswer}
                                <Radio key = {index}
                                />)
                            }
                        </div>
        }
        if (type === 'text') {
            question = <div className="text-editor">
                            <ReactQuill name='text-area'
                                        theme='snow'
                                        modules={this.modules}
                                        id='text-area'
                                        value={this.state.textboxValue}
                                        onChange={this.handleChangeTextAnswer}
                            />
                        </div>
        }
        if (type === 'file') {
            question = <div>
                            <input name="file" className='input-file' id='file' type="file"
                                   onChange={(event) => this.handleUploadFile(id, event)} />
                            <label htmlFor='file'>Файл</label>
                            <span className='filepath'>{(result)
                                ? result.name
                                : "Ничего не выбрано"}
                            </span>
                        </div>
        }
        if (type === 'rating') {
            question = <ReactStars
                            value={(result) ? result : 0}
                            count={5}
                            size={34}
                            half={false}
                            onChange={this.handleChangeRating}
                            color1={'#f4f4f4'}
                            color2={'#ffd700'} />
        }
        if (type === 'scale') {
            question = <div>
                <input
                    id='rangeInput'
                    type='range'
                    min='0' max='100'
                    value={(result) ? result : this.state.rangeValue}
                    onChange={(event) => this.handleChange(id, event)}
                    step='1'/>
                <output name='amount'
                        id='amount'
                        htmlFor='rangeInput'>
                    {(result)
                        ? result
                        : this.state.rangeValue
                    }
                </output>
            </div>
        }
        return connectDropTarget(
            <div className='question'>
                {(currentPage !== '/survey') &&
                    <span className='edit-question'
                          onClick={(e) => this.handleEditedQuestion(true, e.currentTarget)}/>
                }
                <div className='edit-question-params'>
                    {connectDragSource(
                        <p className='move'>Переместить</p>
                    )}
                    <Checkbox className='required-question'
                                  answer = 'Обязательный'
                                  id = {'required' + id}
                                  isChecked = {required}
                                  onChange={(val) => this.required = val}
                    />
                    <span className='delete-question' onClick={() => handleDeleteQuestion(id)}/>
                </div>
                <p className='question-title'>
                    {questions_are_numbered &&
                        <span className='question-number'>{index + 1}.</span>
                    }
                    {required_fields &&
                        <span className="required-field">{(required) ? " * " : ""}</span>
                    }
                    {this.state.isEdited &&
                        <input type='text'
                               name='question-title'
                               defaultValue={title}
                               onChange={(event) => this.title = event.target.value }
                        />
                    }
                    {!this.state.isEdited &&
                        <span>
                           {title}
                        </span>
                    }
                </p>
                { question }
                <div className='stop-edit-question'>
                    <a className='save-edited' href='#'
                       onClick={() => this.handleSaveEdited(id)}>Сохранить
                    </a>
                    <a className='quit-edited' href='#' onClick={() => this.handleEditedQuestion(false)}>Отмена</a>
                </div>
            </div>
        );
    }
}