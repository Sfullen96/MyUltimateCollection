import React, { Component } from "react";
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";
import { LoginForm } from "./";
import { authActions as actions } from "../../../actions";

class Login extends Component {
    errorCode = code => {
        switch( code ) {
            case 400: return this.showErrorMessage( "Oops! Something went wrong. Please try again or get in touch if the problem continues." );
            case 401: return this.showErrorMessage( "The password you entered is incorrect. Please try again or get in touch if the problem continues." );
            case 403: return this.showErrorMessage( "The password you entered is incorrect." );
            case 404: return this.showErrorMessage( "The email you entered is incorrect. Please try again or get in touch if the problem continues." );
            default: return null;
        }
    };

    componentWillReceiveProps( nextProps ) {
        if( this.props !== nextProps ) {
            if ( nextProps.account ) {
                Object.entries( nextProps.account ).map( ( [ key, value ] ) => localStorage.setItem( key, value ) );
                localStorage.setItem( 'unauthorized', 0 );
            }
        }
    };

    showErrorMessage = content => <p className="login-error">{ content }</p>;

    loginUserAttempt = ( account ) => {
        this.props.accountLogin( account.usernameOrEmail, account.password )
            .then( ()  => {
                this.props.history.push( '/home' );
            } );
    };

    render() {
        const { accountLoginError, errorCode } = this.props;

        return(
            <div className="container">
                <legend> Login </legend>
                { accountLoginError && this.errorCode( errorCode ) }
                <LoginForm onSubmit={ this.loginUserAttempt } />
            </div>
        )
    }
}

const mapStateToProps = ( state ) => ( {
    account: state.authentication.account,
    isFetching: state.authentication.isFetching,
    accountLoginError: state.authentication.loginError,
    errorCode: state.authentication.errorCode,
} );

const mapDispatchToProps = ( dispatch ) => ( {
    accountLogin: ( usernameOrEmail, password ) => dispatch( actions.loginAccountAttempt( usernameOrEmail, password ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( withRouter( Login ) );