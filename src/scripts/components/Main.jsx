import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginRegister from './LoginRegister.jsx';
import About from './About.jsx';
import Users from './Users.jsx';
import Surveys from './Surveys.jsx';
import Templates from './Templates.jsx';
import NewSurvey from './NewSurvey.jsx';
import GenerateSurvey from './RenderSurvey.jsx';
import NoMatch from './ErrorPage.jsx'

export default class Main extends React.Component {
    render() {
        const { isAuthorized,
            isRegistered,
            loggedInAs,
            currentPage,
            handleRegisteredClick,
            handleLogInClick,
            handleChangePage,
            handleCreateUserClick } = this.props;

        return (
            <Switch>
                <Route exact path='/'
                       component={() => <LoginRegister
                           isRegistered = {isRegistered}
                           isAuthorized = {isAuthorized}
                           handleRegisteredClick = {handleRegisteredClick}
                           handleCreateUserClick = {handleCreateUserClick}
                           handleLogInClick = {handleLogInClick}
                           handleChangePage = {handleChangePage}
                           currentPage = {currentPage}
                       />}
                />
                <Route path='/about' render={() => (
                    !isAuthorized ? (
                        <Redirect to='/'/>
                    ) : (
                        <About
                            isAuthorized={isAuthorized}
                            handleChangePage = {handleChangePage}
                            currentPage = {currentPage}
                            loggedInAs = {loggedInAs}
                        />
                    )
                )}/>
                <Route path='/users' render={() => (
                        !isAuthorized || (loggedInAs.role === 'Пользователь') ? (
                            <Redirect to='/'/>
                        ) : (
                            <Users
                                handleChangePage = {handleChangePage}
                                currentPage = {currentPage}
                                loggedInAs = {loggedInAs}
                            />
                        )
                )}/>
                <Route path='/surveys' render={() => (
                    !isAuthorized ? (
                        <Redirect to='/'/>
                    ) : (
                        <Surveys
                            handleChangePage = {handleChangePage}
                            currentPage = {currentPage}
                            loggedInAs = {loggedInAs}
                        />
                    )
                )}/>
                <Route path='/templates' render={() => (
                    !isAuthorized  || (loggedInAs.role === 'Пользователь') ? (
                        <Redirect to='/'/>
                    ) : (
                        <Templates
                            handleChangePage = {handleChangePage}
                            currentPage = {currentPage}
                        />
                    )
                )}/>
                <Route exact path='/new_survey' render={() => (
                    !isAuthorized  || (loggedInAs.role === 'Пользователь') ? (
                        <Redirect to='/'/>
                    ) : (
                        <NewSurvey
                            handleChangePage = {handleChangePage}
                            currentPage = {currentPage}
                        />
                    )
                )}/>
                <Route path='/new_survey/:link'
                       render={(props) =>
                           <NewSurvey {...props}
                                      currentPage='new_survey/:link'
                           />}
                />
                <Route path='/survey/:link'
                       render={(props) =>
                           <GenerateSurvey {...props}
                                           loggedInAs = {loggedInAs}
                           />}
                />
                <Route render={() => (
                    !isAuthorized ? (
                        <Redirect to='/'/>
                    ) : (
                        <NoMatch
                            isRegistered={isRegistered}
                            isAuthorized={isAuthorized}
                            handleChangePage = {handleChangePage}
                            currentPage = {currentPage}
                        />
                    )
                )}/>
            </Switch>
        )
    }
}