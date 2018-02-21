import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HeaderSearch } from "./elements"
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
import { searchActions, authActions } from '../../actions';

class Header extends Component {
    constructor() {
        super();

        this.state = {
            showSearchPreview: false,
            loggedIn: localStorage.getItem( "token" ),
            hovering: false,
        }
    }

    onSearchResultClick = ( musicId ) => {
        this.setState( {
            hovering: false,
            showSearchPreview: false,
        } );

        this.props.history.push( `/music/${ musicId }` );
    };

    goToSearchResults( keyword ) {
        const { history, music } = this.props;

        this.setState( {
            hovering: false,
            showSearchPreview: false,
        } );

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

    handleChange = ( values ) => {
        if ( values.currentTarget.value ) {
            this.setState( {
                showSearchPreview: true,
            } );
            this.props.handleSearchTermChange( 1, values.currentTarget.value );
        } else {
            this.setState( {
                showSearchPreview: false,
            } );
        }
    };


    logoutAccount = () => {
        const { logoutAccount, history } = this.props;

        logoutAccount()
            .then( ( result ) => {
                if ( result.payload.success ) {
                    localStorage.clear();
                    localStorage.setItem( "unauthorized", 1 );

                    history.push( "/login" );

                    this.setState( { loggedIn: false } );
                }
            } );
    };

    onHover = () => {
        this.setState( {
            showSearchPreview: true,
            hovering: true,
        } );
    };

    onMouseOut = () => {
        this.setState( {
            hovering: false,
        } );
    };

    onBlur = () => {
        if ( !this.state.hovering ) {
            this.setState( {
                showSearchPreview: false,
            } );
        }
    };

    render() {
        const { loggedIn, showSearchPreview } = this.state;
        const { music } = this.props;

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
                                    <HeaderSearch
                                        onSubmit={ this.handleSearch }
                                        handleChange={ this.handleChange }
                                        music={ music }
                                        showSearchPreview={ showSearchPreview }
                                        onBlur={ this.onBlur }
                                        onHover={ this.onHover }
                                        onMouseOut={ this.onMouseOut }
                                        onSearchResultClick={ this.onSearchResultClick }
                                    />

                                    <ul className="nav navbar-nav navbar-right">
                                        <li className=""><Link to="/home">Home</Link></li>

                                        <li className=""><Link to="/add-music">Add Music</Link></li>
                                        <li className=""><Link to="/music">View Library</Link></li>
                                        {
                                            !loggedIn ?
                                                <li className=""><Link to="/login">Login</Link></li>
                                            :
                                                <li className=""><Link to="#" onClick={ this.logoutAccount } >Logout</Link></li>
                                        }
                                        {/*<li className="dropdown">*/}
                                            {/*<Link*/}
                                                {/*to=""*/}
                                                {/*className="dropdown-toggle"*/}
                                                {/*data-toggle="dropdown"*/}
                                                {/*role="button"*/}
                                                {/*aria-haspopup="true"*/}
                                                {/*aria-expanded="false"> Account <span className="caret"/>*/}
                                            {/*</Link>*/}
                                            {/*<ul className="dropdown-menu">*/}
                                                {/*<li><Link to="/manage-account">Manage Account</Link></li>*/}
                                                {/*<li><Link to="/logout"> Logout </Link></li>*/}
                                            {/*</ul>*/}
                                        {/*</li>*/}
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
    handleSearchTermChange: ( accountId, keyword ) => dispatch( searchActions.handleSearchTermChange( accountId, keyword ) ),
    logoutAccount: () => dispatch( authActions.logoutAccount() ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( withRouter( Header ) );
