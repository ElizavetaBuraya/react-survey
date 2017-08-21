import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import renderApp from './reducer'

const rootReducer = combineReducers({
    form: formReducer,
    renderApp, 
});

export default rootReducer 