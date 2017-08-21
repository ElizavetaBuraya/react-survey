import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

export default class App extends React.Component {
    render() {
        const { isFetching,
            isAuthorized,
            isRegistered,
            loggedInAs,
            userData,
            surveyData,
            currentPage,
            handleRegisteredClick,
            handleLogInClick,
            handleCreateUserClick,
            handleUpdatePage,
            handleLoadUserData,
            handleLoadSurveyData} = this.props;

        return (
            <BrowserRouter basename={'/'}>
                <div>
                    <Header
                        handleRegisteredClick = {handleRegisteredClick}
                        handleLogOutClick = {handleLogInClick}
                        isRegistered = {isRegistered}
                        isAuthorized = {isAuthorized}
                        currentPage = {currentPage}
                        loggedInAs = {loggedInAs}
                    />
                    <Main
                        handleLogInClick = {handleLogInClick}
                        handleCreateUserClick = {handleCreateUserClick}
                        handleRegisteredClick = {handleRegisteredClick}
                        handleChangePage = {handleUpdatePage}
                        handleLoadUserData = {handleLoadUserData}
                        handleLoadSurveyData = {handleLoadSurveyData}
                        isRegistered = {isRegistered}
                        isAuthorized = {isAuthorized}
                        isFetching = {isFetching}
                        currentPage = {currentPage}
                        loggedInAs = {loggedInAs}
                        userData = {userData}
                        surveyData = {surveyData}
                    />
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}

