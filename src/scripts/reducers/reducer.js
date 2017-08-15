import {actionTypes} from '../actions/actionTypes';

const initialState = {
  questions: null,
};

export default function renderApp(state = initialState, action) {
    switch(action.type){
        case actionTypes.GENERATE_QUESTIONS:
            return {...state, questions: action.payload};
        default:
            return state
    }
}