import { combineReducers } from 'redux';
import { SEND_MESSAGE } from './types';

const initialState = {
    message: ''
};

function message(state = initialState, { type, payload }) {
    switch (type) {
        case SEND_MESSAGE:
            return {
                ...state,
                message: payload.message
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    message
});

export default rootReducer;
