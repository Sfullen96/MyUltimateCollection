import React, { Component } from "react";
import { connect } from "react-redux";
import { accountActions } from "../../../actions";

class HomepageMusic extends Component {
    componentDidMount() {
        const { getAccountMusic } = this.props;

        getAccountMusic( 1 );
    }

    render() {
        const { music } = this.props;

        console.log( "THIS", this.props );

        if ( !music ) {
            return <h1> Loading... </h1>;
        }

        return (
            <h1> Music Here </h1>
        );
    }
}

const mapStateToProps = ( state ) => ( {
    musicFetch: state.account.musicFetch,
    musicFetchError: state.account.musicFetchError,
    music: state.account.music,
} );

const mapDispatchToProps = ( dispatch ) => ( {
    getAccountMusic: ( accountId ) => dispatch( accountActions.getAccountMusic( accountId ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( HomepageMusic );