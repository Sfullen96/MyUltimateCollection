import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import * as reducers from './reducers';

export const rootReducer = combineReducers( {
    authentication: reducers.authentication,
    search: reducers.search,
    account: reducers.account,
    music: reducers.music,
    artist: reducers.artist,
    form: reduxFormReducer,
} );
