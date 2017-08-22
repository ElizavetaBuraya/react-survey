import React from 'react';
import ReactStars from 'react-stars'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class Chart extends React.Component {

    getPercentage = () => {
        let user_results = this.props.user_results;
        let survey_page = this.props.survey_page;
        let answers = this.props.answers;
        let answerStats = [0, 0, 0];
        let answered = 0;
        let missed = 0;

        user_results.map((user) => {
            user.results[survey_page].map((question) => {
                if (question.id === this.props.id) {
                    (question.result.length !== 0)
                        ? answered ++
                        : missed ++;

                    for (let i = 0; i < 2; i++) {
                        if (question.result.includes(i)) {
                            answerStats[i]++;
                        }
                    }
                }
            })
        });

        const data = [
            {name: answers[0], Ответили: Math.round((answerStats[0] * 100)/answered)},
            {name: answers[1], Ответили: Math.round((answerStats[1] * 100)/answered)},
            {name: answers[2], Ответили: Math.round((answerStats[2] * 100)/answered)},
        ];

        return data;
    };

    render() {
        const { result,
            required,
            title,
            index,
            type,
            questions_are_numbered,
            required_fields } = this.props;

        const toPercent = (decimal, fixed = 0) => {
            return `${(decimal).toFixed(fixed)}%`;
        };

        let question = null;

        if (type === 'multi-choice' || type === 'single-choice') {
            question =
                <div className="chart-container">
                <ResponsiveContainer height="100%" aspect={2}>
                    <BarChart layout="vertical" width={600} height={300} data={this.getPercentage()}
                               margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                        <XAxis type="number" tickFormatter={toPercent}/>
                        <YAxis dataKey="name" type="category"/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Bar maxBarSize={50} dataKey="Ответили" fill="#98ccfa"/>
                    </BarChart>
                </ResponsiveContainer>
                </div>
        }

        if (type === 'text') {
            question = <div>
                {result}
            </div>
        }
        if (type === 'file') {
            question = <div>
                <a href={result.url} download={result.name.split('\\')[2]}>{result.name.split('\\')[2]}</a>
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
            </div>
        );
    }
}