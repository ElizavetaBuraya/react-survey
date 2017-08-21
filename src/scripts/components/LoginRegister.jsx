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
        const { isAuthorized,
            isRegistered,
            handleRegisteredClick,
            handleLogInClick,
            handleCreateUserClick } = this.props;

        if (isAuthorized) {
            return (
                <Redirect to="/surveys"/>
            )
        }

        return (
            <main className='d-flex flex-row justify-content-center align-items-center'>
                <Form onSubmit={(isRegistered) ? handleLogInClick : handleCreateUserClick}
                      isRegistered = {isRegistered}
                      handleRegisteredClick = {handleRegisteredClick}
                />
            </main>
        )
    }
}

