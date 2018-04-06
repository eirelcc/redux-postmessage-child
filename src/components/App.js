import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { actionType } from 'redux-postmessage-middleware';

function App({ parentURL, message, onClick }) {
    return (
        <div className="App">
            <h1 className="App-title">IFRAME CONTENT</h1>
            <div>Parent: {parentURL}</div>
            <button onClick={onClick} style={{ width: 200, height: 50 }}>
                SEND MESSAGE
            </button>
            {!!message && <p>Sent message: {message}</p>}
        </div>
    );
}

function mapStateToProps(state, props) {
    // console.log(state);
    return {
        message: state.message.message
    };
}

const enhance = compose(
    connect(mapStateToProps),
    withProps(({ dispatch }) => ({
        onClick: () => {
            dispatch({
                type: actionType('SEND_MESSAGE'),
                payload: {
                    message: 'HELLO FROM IFRAME'
                }
            });
        }
    }))
);

export default enhance(App);
