import { requestHelpers } from '../helpers';

export const USER_LOGIN_ATTEMPT_REQUEST = 'USER_LOGIN_ATTEMPT_REQUEST';
export const USER_LOGIN_ATTEMPT_SUCCESS = 'USER_LOGIN_ATTEMPT_SUCCESS';
export const USER_LOGIN_ATTEMPT_FAILURE = 'USER_LOGIN_ATTEMPT_FAILURE';

export function userLoginAttempt( emailAddress, password ) {
    return dispatch => {
        console.log( "LOGIN REQUEST", emailAddress, password  );
        dispatch({
            type: USER_LOGIN_ATTEMPT_REQUEST,
            isFetching: true,
            hasErrored: false,
        })

        requestHelpers
            .postRequest( '/authentication/token', { email_address: emailAddress, password } )
            .then( response => {
                const localStorage = {};
                localStorage.token = response.data.token;
                localStorage.permissions = response.data.permissions;
                localStorage.email_address = response.data.email_address;

                dispatch({
                    type: USER_LOGIN_ATTEMPT_SUCCESS,
                    payload: response.data,
                    isFetching: false,
                    hasErrored: false,
                })
            } )
            .catch( error => {
                console.log( "Caught Error - User Login Attempt: ", error );
                dispatch({
                    type: USER_LOGIN_ATTEMPT_FAILURE,
                    isFetching: false,
                    hasErrored: error,
                })
            } );
    };
}