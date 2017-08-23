import React from 'react';
import ReactStars from 'react-stars'

export default class Answer extends React.Component {
    render() {
        const { answers,
            result,
            required,
            title,
            index,
            type,
            questions_are_numbered,
            required_fields } = this.props;

        let question = null;
        if (type === 'multi-choice') {
            question = result.map((val, index) => <div key={index}>{answers[val]}</div>)
        }

        if (type === 'single-choice') {
            question = result.map((val, index) => <div key={index}>{answers[val]}</div>)
        }
        if (type === 'text') {
            question = <div>
                <pre>{result}</pre>
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
    }
}