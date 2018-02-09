import { requestHelpers } from '../helpers';

export const GET_ACCOUNT_MUSIC_REQUEST = 'GET_ACCOUNT_MUSIC_REQUEST';
export const GET_ACCOUNT_MUSIC = 'GET_ACCOUNT_MUSIC';
export const GET_ACCOUNT_MUSIC_ERROR = 'GET_ACCOUNT_MUSIC_ERROR';

export function getAccountMusic( accountId ) {
    return dispatch => {
        dispatch( {
            type: GET_ACCOUNT_MUSIC_REQUEST,
            isFetching: true,
            error: false,
        } );

        requestHelpers
            .getRequest( false, `/music/${ accountId }/all`, { limit: 24 } )
            .then( ( result ) => {
                dispatch( {
                    type: GET_ACCOUNT_MUSIC,
                    payload: result.data,
                    isFetching: false,
                    error: false,
                } )
            } )
            .catch( ( error ) => {
                dispatch( {
                    type: GET_ACCOUNT_MUSIC_ERROR,
                    isFetching: false,
                    error: error,
                } )
            } )
    }
}