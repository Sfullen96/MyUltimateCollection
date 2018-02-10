import { searchActions as actions } from '../actions';

export const search = ( state = {}, action ) => {
    const newState = { ...state };

    switch( action.type ) {
        case actions.HANDLE_SEARCH_TERM_CHANGE_REQUEST: return handleSearch( newState, action );
        case actions.HANDLE_SEARCH_TERM_CHANGE_SUCCESS: return handleSearch( newState, action );
        case actions.HANDLE_SEARCH_TERM_CHANGE_ERROR: return handleSearch( newState, action );
        default: return state;
    }
};

function handleSearch( newState, action ) {
    newState.searchFetch = action.isFetching;
    newState.searchError = action.fetchError;

    if( action.type === 'HANDLE_SEARCH_TERM_CHANGE_SUCCESS' ) {
        delete newState.searchFetch;
        delete newState.searchError;

        newState.searchResults = action.payload.data;
        newState.searchTerm = action.payload.keyword;
    }

    return newState;
}