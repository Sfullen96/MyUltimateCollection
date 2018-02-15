import { authActions as actions } from '../actions';

export const authentication = ( state = {}, action ) => {
    const newState = { ...state };

    switch( action.type ) {
        case actions.LOGIN_ATTEMPT: return userLoginAttempt( newState, action );
        case actions.LOGIN_ATTEMPT_REQUEST: return userLoginAttempt( newState, action );
        case actions.LOGIN_ATTEMPT_ERROR: return userLoginAttempt( newState, action );
        default: return state;
    }
};

function userLoginAttempt( newState, action ) {
    newState.isFetching = action.isFetching;

    if ( action.type === "LOGIN_ATTEMPT" ) {
        const { id, token } = action.payload;

        delete newState.loginError;
        delete newState.errorCode;
        newState.account = { account_id: id, token };
    }

    if ( action.type === "LOGIN_ATTEMPT_ERROR" ) {
        console.log( "ERROR", action.error );
        newState.loginError = true;
        newState.errorCode = action.error.status;
    }

    return newState;
}
