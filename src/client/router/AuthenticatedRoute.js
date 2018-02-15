import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const checkAuth = () => {
    const token = localStorage.getItem( 'token' );
    if( !token ) return false;

    try {
        const { exp } = jwtDecode( token );

        if( exp < new Date().getTime() / 1000 ) return false;
    } catch( error ) {
        return false;
    }

    return true;
};

export const AuthenticatedRoute = ( { component: Component, ...rest } ) => (
    <Route { ...rest  } render={ props => checkAuth() ? <Component { ...props } /> : <Redirect to={ { pathname: '/login', state: { from: props.location } } } /> } />
);