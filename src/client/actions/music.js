import { requestHelpers } from '../helpers';

export const GET_MUSIC_INFORMATION_REQUEST = 'GET_MUSIC_INFORMATION_REQUEST';
export const GET_MUSIC_INFORMATION = 'GET_MUSIC_INFORMATION';
export const GET_MUSIC_INFORMATION_ERROR = 'GET_MUSIC_INFORMATION_ERROR';

export function getMusicInformation( musicId ) {
    return dispatch => {
        dispatch( {
            type: GET_MUSIC_INFORMATION_REQUEST,
            isFetching: true,
            error: false,
        } );

        requestHelpers
            .getRequest( false, `/music/${ musicId }` )
            .then( ( result ) => {
                dispatch( {
                    type: GET_MUSIC_INFORMATION,
                    payload: result.data,
                    isFetching: false,
                    error: false,
                } )
            } )
            .catch( ( error ) => {
                dispatch( {
                    type: GET_MUSIC_INFORMATION_ERROR,
                    isFetching: false,
                    error: error,
                } )
            } )
    }
}
