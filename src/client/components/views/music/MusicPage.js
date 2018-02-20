import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import { accountActions } from "../../../actions";
import { MusicTiles, MusicList } from "../music";
import { Pagination } from "../../common/elements";

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
        } else {
            this.setState( { showList: true, showTiles: false } );
        }
    };

    render() {
        const { music, musicMeta } = this.props;
        const { showTiles } = this.state;

        if ( !music ) {
            return <h1> Loading... </h1>;
        }

        return (
            <div className="music-page">
                {/*<div className="row filter-bar">*/}
                    {/*<div className="pull-right">*/}
                        {/*<span className="show-list" onClick={ showTiles && this.toggleMusicView } disabled={ showList } >*/}
                            {/*<i className="fa fa-list" disabled={ showList } ><h6> Show List </h6></i>*/}
                        {/*</span>*/}
                        {/*<span className="show-tiles" onClick={ showList && this.toggleMusicView } disabled={ showTiles } >*/}
                            {/*<i className="fa fa-square" disabled={ showList } ><h6> Show Tiles </h6></i>*/}
                        {/*</span>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <div className="row">
                    { showTiles ?
                        <div>
                            <MusicTiles music={ music }/>
                            <div className="clearfix"></div>
                            <Pagination { ...this.props } resultsPerPage={ musicMeta.results_per_page } displayPages={ 5 } currentPage={ musicMeta.current_page } totalPages={ musicMeta.total_pages } totalRows={ musicMeta.total_rows } />
                        </div>
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
        musicMeta: state.account.musicMeta,
        showList: state.showList,
    }
};

const mapDispatchToProps = ( dispatch ) => ( {
    getAccountMusic: ( accountId, keyword, page ) => dispatch( accountActions.getAccountMusic( accountId, keyword, page ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( MusicPage );