import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, Footer } from '../components/common';

import { CommonPages } from './';

export const routes = () =>
    <div className="app">
        <Header isLoggedIn={ true } />

        <div className="container-fluid" id="main-container">
            <Switch>
                <Route exact path="/" component={ CommonPages.Home } />
                <Route component={ CommonPages.NotFound } />
            </Switch>
        </div>

        <Footer/>
    </div>;
