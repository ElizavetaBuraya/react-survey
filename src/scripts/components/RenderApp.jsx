import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App.jsx';

export default class RenderApp extends React.Component{
    render() {
        return(
            <BrowserRouter basename={'/'}>
                <App />
            </BrowserRouter>
        )
    }
}

