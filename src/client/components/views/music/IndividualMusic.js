import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import { musicActions } from "../../../actions";
import defaultImage from "../../../../../public/images/placeholder.png"
import { TrackTable } from "./elements";

class IndividualMusic extends Component {
    constructor( props ){
        super( props );

        this.state = {
            descriptionExtended: false,
            buttonText: "Show More",
        };
    }

    componentWillReceiveProps( nextProps ) {
        const { match, getMusicInformation } = this.props;

        if ( nextProps && parseInt( nextProps.match.params.musicId, 10 ) !== parseInt( match.params.musicId, 10 ) ) {
            const musicId = nextProps.match.params.musicId;
            
            getMusicInformation( musicId );
        }
    }

    componentDidMount() {
        const { match, getMusicInformation } = this.props;

        const musicId = match.params.musicId;

        getMusicInformation( musicId );
    }

    toggleDescription = () => {
        this.setState( {
            descriptionExtended: !this.state.descriptionExtended,
            buttonText: !this.state.descriptionExtended ? "Show Less" : "Show More",
        } );
    };

    deleteMusic = ( musicId ) => {
        this.props.deleteMusic( musicId )
            .then( ( response ) => {
                if ( response.success ) {
                    this.props.history.push( "/music" );
                }
            } );
    };

    render() {
        const { music } = this.props;
        const { descriptionExtended, buttonText } = this.state;
        
        if ( !music ) {
            return <h1> Loading... </h1>
        }

        const accountId = parseInt( localStorage.getItem( "account_id" ), 10 );

        let totalDuration = 0;

        let description = null;

        if ( music.description && music.description.length > 300 && descriptionExtended !== true ) {
            description = music.description.substring( 0, 300 ) + "...";
        } else {
            description = music.description;
        }

        return(
            <div className="container individual-music-container">
                {
                    accountId === parseInt( music.uploader.id, 10 ) &&
                        <div className="row">
                            <button
                                className="btn btn-danger ml-auto no-radius"
                                onClick={ () => this.deleteMusic( music.id ) }
                            ><i className="fa fa-times"></i> Delete Album </button>
                        </div>
                }
                <div className="row">
                    <div className="col-xs-12 col-sm-3">
                        <img className="individual-music-image" src={ music.image ? music.image : defaultImage } alt={ `${ music.title } album cover` } />
                    </div>
                    <div className="col-xs-12 col-sm-9 music-meta">
                        <p className="music-format">{ music.format.name } ({ music.disc_count } { music.disc_count > 1 ? "discs" : "disc" })</p>
                        <p className="music-title">{ music.title }</p>
                        <p className="music-artists">By {
                            music
                                .artists
                                .map( ( artist, key ) => {
                                    return <Link key={ key } to={ `/artist/${ artist.id }` } >{ artist.name }</Link>;
                                } )
                        }</p>
                        <p className="music-duration">
                            {
                                music.tracks.length &&
                                music
                                    .tracks
                                    .forEach( ( track ) => {
                                        totalDuration += track.duration;
                                    } )
                            }
                            { `${ music.tracks.length } songs, ` }
                            {
                                totalDuration > 3600 ?
                                `${ moment.utc( totalDuration * 1000 ).format( "H" ) } hr ${ moment.utc( totalDuration * 1000 ).format( "m" ) } mins`
                                    :
                                `${ moment.utc( totalDuration * 1000 ).format( "m" ) } mins`
                            }
                        </p>
                        <p className="music-meta">
                            {
                                music.purchased_from &&
                                <span>
                                    <strong>Purchased:</strong> { music.purchased_from }
                                    { music.price && ( music.price.startsWith( "£" ) ? ` for ${ music.price }` : ` for £${ music.price }` ) }
                                </span>
                            }
                        </p>
                        <p className="music-meta">
                            Reference: { music.reference }
                        </p>
                    </div>
                </div>
                <div className="row description-row">
                    <div className="col-xs-12">
                        {
                            description &&
                            <p dangerouslySetInnerHTML={ { __html: description } }></p>
                        }
                        {
                            description && description.length >= 303 &&
                                <a onClick={ this.toggleDescription } className="toggle-description-link" >{ buttonText }</a>
                        }
                    </div>
                </div>
                <div className="row music-track-table-row">
                    <div className="col-12">
                        <TrackTable tracks={ music.tracks } />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ( {
    music: state.music.music,
} );

const mapDispatchToProps = ( dispatch ) => ( {
    getMusicInformation: ( musicId ) => dispatch( musicActions.getMusicInformation( musicId ) ),
    deleteMusic: ( musicId ) => dispatch( musicActions.deleteMusic( musicId ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( withRouter( IndividualMusic ) );

