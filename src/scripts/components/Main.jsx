import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginRegister from './LoginRegister.jsx';
import About from './About.jsx';
import Users from './Users.jsx';
import Surveys from './Surveys.jsx';
import Templates from './Templates.jsx';
import NewSurvey from './NewSurvey.jsx';
import NoMatch from './ErrorPage.jsx'

export default class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/'
                       component={() => <LoginRegister
                           isRegistered={this.props.isRegistered}
                           isAuthorized={this.props.isAuthorized}
                           handleNotRegisteredClick = {this.props.handleNotRegisteredClick}
                           handleLogInClick = {this.props.handleLogInClick}
                           handleLogOutClick = {this.props.handleLogOutClick}
                           handleChangePage = {this.props.handleChangePage}
                           currentPage = {this.props.currentPage}
                       />}

                />
                <Route path='/about' component={() => <About
                        isAuthorized={this.props.isAuthorized}
                        handleChangePage = {this.props.handleChangePage}
                        currentPage = {this.props.currentPage}
                    />}
                />
                <Route path="/users" render={() => (
                        !this.props.isAuthorized ? (
                            <Redirect to="/"/>
                        ) : (
                            <Users
                                handleChangePage = {this.props.handleChangePage}
                                currentPage = {this.props.currentPage}
                            />
                        )
                )}/>
                <Route path="/surveys" render={() => (
                    !this.props.isAuthorized ? (
                        <Redirect to="/"/>
                    ) : (
                        <Surveys
                            handleChangePage = {this.props.handleChangePage}
                            currentPage = {this.props.currentPage}
                        />
                    )
                )}/>
                <Route path="/templates" render={() => (
                    !this.props.isAuthorized ? (
                        <Redirect to="/"/>
                    ) : (
                        <Templates
                            handleChangePage = {this.props.handleChangePage}
                            currentPage = {this.props.currentPage}
                        />
                    )
                )}/>
                <Route path="/new_survey" render={() => (
                    !this.props.isAuthorized ? (
                        <Redirect to="/"/>
                    ) : (
                        <NewSurvey
                            handleChangePage = {this.props.handleChangePage}
                            currentPage = {this.props.currentPage}
                        />
                    )
                )}/>
                <Route component={() => <NoMatch
                        isRegistered={this.props.isRegistered}
                        isAuthorized={this.props.isAuthorized}
                        handleChangePage = {this.props.handleChangePage}
                        currentPage = {this.props.currentPage}
                    />}
                />
            </Switch>
        )
    }
}