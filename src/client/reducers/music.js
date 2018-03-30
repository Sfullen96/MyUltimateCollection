import { musicActions as actions } from '../actions';

export const music = ( state = {}, action ) => {
    const newState = { ...state };

    switch( action.type ) {
        case actions.GET_MUSIC_INFORMATION_REQUEST: return setIndividualMusicRequest( newState, action );
        case actions.GET_MUSIC_INFORMATION: return setIndividualMusic( newState, action );
        case actions.GET_MUSIC_INFORMATION_ERROR: return setIndividualMusicError( newState, action );
        case actions.DELETE_MUSIC: return setDeletedMusic( newState, action );
        case actions.DELETE_MUSIC_REQUEST: return setDeletedMusicRequest( newState, action );
        case actions.DELETE_MUSIC_ERROR: return setDeletedMusicError( newState, action );
        case actions.GET_MUSIC_FORMATS_REQUEST: return setMusicFormatsRequest( newState, action );
        case actions.GET_MUSIC_FORMATS: return setMusicFormats( newState, action );
        case actions.GET_MUSIC_FORMATS_ERROR: return setMusicFormatsError( newState, action );
        default: return state;
    }
};

function setIndividualMusicRequest( newState, action ) {
    newState.musicFetch = action.isFetching;

    return newState;
}

function setIndividualMusic( newState, action ) {
    newState.music = action.payload;

    return newState;
}

function setIndividualMusicError( newState, action ) {
    newState.music = action.payload;

    return newState;
}

function setDeletedMusic( newState, action ) {
    newState.deletedMusic = action.payload.success;

    return newState;
}

function setDeletedMusicRequest( newState, action ) {
    newState.deletingMusic = action.isRequesting;

    return newState;
}

function setDeletedMusicError( newState, action ) {
    newState.deleteMusicError = action.error;

    return newState;
}

function setMusicFormatsRequest( newState, action ) {
    newState.musicFormatFetch = action.isFetching;

    return newState;
}

function setMusicFormats( newState, action ) {
    newState.formats = action.payload;

    return newState;
}

function setMusicFormatsError( newState, action ) {
    newState.musicFormatError = action.error;

    return newState;
}