import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateQuestions} from '../actions/actionCreators';
import RenderApp from '../components/RenderApp.jsx';

const mapStateToProps = (state) => {
    return {
        questions_list: state.renderApp.questions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        generateQuestionsList:
            bindActionCreators(generateQuestions, dispatch),
    }
};

export default
connect(mapStateToProps, mapDispatchToProps)(RenderApp)
