import React from 'react';
import ReactStars from 'react-stars'

const Answer = (props) => {
        const { answers,
            result,
            required,
            title,
            index,
            questions_list,
            survey_page,
            type,
            questions_are_numbered,
            required_fields } = props;

        const lastQuestion  = (questions_list[survey_page].length === index + 1);

        let question = null;
        if (type === 'multi-choice') {
            question = result.map((val, index) => <div key={index}>{answers[val]}</div>)
        }

        if (type === 'single-choice') {
            question = result.map((val, index) => <div key={index}>{answers[val]}</div>)
        }
        if (type === 'text') {
            question = <div className='ql-snow'>
                            <div className='ql-editor' dangerouslySetInnerHTML={{ __html: result }} />
                        </div>
        }
        if (type === 'file') {
            question = <div>
                {(result !== undefined)
                    ? <a href={result.url} download={result.name.split('\\')[2]}>{result.name.split('\\')[2]}</a>
                    : ' '
                }
            </div>
        }
        if (type === 'rating') {
            question = <ReactStars
                value={result}
                count={5}
                size={34}
                edit={false}
                half={false}
                color1={'#f4f4f4'}
                color2={'#ffd700'} />
        }
        if (type === 'scale') {
            question = <div>
                {result}
            </div>
        }
        return (
            <div className='question'>
                <p className='question-title'>
                    {questions_are_numbered &&
                        <span className='question-number'>{index + 1}.</span>
                    }
                    {required_fields &&
                        <span className="required-field">{(required) ? " * " : ""}</span>
                    }
                    <span>
                      {title}
                    </span>
                </p>
                { question }
                {!lastQuestion && <hr/>}
            </div>
        );
    };

export default Answer;