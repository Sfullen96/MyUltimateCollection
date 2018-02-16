import React, { Component } from "react";
import { connect } from "react-redux";
import { accountActions } from "../../../actions";
import { MusicTiles, MusicList } from "../music";
import queryString from "query-string";

class MusicPage extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            showList: false,
            showTiles: true,
        };
    }

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

    toggleMusicView = () => {
        const { showList, showTiles } = this.state;

        if ( showList ) {
            this.setState( { showList: false, showTiles: true } );
        } else {
            this.setState( { showList: true, showTiles: false } );
        }
    };

    render() {
        const { music } = this.props;
        const { showList, showTiles } = this.state;

        if ( !music ) {
            return <h1> Loading... </h1>;
        }

        return (
            <div className="music-page">
                <div className="row filter-bar">
                    <div className="pull-right">
                        <span className="show-list" onClick={ this.toggleMusicView } disabled={ showList } >
                            <i class="fa fa-list"></i>
                            <h6> Show List </h6>
                        </span>
                        <span className="show-tiles" onClick={ this.toggleMusicView } disabled={ showTiles } >
                            <i class="fa fa-square"></i>
                            <h6> Show Tiles </h6>
                        </span>
                    </div>
                </div>
                <div className="row">
                    { showTiles ?
                        <MusicTiles music={ music }/>
                        :
                        <MusicList music={ music }/>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    return {
        musicFetch: state.account.musicFetch,
        musicFetchError: state.account.musicFetchError,
        music: state.account.music,
        showList: state.showList,
    }
};

const mapDispatchToProps = ( dispatch ) => ( {
    getAccountMusic: ( accountId, keyword ) => dispatch( accountActions.getAccountMusic( accountId, keyword ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( MusicPage );