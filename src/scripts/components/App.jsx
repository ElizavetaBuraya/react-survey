import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

const App = (props) =>  {
    const {
        isAuthorized,
        isRegistered,
        loggedInAs,
        currentPage,
        handleRegisteredClick,
        handleLogInClick,
    } = props;

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
                <Main {...props}
                />
                <Footer />
            </div>
        </BrowserRouter>
    )
};

export default App;

