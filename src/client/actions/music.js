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

export const DELETE_MUSIC_REQUEST = "DELETE_MUSIC_REQUEST";
export const DELETE_MUSIC = "DELETE_MUSIC";
export const DELETE_MUSIC_ERROR = "DELETE_MUSIC_ERROR";

export function deleteMusic( musicId ) {
    return dispatch => {
        return new Promise( ( resolve, reject ) => {
            dispatch( {
                type: DELETE_MUSIC_REQUEST,
                isRequesting: true,
                error: false,
            } );

            requestHelpers
                .postRequest( `/music/${ musicId }`, {}, "DELETE" )
                .then( ( response ) => {
                    dispatch( {
                        type: DELETE_MUSIC,
                        isRequesting: false,
                        error: false,
                        payload: response,
                    } );

                    return resolve( response );
                } )
                .catch( ( error ) => {
                    dispatch( {
                        type: DELETE_MUSIC_ERROR,
                        isRequesting: false,
                        error,
                    } );

                    return reject( error );
                } )
        } );
    }
}