import { requestHelpers } from '../helpers';

export const GET_ARTIST_REQUEST = "GET_ARTIST_REQUEST";
export const GET_ARTIST = "GET_ARTIST";
export const GET_ARTIST_ERROR = "GET_ARTIST_ERROR";

export function getArtist( artistId ) {
    return dispatch => {
        return new Promise( ( resolve, reject ) => {
            dispatch( {
                type: GET_ARTIST_REQUEST,
                isRequesting: true,
                error: false,
            } );

            requestHelpers
                .getRequest( true, `/artist/${ artistId }` )
                .then( ( response ) => {
                    dispatch( {
                        type: GET_ARTIST,
                        isRequesting: false,
                        error: false,
                        payload: response,
                    } );

                    return resolve( response );
                } )
                .catch( ( error ) => {
                    dispatch( {
                        type: GET_ARTIST_ERROR,
                        isRequesting: false,
                        error,
                    } );

                    return reject( error );
                } )
        } );
    }
}