import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App.jsx';

export default class RenderApp extends React.Component{
    render() {
        return(
            <BrowserRouter basename={'/'}>
                <App handleLogInOutClick = {this.props.handleLogInOutClick}
                     handleRegisteredClick = {this.props.handleRegisteredClick}
                     handleUpdatePage = {this.props.handleUpdatePage}
                     isRegistered = {this.props.isRegistered}
                     isAuthorized = {this.props.isAuthorized}
                     currentPage = {this.props.currentPage}
                     loggedInAs = {this.props.loggedInAs}
                />
            </BrowserRouter>
        )
    }
}

