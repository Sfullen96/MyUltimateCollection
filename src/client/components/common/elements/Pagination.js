import React from "react";
import { withRouter } from "react-router-dom";

const renderPages = ( pageCount, currentPage ) => {
    const _return = [];
    for ( let i = 1; i <= pageCount; i++ ) {
        _return.push( <li className={ i === parseInt( currentPage, 10 ) ? "active" : "" } ><a href="#">{ i }</a></li> );
    }

    return _return;
};

const Pagination = ( props ) => {
    const { currentPage, totalPages, totalRows, displayPages, match, location } = props;
    
    console.log( "PROPS", props );

    return(
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li>
                    <a href="#" aria-label="Previous">
                        <span aria-hidden="true"><i className="fa fa-angle-double-left"></i></span>
                    </a>
                    <a href="#" aria-label="Previous">
                        <span aria-hidden="true"><i className="fa fa-angle-left"></i></span>
                    </a>
                </li>
                {
                    renderPages( displayPages <= totalPages ? displayPages : totalPages, currentPage )
                }
                <li>
                    <a href={ `${ match.path }${ location.search ? ( location.search.includes( "page=" ) ? location.search : "" ) + "&page" : "?page" }=${ ( currentPage + 1 <= totalPages ? currentPage + 1 : totalPages ) }` } aria-label="Next">
                        <span aria-hidden="true"><i className="fa fa-angle-right"></i></span>
                    </a>
                    <a href="#" aria-label="Next">
                        <span aria-hidden="true"><i className="fa fa-angle-double-right"></i></span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default withRouter( Pagination );