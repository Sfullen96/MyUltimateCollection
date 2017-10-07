import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './client/reducers';
import thunk from 'redux-thunk';

const defaultState = {};

const enhancers = compose( window.devToolsExtension ? window.devToolsExtension() : f => f );

export const store = createStore(
    rootReducer,
    defaultState,
    compose( applyMiddleware( thunk ), enhancers )
);
