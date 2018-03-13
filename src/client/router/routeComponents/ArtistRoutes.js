import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthenticatedRoute } from "../AuthenticatedRoute";
import { Pages } from "../";

export const ArtistRoutes = ( props ) =>
    <Switch>
        <AuthenticatedRoute exact path={ props.match.url } component={ Pages.Music } />
        <AuthenticatedRoute exact path={ `${ props.match.url }/:artistId` } component={ Pages.IndividualArtist } />
        <Route component={ Pages.NotFound } />
    </Switch>;
