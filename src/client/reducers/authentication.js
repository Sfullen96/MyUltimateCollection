import { authActions as actions } from '../actions';

export const authentication = ( state = {}, action ) => {
    const newState = { ...state };

    switch( action.type ) {
        case actions.LOGIN_ATTEMPT: return userLoginAttempt( newState, action );
        case actions.LOGIN_ATTEMPT_REQUEST: return userLoginAttempt( newState, action );
        case actions.LOGIN_ATTEMPT_ERROR: return userLoginAttempt( newState, action );
        case actions.LOGOUT_ACCOUNT: return logoutAccount( newState, action );
        case actions.LOGOUT_ACCOUNT_REQUEST: return logoutAccount( newState, action );
        case actions.LOGOUT_ACCOUNT_ERROR: return logoutAccount( newState, action );
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

function logoutAccount( newState, action ) {
    newState.isRequesting = action.isRequesting;

    if ( action.type === "LOGOUT_ACCOUNT" ) {
        delete newState.logoutError;
    }

    if ( action.type === "LOGOUT_ACCOUNT_ERROR" ) {
        newState.logoutError = action.error;
    }

    return newState;
}