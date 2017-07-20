import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Login_Register from './Login_Register.jsx';
import About from './About.jsx';
import Users from './Users.jsx';
import NoMatch from './ErrorPage.jsx'

export default class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/'
                       component={() => <Login_Register
                           isRegistered={this.props.isRegistered}
                           isAuthorized={this.props.isAuthorized}
                           handleChangeStateClick = {this.props.handleChangeStateClick}
                           handleLogInClick = {this.props.handleLogInClick}
                       />}
                />
                <Route path='/users' component={Users}/>
                <Route path='/about' component={About}/>
                <Route component={() => <NoMatch
                        isAuthorized={this.props.isAuthorized}
                    />}
                />
            </Switch>
        )
    }
}
