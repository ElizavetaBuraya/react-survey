import React from 'react';
import Answer from './Answer.jsx';
import AnswerStats from './AnswerStats.jsx'

export default class GenerateResults extends React.Component {
    render() {
        const { handleToggleCharts,
            questions_list,
            survey_page,
            currentPage,
            questions_are_numbered,
            required_fields,
            displayChart,
            user_results } = this.props;

        if (!displayChart) {
            return (
                <div>
                    {questions_list[survey_page].map((question, index) =>
                        <Answer
                            key={question.id}
                            index={index}
                            title={question.title}
                            type={question.type}
                            required={question.required}
                            answers={question.answers}
                            result={question.result}
                            questions_list = {questions_list}
                            survey_page = {survey_page}
                            currentPage = {currentPage}
                            questions_are_numbered = {questions_are_numbered}
                            required_fields = {required_fields}
                        />
                    )}
                </div>
            )
        } else {
            return (
                <div>
                    {questions_list[survey_page].map((question, index) =>
                        <AnswerStats
                            key={question.id}
                            id={question.id}
                            index={index}
                            title={question.title}
                            type={question.type}
                            user_results={user_results}
                            required={question.required}
                            answers={question.answers}
                            result={question.result}
                            questions_list = {questions_list}
                            survey_page = {survey_page}
                            currentPage = {currentPage}
                            questions_are_numbered = {questions_are_numbered}
                            required_fields = {required_fields}
                            handleToggleCharts = {handleToggleCharts}
                        />
                    )}
                </div>
            )
        }
    }
}
