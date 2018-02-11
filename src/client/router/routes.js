import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, Footer } from '../components/common';

import { Pages } from './';

export const routes = () =>
    <div className="app">
        <Header isLoggedIn={ true } />

        <div className="container-fluid" id="main-container">
            <Switch>
                <Route exact path="/" component={ Pages.Home } />
                <Route exact path="/home" component={ Pages.Home } />
                <Route exact path="/music/:musicId" component={ Pages.IndividualMusic } />
            </Switch>
        </div>

        <Footer/>
    </div>;
