import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
import './custom_scripts/edit-question.js';
import './custom_scripts/edit-template.js';
import './custom_scripts/forms-script.js';
import './libraries/rating.min.js';

ReactDOM.render((
    <BrowserRouter basename={'/'}>
        <App />
    </BrowserRouter>
), document.getElementById('page-content'))
