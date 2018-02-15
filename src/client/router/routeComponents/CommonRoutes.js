import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthenticatedRoute } from "../AuthenticatedRoute";
import { Pages } from "../";

export const CommonRoutes = ( props ) =>
    <Switch>
        <AuthenticatedRoute exact path="/" component={ Pages.Music } />
        <AuthenticatedRoute exact path="/home" component={ Pages.Music } />
        <Route exact path="/login" component={ Pages.Login } />
        <Route component={ Pages.NotFound } />
    </Switch>;
