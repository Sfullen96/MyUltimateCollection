import React from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

const renderPages = ( pageCount, currentPage, history, totalPages, location ) => {
    const _return = [];
    let startPage, endPage;
    if ( totalPages <= 10 ) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if ( currentPage <= 6 ) {
            startPage = 1;
            endPage = 10;
        } else if ( currentPage + 4 >= totalPages ) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }

    for ( let i = startPage; i <= endPage; i++ ) {
        _return.push( <li key={ i } className={ i === parseInt( currentPage, 10 ) ? "active" : "" } ><a onClick={ () => paginationClick( currentPage, totalPages, parseInt( i, 10 ), history, location ) }>{ i }</a></li> );
    }

    return _return;
};

function paginationClick( currentPage, totalPages, target = null, history, location ) {
    let nextPage = null;
    const parsed = location.search ? queryString.parse( location.search ) : null;

    if ( typeof target === "string" ) { // Means it's previous, next, last or first
        switch( target ) {
            case "next":
                nextPage = ( currentPage + 1 ) <= totalPages ? currentPage + 1 : totalPages;
                break;
            case "previous":
                nextPage = ( currentPage > 1 ) ? currentPage - 1 : 1;
                break;
            case "last":
                nextPage = parseInt( totalPages, 10 );
                break;
            case "first":
                nextPage = 1;
                break;
            default:
                break;
        }
    } else {
        nextPage = target;
    }

    let url = `${ location.pathname }?page=${ nextPage }`;

    if ( parsed ) {
        Object.keys( parsed )
            .forEach( ( e ) => {
                console.log( "e", e );
                if ( e === "page" ) {
                    return;
                }

                url += `&${ e }=${ parsed[ e ] }`;
            } )
    }

    return history.push( url );
}

const Pagination = ( props ) => {
    const { currentPage, totalPages, totalRows, displayPages, location, history, resultsPerPage } = props;
    
    return(
        <div className="container-fluid text-center">
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li>
                        <a onClick={ () => paginationClick( currentPage, totalPages, "first", history, location ) } aria-label="First">
                            <span aria-hidden="true"><i className="fa fa-angle-double-left"></i></span>
                        </a>
                        <a onClick={ () => paginationClick( currentPage, totalPages, "previous", history, location ) } aria-label="Previous">
                            <span aria-hidden="true"><i className="fa fa-angle-left"></i></span>
                        </a>
                    </li>
                    {
                        renderPages( displayPages <= totalPages ? displayPages : totalPages, currentPage, history, totalPages, location )
                    }
                    <li>
                        {/*{ `${ match.path }${ location.search ? ( location.search.includes( "page=" ) ? location.search : "" ) + "&page" : "?page" }=${ ( currentPage + 1 <= totalPages ? currentPage + 1 : totalPages ) }` }*/}
                        <a onClick={ () => paginationClick( currentPage, totalPages, "next", history, location ) } aria-label="Next">
                            <span aria-hidden="true"><i className="fa fa-angle-right"></i></span>
                        </a>
                        <a onClick={ () => paginationClick( currentPage, totalPages, "last", history, location ) } aria-label="Last">
                            <span aria-hidden="true"><i className="fa fa-angle-double-right"></i></span>
                        </a>
                    </li>
                </ul>
                <p>
                    {
                        `Showing
                        ${ ( resultsPerPage * currentPage ) - ( resultsPerPage ) + 1 }
                        - ${ ( resultsPerPage * currentPage ) <= totalRows ? ( resultsPerPage * currentPage ) : totalRows }
                        of
                        ${ totalRows < ( resultsPerPage * currentPage ) ? totalRows : ( resultsPerPage * currentPage ) }
                        | Page ${ currentPage }/${ totalPages }
                        `
                    }
                </p>
            </nav>
        </div>
    );
};

export default withRouter( Pagination );