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
            .getRequest( true, `/music/${ musicId }` )
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
                .postRequest( true, `/music/${ musicId }`, null, "DELETE" )
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

export const ADD_NEW_MUSIC_REQUEST = "ADD_NEW_MUSIC_REQUEST";
export const ADD_NEW_MUSIC = "ADD_NEW_MUSIC";
export const ADD_NEW_MUSIC_ERROR = "ADD_NEW_MUSIC_ERROR";

export function createNewMusic( music ) {
    return dispatch => {
        return new Promise( ( resolve, reject ) => {
            dispatch( {
                type: ADD_NEW_MUSIC_REQUEST,
                isRequesting: true,
                error: false,
            } );

            const _music = { ...music };

            delete _music.artist;
            delete _music.format_id;

            _music.artists = music.artist.map( ( a ) => { return a.id } );
            _music.format_id = music.format_id.id;

            console.log( "_MUSIC", _music );

            requestHelpers
                .postRequest( true, "/music/create", { ..._music } )
                .then( ( response ) => {
                    dispatch( {
                        type: ADD_NEW_MUSIC,
                        isRequesting: false,
                        error: false,
                        payload: response,
                    } );

                    return resolve( response );
                } )
                .catch( ( error ) => {
                    dispatch( {
                        type: ADD_NEW_MUSIC_ERROR,
                        isRequesting: false,
                        error,
                    } );

                    return reject( error );
                } )
        } );
    }
}

export const GET_MUSIC_FORMATS_REQUEST = "GET_MUSIC_FORMATS_REQUEST";
export const GET_MUSIC_FORMATS = "GET_MUSIC_FORMATS";
export const GET_MUSIC_FORMATS_ERROR = "GET_MUSIC_FORMATS_ERROR";

export function getMusicFormats() {
    return dispatch => {
        return new Promise( ( resolve, reject ) => {
            dispatch( {
                type: GET_MUSIC_FORMATS_REQUEST,
                isFetching: true,
                error: false,
            } );

            requestHelpers
                .getRequest( true, "/music/formats" )
                .then( ( response ) => {
                    dispatch( {
                        type: GET_MUSIC_FORMATS,
                        isFetching: false,
                        error: false,
                        payload: response.data,
                    } );
                    return resolve( response );
                } )
                .catch( ( error ) => {
                    dispatch( {
                        type: GET_MUSIC_FORMATS_ERROR,
                        isRequesting: false,
                        error,
                    } );

                    return reject( error );
                } );
        } );
    }
}

export const GET_LAST_FM_INFO_REQUEST = "GET_LAST_FM_INFO_REQUEST";
export const GET_LAST_FM_INFO = "GET_LAST_FM_INFO";
export const GET_LAST_FM_INFO_ERROR = "GET_LAST_FM_INFO_ERROR";

export function getLastFmInfo( musicTitle, artistId, musicId ) {
    return dispatch => {
        return new Promise( ( resolve, reject ) => {
            dispatch( {
                type: GET_LAST_FM_INFO_REQUEST,
                isRequesting: true,
                error: false,
            } );

            let params = {};

            if ( musicTitle ) {
                params.album_title = musicTitle;
            }

            if ( musicId ) {
                params.album_id = musicId;
            }

            if ( artistId ) {
                params.album_artist_id = artistId;
            }

            requestHelpers
                .getRequest( false, "/last-fm/album/get-info", params )
                .then( ( response ) => {
                    dispatch( {
                        type: GET_LAST_FM_INFO,
                        isRequesting: false,
                        error: false,
                        payload: response,
                    } );

                    return resolve( response );
                } )
                .catch( ( error ) => {
                    dispatch( {
                        type: GET_LAST_FM_INFO_ERROR,
                        isRequesting: false,
                        error,
                    } );

                    return reject( error );
                } )
        } );
    }
}