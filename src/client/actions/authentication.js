import { requestHelpers } from '../helpers';

export const LOGIN_ATTEMPT_REQUEST = "LOGIN_ATTEMPT_REQUEST";
export const LOGIN_ATTEMPT = "LOGIN_ATTEMPT";
export const LOGIN_ATTEMPT_ERROR = "LOGIN_ATTEMPT_ERROR";

export function loginAccountAttempt( usernameOrEmail, password ) {
    return ( ( dispatch ) => {
        return new Promise( ( resolve, reject ) => {
            dispatch( {
                type: LOGIN_ATTEMPT_REQUEST,
                isFetching: true,
                error: false,
            } );

            let localStorage = {};

            requestHelpers
                .postRequest( false, `/authentication/token`, { email_address: usernameOrEmail, password } )
                .then( ( response ) => {
                    localStorage = {
                        token: response.data.token,
                        account_id: response.data.id,
                    };

                    return dispatch( {
                        type: LOGIN_ATTEMPT,
                        isFetching: false,
                        error: false,
                        payload: response.data,
                    } );
                } )
                .catch( ( error ) => {
                    dispatch( {
                        type: LOGIN_ATTEMPT_ERROR,
                        error: error,
                        isFetching: false,
                    } );
                    return reject( error );
                } )
                .then( () => {
                    return resolve( localStorage );
                } );
        } );
    } );
}