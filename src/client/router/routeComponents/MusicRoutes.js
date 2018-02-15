import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthenticatedRoute } from "../AuthenticatedRoute";
import { Pages } from "../";

export const MusicRoutes = ( props ) =>
    <Switch>
        <AuthenticatedRoute exact path={ props.match.url } component={ Pages.Music } />
        <AuthenticatedRoute exact path={ `${ props.match.url }/:musicId` } component={ Pages.IndividualMusic } />
        <Route component={ Pages.NotFound } />
    </Switch>;
