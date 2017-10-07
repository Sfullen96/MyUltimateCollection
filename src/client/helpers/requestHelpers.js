import queryString from "query-string";
import urlEncode from "form-urlencoded";
import { remoteConfig } from "../../config/config";

export function getRequest( authenticated = false, url, params ) {
    return new Promise( ( resolve, reject ) => {
        let constructedUrl = `${ remoteConfig.urls.api }${ url }`;
        if ( params ) {
            constructedUrl += `?${ queryString.stringify( params ) }`;
        }
        
        const headers = { "Referrer": window.location.href };

        if( authenticated ) {
            headers.Authorization = `JWT ${ localStorage.getItem( "token" ) }`;
        }

        fetch( constructedUrl, { headers: headers } )
            .then( response => {
                if ( !response.ok ) {
                    if( response.status === 401 ) {
                        localStorage.unauthorized = 1;
                        localStorage.removeItem('token');
                        localStorage.removeItem('permissions');
                    }
                    return reject( response );
                }
                return response.json();
            } )
            .then( response => resolve( response ) );
    } );
}

export function postRequest( authenticated = false, url, body, method = "POST", encoding = "URL" ) {
    return new Promise( ( resolve, reject ) => {
        const constructedUrl = `${ remoteConfig.urls.api }${ url }`;

        const headers = { "Referrer": window.location.href };

        if( authenticated ) {
            headers.Authorization = `JWT ${ localStorage.getItem( "token" ) }`;
        }

        if ( encoding === "URL" ) {
            headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        fetch( constructedUrl,
            {
                method,
                headers: headers,
                body: encoding === "URL" ? urlEncode( body ) : body,
            } )
            .then( ( response ) => {
                if ( !response.ok ) {
                    if( response.status === 401 ) {
                        localStorage.unauthorized = 1;
                        localStorage.removeItem('token');
                        localStorage.removeItem('permissions');
                    }
                    return reject( response );
                }
                return response.json();
            } )
            .then( response => resolve( response ) );
    } );
}

