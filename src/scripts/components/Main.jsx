import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginRegister from './LoginRegister.jsx';
import About from './About.jsx';
import Users from './Users.jsx';
import Surveys from './Surveys.jsx';
import Templates from './Templates.jsx';
import NewSurvey from './NewSurvey.jsx';
import GenerateSurvey from './RenderSurvey.jsx';
import SurveyResults from './SurveyResults.jsx'
import NoMatch from './ErrorPage.jsx'

const Main = (props) => {
    const { isFetching,
        isAuthorized,
        isRegistered,
        loggedInAs,
        userData,
        surveyData,
        currentPage,
        redirect,
        redirectPath,
        handleRegisteredClick,
        handleLogInClick,
        handleChangePage,
        handleCreateUserClick,
        handleLoadUserData,
        handleLoadSurveyData,
        handleDeleteUserData,
        handleEditUserData,
        handleDeleteSurveyData,
        handleEditSurveyData,
        handleDeleteTemplate,
        handleUpdateSurvey,
        handleCreateSurvey,
        handleLoadUser} = props;

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
                        handleLoadUserData = {handleLoadUserData}
                        handleDeleteUserData = {handleDeleteUserData}
                        handleEditUserData = {handleEditUserData}
                        currentPage = {currentPage}
                        loggedInAs = {loggedInAs}
                        userData = {userData}
                        isFetching = {isFetching}
                    />
                )
            )}/>
            <Route path='/surveys' render={() => (
                !isAuthorized ? (
                    <Redirect to='/'/>
                ) : (
                    <Surveys
                        handleChangePage = {handleChangePage}
                        handleLoadSurveyData = {handleLoadSurveyData}
                        handleDeleteSurveyData = {handleDeleteSurveyData}
                        handleEditSurveyData = {handleEditSurveyData}
                        currentPage = {currentPage}
                        loggedInAs = {loggedInAs}
                        surveyData = {surveyData}
                        isFetching = {isFetching}
                       />
                )
            )}/>
            <Route path='/templates' render={() => (
                !isAuthorized  || (loggedInAs.role === 'Пользователь') ? (
                    <Redirect to='/'/>
                ) : (
                    <Templates
                        handleChangePage = {handleChangePage}
                        handleLoadSurveyData = {handleLoadSurveyData}
                        handleDeleteTemplate = {handleDeleteTemplate}
                        currentPage = {currentPage}
                        surveyData = {surveyData}
                        isFetching = {isFetching}
                    />
                )
            )}/>
            <Route exact path='/new_survey'
                   render={(props) => (
                       !isAuthorized ? (
                           <Redirect to='/'/>
                       ) : (
                           <NewSurvey push to='/new_survey'
                                       handleChangePage = {handleChangePage}
                                       handleCreateSurvey = {handleCreateSurvey}
                                       redirect = {redirect}
                                       redirectPath = {redirectPath}
                                       currentPage = {'/new_survey'}
                           />
                       )
                   )}
            />
            <Route exact path='/new' render={() => (
                !isAuthorized  || (loggedInAs.role === 'Пользователь') ? (
                    <Redirect to='/'/>
                ) : (
                    <Redirect push to='/new_survey'/>
                )
            )}/>
            <Route path='/new_survey/:link'
                   render={(props) => (
                       !isAuthorized ? (
                           <Redirect to='/'/>
                       ) : (
                           <NewSurvey {...props}
                                      handleCreateSurvey = {handleCreateSurvey}
                                      handleUpdateSurvey = {handleUpdateSurvey}
                                      handleChangePage = {handleChangePage}
                                      redirect = {redirect}
                                      redirectPath = {redirectPath}
                                      currentPage={'/new_survey/:link'}
                           />
                       )
                   )}
            />
            <Route path='/survey/:link/results'
                   render={(props) => (
                       !isAuthorized ? (
                           <Redirect to='/'/>
                       ) : (
                           <SurveyResults {...props}
                                          currentPage={currentPage}
                                          handleChangePage = {handleChangePage}
                           />
                       )
                   )}
            />
            <Route path='/survey/:link'
                   render={(props) => (
                       !isAuthorized ? (
                           <Redirect to='/'/>
                       ) : (
                           <GenerateSurvey {...props}
                                           currentPage={currentPage}
                                           handleLoadUser = {handleLoadUser}
                                           handleChangePage = {handleChangePage}
                                           redirect = {redirect}
                                           redirectPath = {redirectPath}
                                           loggedInAs = {loggedInAs}
                           />
                       )
                   )}
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
};

export default Main;