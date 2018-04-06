import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducer from './reducers';
import { PARENT_URL as parentURL } from './constants';

import {
    createMessageDispatcherMiddleware,
    createMessageRecieverMiddleware
} from 'redux-postmessage-middleware';

const senderURL = window.location.href;

// create MessageDispatcherMiddleware for sending actions over postmessage
const MessageDispatcherMiddleware = createMessageDispatcherMiddleware({
    senderURL,
    parentURL,
    targetURLs: [parentURL, senderURL]
});

// create MessageReceiverMiddleware for recieving actions from postmessages
const MessageReceiverMiddleware = createMessageRecieverMiddleware({
    allowedURLs: [parentURL, senderURL]
});

// mount them on the Store
const middlewares = [MessageReceiverMiddleware, MessageDispatcherMiddleware];

const store = createStore(
    reducer,
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
