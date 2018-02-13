import React, { Component } from "react";
import { connect } from "react-redux";
import { musicActions } from "../../../actions";
import defaultImage from "../../../../../public/images/placeholder.png"

class IndividualMusic extends Component {
    componentDidMount() {
        const { match, getMusicInformation } = this.props;

        const musicId = match.params.musicId;

        getMusicInformation( musicId );
    }

    render() {
        const { music } = this.props;

        if ( !music ) {
            return <h1> Loading... </h1>
        }
        
        console.log( "MUSIC", music );

        return(
            <div className="container individual-music-container">
                <div className="row">
                    <div className="col-xs-12 col-sm-4">
                        <img className="individual-music-image" src={ music.image ? music.image : defaultImage } alt={ `${ music.title } album cover` } />
                    </div>
                    <div className="col-xs-12 col-sm-8">
                        <p>{ music.format.name }</p>
                        <p>{ music.title }</p>
                        <p>By {
                            music
                                .artists
                                .map( ( artist ) => {
                                    return artist.name;
                                } )
                        }</p>
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
} );

export default connect( mapStateToProps, mapDispatchToProps )( IndividualMusic );

