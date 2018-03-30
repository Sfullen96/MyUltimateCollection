import { artistActions as actions } from "../actions";

export const artist = ( state = {}, action ) => {
    const newState = { ...state };

    switch( action.type ) {
        case actions.GET_ARTIST_REQUEST: return setArtistRequest( newState, action );
        case actions.GET_ARTIST: return setArtist( newState, action );
        case actions.GET_ARTIST_ERROR: return setArtistError( newState, action );
        case actions.GET_ALL_ARTISTS_REQUEST: return setAllArtistsRequest( newState, action );
        case actions.GET_ALL_ARTISTS: return setAllArtists( newState, action );
        case actions.GET_ALL_ARTISTS_ERROR: return setAllArtistsError( newState, action );
        default: return state;
    }
};

function setArtistRequest( newState, action ) {
    newState.isFetching = action.isFetching;
    newState.error = action.error;

    return newState;
}

function setArtist( newState, action ) {
    newState.isFetching = action.isFetching;
    newState.error = action.error;
    newState.artist = action.payload.data;

    return newState;
}

function setArtistError( newState, action ) {
    newState.isFetching = action.isFetching;
    newState.error = action.error;

    return newState;
}

function setAllArtistsRequest( newState, action ) {
    newState.isFetching = action.isFetching;
    newState.error = action.error;

    return newState;
}

function setAllArtists( newState, action ) {
    newState.isFetching = action.isFetching;
    newState.error = action.error;
    newState.artists = action.payload.data;

    return newState;
}

function setAllArtistsError( newState, action ) {
    newState.isFetching = action.isFetching;
    newState.error = action.error;

    return newState;
}