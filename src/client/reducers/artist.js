import { artistActions as actions } from "../actions";

export const artist = ( state = {}, action ) => {
    const newState = { ...state };

    switch( action.type ) {
        case actions.GET_ARTIST_REQUEST: return setArtistRequest( newState, action );
        case actions.GET_ARTIST: return setArtist( newState, action );
        case actions.GET_ARTIST_ERROR: return setArtistError( newState, action );
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