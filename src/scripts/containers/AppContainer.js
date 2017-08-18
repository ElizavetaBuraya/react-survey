import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logIn, toggleRegistered, updateCurrentPage } from '../actions/actionCreators';
import RenderApp from '../components/RenderApp.jsx';

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
        handleLogInOutClick:
            bindActionCreators(logIn, dispatch),
        handleRegisteredClick:
            bindActionCreators(toggleRegistered, dispatch),
        handleUpdatePage:
            bindActionCreators(updateCurrentPage, dispatch)
    }
};

export default
connect(mapStateToProps, mapDispatchToProps)(RenderApp)
