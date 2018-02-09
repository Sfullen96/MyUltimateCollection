import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import { searchActions } from '../../../actions';

class HeaderSearch extends Component {
    constructor () {
        super();
        this.state = {
            fireRedirect: false
        }
    }

    handleSearch( a ) {

        this.props.handleSearchTermChange( 1, a.target.value );

        return <Redirect to="/home" />
    }

    goToSearchResults( event ) {
        event.preventDefault();

        this.setState( { fireRedirect: true } )
    }

    render() {
        const { searchTerm, music } = this.props;
        const { fireRedirect } = this.state;


        return (
            <form className="navbar-form navbar-left" method="POST" action="" onSubmit={ ( data ) => this.goToSearchResults( data ) }>
                <div className="row">
                    <div className="col-xs-12 col-sm-12">
                        <div className="form-group">
                            <Field
                                component="input"
                                type="text"
                                className="form-control margin-bottom"
                                name="keyword"
                                required
                                placeholder="Search..."
                                value={ searchTerm }
                                onChange={ ( data ) => this.handleSearch( data ) }
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-3">
                    </div>
                </div>
                { fireRedirect && (
                    <Redirect to={ '/search-results' } music={ music } />
                )}
            </form>
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

HeaderSearch = reduxForm( { form: "header_search_form" } )( HeaderSearch );

export default connect( mapStateToProps, mapDispatchToProps )( HeaderSearch );