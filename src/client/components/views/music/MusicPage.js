import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import { accountActions } from "../../../actions";
import { MusicTiles, MusicTable } from "../music";
import { Pagination } from "../../common/elements";

class MusicPage extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            showList: localStorage.getItem( 'showList' ) === "true" || localStorage.getItem( 'showList' ) === true ? true : false,
            showTiles: localStorage.getItem( 'showTiles' ) === "true" || localStorage.getItem( 'showTiles' ) === true ? true : false,
        };
        
        console.log( "STATE", this.state );
    }

    componentDidMount() {
        const { getAccountMusic } = this.props;

        const parsed = this.props.location.search ? queryString.parse( this.props.location.search ) : null;
        const keyword = parsed && parsed.keyword ? parsed.keyword : null;
        const page = parsed && parsed.page ? parseInt( parsed.page, 10 ) : 1;

        getAccountMusic( 1, keyword, page );
    }

    componentWillReceiveProps( nextProps ) {
        if ( nextProps.location.search !== this.props.location.search ) {
            const { getAccountMusic } = this.props;

            const parsed = queryString.parse( nextProps.location.search );
            const keyword = parsed && parsed.keyword ? parsed.keyword : null;
            const page = parsed && parsed.page ? parseInt( parsed.page, 10 ) : 1;

            getAccountMusic( 1, keyword, page );
        }
    }

    toggleMusicView = () => {
        const { showList } = this.state;

        if ( showList ) {
            this.setState( { showList: false, showTiles: true } );
            localStorage.setItem( "showList", false );
            localStorage.setItem( "showTiles", true );
        } else {
            localStorage.setItem( "showList", true );
            localStorage.setItem( "showTiles", false );
            this.setState( { showList: true, showTiles: false } );
        }
    };

    render() {
        const { music, musicMeta } = this.props;
        const { showTiles, showList } = this.state;

        if ( !music ) {
            return <h1> Loading... </h1>;
        }

        console.log( "STATE", showTiles, showList );

        return (
            <div className="music-list">
                <div className="row filter-bar">
                    <div className="ml-auto">
                        <span
                            className="show-list"
                            onClick={ !showList && this.toggleMusicView } >
                            <i
                                className="fa fa-list"
                                style={ { color: showList ? "red" : "#333" } }>
                            </i>
                        </span>
                        <span
                            className="show-tiles"
                            onClick={ !showTiles && this.toggleMusicView } >
                            <i
                                className="fa fa-square"
                                style={ { color: showTiles ? "red" : "#333" } }>
                            </i>
                        </span>
                    </div>
                </div>
                <div className="row">
                    { showTiles ?
                        <MusicTiles music={ music }/>
                        :
                        <MusicTable music={ music } meta={ musicMeta } />
                    }
                    <Pagination { ...this.props } resultsPerPage={ musicMeta.results_per_page } displayPages={ 5 } currentPage={ musicMeta.current_page } totalPages={ musicMeta.total_pages } totalRows={ musicMeta.total_rows } />
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
        musicMeta: state.account.musicMeta,
    }
};

const mapDispatchToProps = ( dispatch ) => ( {
    getAccountMusic: ( accountId, keyword, page ) => dispatch( accountActions.getAccountMusic( accountId, keyword, page ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( MusicPage );