import { accountActions as actions } from '../actions';

export const account = ( state = {}, action ) => {
    const newState = { ...state };

    switch( action.type ) {
        case actions.GET_ACCOUNT_MUSIC_REQUEST: return setAccountMusicRequest( newState, action );
        case actions.GET_ACCOUNT_MUSIC: return setAccountMusic( newState, action );
        case actions.GET_ACCOUNT_MUSIC_ERROR: return setAccountError( newState, action );
        default: return state;
    }
};

function setAccountMusicRequest( newState, action ) {
    newState.musicFetch = action.isFetching;

    return newState;
}

function setAccountMusic( newState, action ) {
    newState.music = action.payload;

    return newState;
}

function setAccountError( newState, action ) {
    newState.musicFetchError = action.error;

    return newState;
}