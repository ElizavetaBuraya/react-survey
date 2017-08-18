import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from './LoginRegisterForm.jsx'

export default class LoginRegister extends React.Component {
    componentDidMount() {
        if (this.props.currentPage !== '/')
        {
            this.props.handleChangePage('/');
        }
    }

    render() {
        const isAuthorized = this.props.isAuthorized;
        const isRegistered = this.props.isRegistered;
        const userRole = (this.props.loggedInAs) ? this.props.loggedInAs.role : null;

        if (isAuthorized) {
            if (userRole === 'Администратор') {
                return (
                    <Redirect to="/surveys"/>
                )
            } else {
                return (
                    <Redirect to="/about"/>
                )
            }
        }

        return (
            <main className='d-flex flex-row justify-content-center align-items-center'>
                <Form onSubmit={(isRegistered) ? this.props.handleLogInClick : this.props.handleCreateUserClick}
                      isRegistered = {this.props.isRegistered}
                      handleNotRegisteredClick = {this.props.handleNotRegisteredClick}
                />
            </main>
        )
    }
}

