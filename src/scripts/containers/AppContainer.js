import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logIn, createUser } from '../actions/actions';
import { toggleRegistered, updateCurrentPage } from '../actions/actionCreators';
import App from '../components/App.jsx';

const mapStateToProps = (state) => {
    return {
        isAuthorized: state.renderApp.isAuthorized,
        loggedInAs: state.renderApp.loggedInAs,
        isRegistered: state.renderApp.isRegistered,
        currentPage: state.renderApp.currentPage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogInClick:
            bindActionCreators(logIn, dispatch),
        handleCreateUserClick:
            bindActionCreators(createUser, dispatch),
        handleRegisteredClick:
            bindActionCreators(toggleRegistered, dispatch),
        handleUpdatePage:
            bindActionCreators(updateCurrentPage, dispatch)
    }
};

export default
connect(mapStateToProps, mapDispatchToProps)(App)
