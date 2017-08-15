import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generatePairs,
    updateHistory,
    updateTextAreaHeight,
    toggleCanGenerate } from '../actions/actionCreators';
import App from '../components/App';

const mapStateToProps = (state) => {
    return {
        pairs: state.renderApp.pairs,
        history: state.renderApp.history,
        textAreaHeight: state.renderApp.height,
        canGenerate: state.renderApp.canGenerate
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        generatePairsList:
            bindActionCreators(generatePairs, dispatch),
        renderHistory:
            bindActionCreators(updateHistory, dispatch),
        setTextAreaHeight:
            bindActionCreators(updateTextAreaHeight, dispatch),
        toggleGenerate:
            bindActionCreators(toggleCanGenerate, dispatch),
    }
};

export default
connect(mapStateToProps, mapDispatchToProps)(App)