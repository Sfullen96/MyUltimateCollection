import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { routes } from './client/router';

export const App = () =>
    <Provider store={ store }>
        <BrowserRouter children={ routes() } />
    </Provider>;
