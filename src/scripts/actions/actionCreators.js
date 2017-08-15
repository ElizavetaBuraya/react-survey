import {actionTypes} from './actionTypes';

export function generateQuestions(questions){
    return {
        type: actionTypes.GENERATE_QUESTIONS,
        payload: questions
    };
}