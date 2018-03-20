import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { artistActions } from "../../../actions";
import defaultImage from "../../../../../public/images/placeholder.png"
import { MusicHoverPreview } from "../music/elements";

class IndividualArtist extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            descriptionExtended: false,
            buttonText: "Show More",
            showMusicHoverPreview: false,
        };
    }

    componentWillReceiveProps( nextProps ) {
        const { match, getArtist } = this.props;

        if ( nextProps && parseInt( nextProps.match.params.artistId, 10 ) !== parseInt( match.params.artistId, 10 ) ) {
            const artistId = nextProps.match.params.artistId;

            getArtist( artistId );
        }
    }

    componentDidMount() {
        const { match, getArtist } = this.props;

        const artistId = match.params.artistId;
        console.log( "PARAMS", artistId, this.props.match );

        getArtist( artistId );
    }

    toggleDescription = () => {
        this.setState( {
            descriptionExtended: !this.state.descriptionExtended,
            buttonText: !this.state.descriptionExtended ? "Show Less" : "Show More",
        } );
    };

    showMusicHoverPreview = () => {
        this.setState( {
            showMusicHoverPreview: true,
        } );
    };

    hideMusicHoverPreview = () => {
        this.setState( {
            showMusicHoverPreview: false,
        } );
    };

    render() {
        const { artist } = this.props;
        const { descriptionExtended, buttonText } = this.state;

        if ( !artist ) {
            return <h1> Loading... </h1>
        }

        const accountId = parseInt( localStorage.getItem( "account_id" ), 10 );

        let totalDuration = 0;

        let description = null;

        if ( artist.description && artist.description.length > 300 && descriptionExtended !== true ) {
            description = artist.description.substring( 0, 300 ) + "...";
        } else {
            description = artist.description;
        }

        return(
            <div className="container individual-music-container">
                <div className="row">
                    <div className="col-xs-12 col-sm-3">
                        <img className="individual-music-image" src={ artist.image ? artist.image : defaultImage } alt={ `${ artist.name }` } />
                    </div>
                    <div className="col-xs-12 col-sm-9 music-meta">
                        <p className="music-title">{ artist.name }</p>
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
                <div className="row description-row">
                    <div className="col-xs-12">
                        <h2><strong>Albums you own by { artist.name }:</strong></h2>
                    </div>
                    <div className="artist-page-music-list">
                        {
                            this.state.showMusicHoverPreview &&
                            <MusicHoverPreview
                                onHover={ this.showMusicHoverPreview }
                            />
                        }
                        {
                            artist
                                .music
                                .map( ( music ) => {
                                    return (
                                        <div
                                            onMouseOut={ this.hideMusicHoverPreview }
                                            onMouseOver={ this.showMusicHoverPreview } >
                                            <Link
                                                to={ `/music/${ music.id }` }
                                            >
                                                <li>{ music.title }</li>
                                            </Link>
                                        </div>
                                    );
                                } )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ( {
    artist: state.artist.artist,
} );

const mapDispatchToProps = ( dispatch ) => ( {
    getArtist: ( artistId ) => dispatch( artistActions.getArtist( artistId ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( withRouter( IndividualArtist ) );

