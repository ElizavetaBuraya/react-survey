import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logIn, createUser, getUserdata, getSurveydata } from '../actions/actions';
    getUserData,
    getSurveyData,
import { toggleRegistered, updateCurrentPage } from '../actions/actionCreators';
import App from '../components/App.jsx';

const mapStateToProps = (state) => {
    return {
        isFetching: state.renderApp.isFetching,
        isAuthorized: state.renderApp.isAuthorized,
        loggedInAs: state.renderApp.loggedInAs,
        isRegistered: state.renderApp.isRegistered,
        currentPage: state.renderApp.currentPage,
        userData: state.renderApp.userData,
        surveyData: state.renderApp.surveyData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogInClick:
            bindActionCreators(logIn, dispatch),
        handleCreateUserClick:
            bindActionCreators(createUser, dispatch),
        handleLoadUserData:
            bindActionCreators(getUserData, dispatch),
        handleLoadSurveyData:
            bindActionCreators(getSurveyData, dispatch),
        handleRegisteredClick:
            bindActionCreators(toggleRegistered, dispatch),
        handleUpdatePage:
            bindActionCreators(updateCurrentPage, dispatch)
    }
};

export default
connect(mapStateToProps, mapDispatchToProps)(App)
