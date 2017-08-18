import React from 'react';
import ReactDOM from 'react-dom';
import './custom_scripts/forms-script.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppContainer from './containers/AppContainer';
import rootReducer from './reducers';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render((
    <Provider store={store}>
        <AppContainer />
    </Provider>
), document.getElementById('page-content'));
