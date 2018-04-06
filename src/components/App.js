import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { actionType } from 'redux-postmessage-middleware';

function App({ onClick }) {
    return (
        <div className="App">
            <h1 className="App-title">IFRAME CONTENT</h1>
            <button onClick={onClick} style={{ width: 200, height: 50 }}>
                SEND MESSAGE
            </button>
        </div>
    );
}

function mapStateToProps(state, props) {
    // console.log(state);
    return {
        message: state.message
    };
}

const enhance = compose(
    connect(mapStateToProps),
    withProps(({ dispatch }) => ({
        onClick: () => {
            dispatch({
                type: actionType('SEND_MESSAGE'),
                data: {
                    message: 'HELLO FROM IFRAME'
                }
            });
        }
    }))
);

export default enhance(App);
