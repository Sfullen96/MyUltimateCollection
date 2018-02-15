import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HeaderSearch } from "./elements"
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
import { searchActions } from '../../actions';

class Header extends Component {
    goToSearchResults( keyword ) {
        const { history, music } = this.props;

        history.push( {
            pathname: '/',
            search: `?keyword=${ keyword }`,
            state: { music: music },
        } );
    }

    handleSearch = ( values ) => {
        this.props.handleSearchTermChange( 1, values.keyword );

        this.goToSearchResults( values.keyword );
    };

    render() {
        return (
            <header>
                <div className="container-fluid">
                    <div className="row">
                        <nav className="navbar navbar-inverse">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"/>
                                        <span className="icon-bar"/>
                                        <span className="icon-bar"/>
                                    </button>
                                </div>
                                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                    <HeaderSearch onSubmit={ this.handleSearch } />

                                    <ul className="nav navbar-nav navbar-right">
                                        <li className=""><Link to="/music">Home</Link></li>

                                        <li className=""><Link to="/add-cd">Add to Library</Link></li>
                                        <li className=""><Link to="/library">View Library</Link></li>
                                        {
                                            localStorage.getItem( 'unauthorized' ) === 1 ?
                                                <li className=""><Link to="/login">Login</Link></li>
                                            :
                                                <li className=""><Link to="/logout">Logout</Link></li>
                                        }
                                        <li className="dropdown">
                                            <Link
                                                to=""
                                                className="dropdown-toggle"
                                                data-toggle="dropdown"
                                                role="button"
                                                aria-haspopup="true"
                                                aria-expanded="false"> Account <span className="caret"/>
                                            </Link>
                                            <ul className="dropdown-menu">
                                                <li><Link to="/manage-account">Manage Account</Link></li>
                                                <li><Link to="/logout"> Logout </Link></li>
                                            </ul>
                                        </li>
                                        <li className="dropdown">
                                            <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> Admin <span className="caret"/></Link>
                                            <ul className="dropdown-menu">
                                                <li><Link to="/admin/view-accounts"> View Accounts </Link></li>
                                                <li><Link to="/admin/manage-library"> Manage Library </Link></li>
                                                <li><Link to="/admin/manage-artists"> Manage Artists </Link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}


const mapStateToProps = ( state ) => ( {
    searchTerm: state.searchTerm,
    music: state.search.searchResults,
} );

const mapDispatchToProps = ( dispatch ) => ( {
    handleSearchTermChange: ( accountId, keyword ) => dispatch( searchActions.handleSearchTermChange( accountId, keyword ) )
} );

export default connect( mapStateToProps, mapDispatchToProps )( withRouter( Header ) );
