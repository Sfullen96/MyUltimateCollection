import { authActions as actions } from '../actions';

export const authentication = ( state = {}, action ) => {
    const newState = { ...state };

    switch( action.type ) {
        case actions.USER_LOGIN_ATTEMPT_REQUEST: return userLoginAttempt( newState, action );
        case actions.USER_LOGIN_ATTEMPT_SUCCESS: return userLoginAttempt( newState, action );
        case actions.USER_LOGIN_ATTEMPT_FAILURE: return userLoginAttempt( newState, action );
        default: return state;
    }
};

function userLoginAttempt( newState, action ) {
    newState.user = action.payload;

    return newState;
}