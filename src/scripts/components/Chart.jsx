import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomTooltip  = React.createClass({
    render() {
        const { active } = this.props;

        if (active) {
            const { payload, label } = this.props;
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${label} : ${payload[0].value}% (${payload[0].payload.number} ответов)`}</p>
                </div>
            );
        }

        return null;
    }
});

const CustomizedLegend = React.createClass({
    render() {
        function getStyles(color) {
            return {
                marginRight:'10px',
                display: 'inline-block',
                height:'15px',
                width:'15px',
                backgroundColor: color,
            };
        }

        const { data } = this.props;
        return (
            <div className="answer-stats">
                {
                    data.map((entry, index) => (
                        <div key={`item-${index}`}>
                            <div style={getStyles(COLORS[index])}/>
                            <span>
                                {`${entry.name}: ${entry.response}% (${entry.number} ответов)`}
                            </span>
                        </div>
                    ))
                }
            </div>
        )
    }
});

const COLORS = ['#98CCFA', '#00C49F', '#FFBB28', '#FFB6C1', '#00FF7F'];

const Chart = (props) => {

    const getPercentage = (type) => {
        let user_results = props.user_results;
        let survey_page = props.survey_page;
        let answers = props.answers;
        let answerStats = [0, 0, 0, 0, 0];
        let answered = props.answered;

        user_results.map((user) => {
            user.results[survey_page].map((question) => {
                if (question.id === props.id) {
                    if (type === 'rating') {
                        for (let i = 1; i < 6; i++) {
                            if (question.result === i) {
                                answerStats[i-1]++;
                            }
                        }
                    } else {
                        for (let i = 0; i < 3; i++) {
                            if (question.result.includes(i)) {
                                answerStats[i]++;
                            }
                        }
                    }

                }
            })
        });

        const data = (type === 'rating') ? [
            {name: '1 \u2605', response: Math.round((answerStats[0] * 100)/answered), number: answerStats[0]},
            {name: '2 \u2605', response: Math.round((answerStats[1] * 100)/answered), number: answerStats[1]},
            {name: '3 \u2605', response: Math.round((answerStats[2] * 100)/answered), number: answerStats[2]},
            {name: '4 \u2605', response: Math.round((answerStats[3] * 100)/answered), number: answerStats[3]},
            {name: '5 \u2605', response: Math.round((answerStats[4] * 100)/answered), number: answerStats[4]},
        ]
        :[
            {name: answers[0], response: Math.round((answerStats[0] * 100)/answered), number: answerStats[0]},
            {name: answers[1], response: Math.round((answerStats[1] * 100)/answered), number: answerStats[1]},
            {name: answers[2], response: Math.round((answerStats[2] * 100)/answered), number: answerStats[2]},
        ];

        return data;
    };

        const { type } = props;

        const toPercent = (decimal, fixed = 0) => {
            return `${(decimal).toFixed(fixed)}%`;
        };

        const data = getPercentage(type);

        return (
            <div className="chart-container">
                <ResponsiveContainer height="100%" aspect={2}>
                    <BarChart layout="vertical" width={600} height={300} data={data}
                              margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                        <XAxis type="number" tickFormatter={toPercent} domain={[0, 100]} />
                        <YAxis dataKey="name" type="category"/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip content={<CustomTooltip/>}/>
                        <Bar maxBarSize={50} dataKey="response" fill="#98ccfa" name="Процент ответов">
                            {
                                data.map((entry, index) => {
                                    return <Cell key={index} fill={COLORS[index]} />;
                                })
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <CustomizedLegend data={data}/>
            </div>
        );
};

export default Chart;