import {actionTypes} from './actionTypes';

export function updateHistory(history){
    return {
        type: actionTypes.UPDATE_HISTORY,
        payload: history
    };
}

export function generatePairs(pairs){
    return {
        type: actionTypes.GENERATE_PAIRS,
        payload: pairs
    };
}

export function updateTextAreaHeight(height){
    return {
        type: actionTypes.UPDATE_TEXT_AREA_HEIGHT,
        payload: height
    };
}

export function toggleCanGenerate(canGenerate){
    return {
        type: actionTypes.TOGGLE_CAN_GENERATE,
        payload: canGenerate
    };
}