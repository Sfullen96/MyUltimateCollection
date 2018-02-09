import { requestHelpers } from '../helpers';

export const HANDLE_SEARCH_TERM_CHANGE_REQUEST = 'HANDLE_SEARCH_TERM_CHANGE_REQUEST';
export const HANDLE_SEARCH_TERM_CHANGE_SUCCESS = 'HANDLE_SEARCH_TERM_CHANGE_SUCCESS';
export const HANDLE_SEARCH_TERM_CHANGE_ERROR = 'HANDLE_SEARCH_TERM_CHANGE_ERROR';

export function handleSearchTermChange( accountId, keyword ) {
    console.log( "HERERER", accountId, keyword );
    return dispatch => {
        dispatch( {
            type: HANDLE_SEARCH_TERM_CHANGE_REQUEST,
            isFetching: true,
            fetchError: false
        } );

        requestHelpers
            .getRequest( false, `/music/${ accountId }/all`, { keyword, limit: 30 } )
            .then( ( response ) => {
                return dispatch( {
                    type: HANDLE_SEARCH_TERM_CHANGE_SUCCESS,
                    payload: response.data,
                    isFetching: false,
                    fetchError: false,
                    results: response
                } )
            } )
            .catch( ( ex ) => {
                return dispatch( {
                    type: HANDLE_SEARCH_TERM_CHANGE_ERROR,
                    isFetching: false,
                    fetchError: ex,
                } )
            } );
    }
}
