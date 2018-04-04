import React, { Component } from "react";
import { connect } from "react-redux";
import { AddNewMusicForm } from "./elements";
import { artistActions, musicActions } from "../../../actions";

class AddNewMusicPage extends Component {
    componentDidMount() {
        const { getAllArtists, getMusicFormats } = this.props;
        getAllArtists( false );
        getMusicFormats();
    }

    formSubmit = ( music ) => {
        console.log( "MOOOOOSIC", music );
        const { addNewMusic } = this.props;
        addNewMusic( music )
            .then( ( response ) => {
                this.props.history.push( `/music/${ response.data }` );
            } );
    };

    getAlbumInfo = ( title, artist ) => {
        const { getLastFmInfo } = this.props;

        getLastFmInfo( title, artist[ 0 ].id );
    };

    render() {
        const { artists, formats, lastFmInfo } = this.props;

        if ( !artists || !formats ) {
            return <h1>Loading...</h1>
        }

        return (
            <div className="container">
                <h1 className="mt-3 mb-3 h3">Add New Music to Your Library</h1>
                <hr/>
                <AddNewMusicForm
                    onSubmit={ this.formSubmit }
                    artists={ artists }
                    formats={ formats }
                    getAlbumInfo={ this.getAlbumInfo }
                    lastFmInfo={ lastFmInfo && lastFmInfo }
                />
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ( {
    artists: state.artist.artists,
    formats: state.music.formats,
    lastFmInfo: state.music.lastFm,
} );

const mapDispatchToProps = ( dispatch ) => ( {
    getAllArtists: ( paginate = false ) => dispatch( artistActions.getAllArtists( false ) ),
    addNewMusic: ( music ) => dispatch( musicActions.createNewMusic( music ) ),
    getMusicFormats: () => dispatch( musicActions.getMusicFormats() ),
    getLastFmInfo: ( title, artistId ) => dispatch( musicActions.getLastFmInfo( title, artistId ) )
} );

export default connect( mapStateToProps, mapDispatchToProps )( AddNewMusicPage );