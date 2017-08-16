import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateQuestions} from '../actions/actionCreators';
import RenderApp from '../components/RenderApp.jsx';

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default
connect(mapStateToProps, mapDispatchToProps)(RenderApp)
