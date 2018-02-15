import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, Footer } from '../components/common';
import { AuthCheck } from "./";
import {
    MusicRoutes as Music,
    CommonRoutes as Common,
} from "./routeComponents";
import { Pages } from './';

export const routes = () =>
    <div className="app">
        <Header isLoggedIn={ true } />

        <div className="container-fluid" id="main-container">
            <Switch>
                <Route path="/music" render={ props => <Music { ...props } /> } />
                <Route render={ props => <Common { ...props } /> } />
            </Switch>
            {/*<Route render={ props => <AuthCheck { ...props } /> } />*/}

            {/*<Switch>*/}
                {/*<Route exact path="/" component={ Pages.Home } />*/}
                {/*<Route exact path="/home" component={ Pages.Home } />*/}
                {/*/!*<Route exact path="/music/:musicId" component={ Pages.IndividualMusic } />*!/*/}
            {/*</Switch>*/}
        </div>

        <Footer/>
    </div>;
