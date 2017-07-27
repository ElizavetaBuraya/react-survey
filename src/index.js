import './content/users.js';
import './content/surveys.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
import './libraries/Chart.min.js';
import './custom_scripts/edit-template.js';
import './libraries/rating.min.js';
import './custom_scripts/forms-script.js';

ReactDOM.render((
    <BrowserRouter basename={'/'}>
        <App />
    </BrowserRouter>
), document.getElementById('page-content'))
