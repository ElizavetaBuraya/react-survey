import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

export default class App extends React.Component {
    render() {
        const { isAuthorized,
            isRegistered,
            loggedInAs,
            currentPage,
            handleRegisteredClick,
            handleLogInClick,
            handleCreateUserClick,
            handleUpdatePage } = this.props;

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
                        isRegistered = {isRegistered}
                        isAuthorized = {isAuthorized}
                        currentPage = {currentPage}
                        loggedInAs = {loggedInAs}
                    />
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}

