import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
// import * as reducers from '../reducers';

const app = combineReducers( {
    // Redux Form reducer
    form: reduxFormReducer,
} );

export const rootReducer = ( state, action ) => {
    if( action.type === 'ACCOUNT_LOGOUT_SUCCESS' ) {
        state = {};
    }

    return app( state, action );
};
