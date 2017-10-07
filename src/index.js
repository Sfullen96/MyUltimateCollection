import React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { App } from './App';

// Styles entry point
import './client/stylesheets/scss/index.scss';

const Main = () => render( <App />, document.getElementById( 'root' ) );

Main();
registerServiceWorker();
