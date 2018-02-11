import React, { Component } from "react";
import { connect } from "react-redux";
import { accountActions } from "../../../actions";
import { MusicTiles } from "../music";
import queryString from "query-string";

class MusicPage extends Component {
    componentDidMount() {
        const { getAccountMusic } = this.props;

        let keyword = null;
        const parsed = this.props.location.search ? queryString.parse( this.props.location.search ) : null;
        keyword = parsed && parsed.keyword ? parsed.keyword : null;

        getAccountMusic( 1, keyword );
    }

    componentWillReceiveProps( nextProps ) {
        if ( nextProps.location.search !== this.props.location.search ) {
            const { getAccountMusic } = this.props;

            let keyword = null;
            const parsed = queryString.parse( nextProps.location.search );
            keyword = parsed && parsed.keyword ? parsed.keyword : null;

            getAccountMusic( 1, keyword );
        }
    }

    render() {
        const { music } = this.props;

        if ( !music ) {
            return <h1> Loading... </h1>;
        }

        return (
            <div className="row">
                <MusicTiles music={ music } />
            </div>
        );
    }
}

const mapStateToProps = state => ( {
    musicFetch: state.account.musicFetch,
    musicFetchError: state.account.musicFetchError,
    music: state.account.music,
} );

const mapDispatchToProps = ( dispatch ) => ( {
    getAccountMusic: ( accountId, keyword ) => dispatch( accountActions.getAccountMusic( accountId, keyword ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( MusicPage );