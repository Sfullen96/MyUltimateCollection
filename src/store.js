import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './client/reducers';
import thunk from 'redux-thunk';

const enhancers = compose( window.devToolsExtension ? window.devToolsExtension() : f => f );

const defaultState = {
    account: {},
};

export const store = createStore(
    rootReducer,
    defaultState,
    compose( applyMiddleware( thunk ), enhancers )
);
