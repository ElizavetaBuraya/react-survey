import React from 'react';
import ReactDOM from 'react-dom';
import './custom_scripts/forms-script.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import AppContainer from './containers/AppContainer';
import rootReducer from './reducers';

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)
);

ReactDOM.render((
    <Provider store={store}>
        <AppContainer />
    </Provider>
), document.getElementById('page-content'));
