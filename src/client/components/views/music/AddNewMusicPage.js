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
        const { addNewMusic } = this.props;
        addNewMusic( music )
            .then( ( response ) => {
                this.props.history.push( `/music/${ response.data }` );
            } );
    };

    getAlbumInfo = ( title, artist ) => {
        const { getLastFmInfo } = this.props;

        getLastFmInfo( title, artist );
    };

    render() {
        const { artists, formats } = this.props;

        if ( !artists || !formats ) {
            return <h1>Loading...</h1>
        }

        return (
            <div className="container">
                <h1>Add New Music</h1>
                <AddNewMusicForm
                    onSubmit={ this.formSubmit }
                    artists={ artists }
                    formats={ formats }
                    getAlbumInfo={ this.getAlbumInfo }
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
    getLastFmInfo: ( title ) => dispatch( musicActions.getLastFmInfo( title ) )
} );

export default connect( mapStateToProps, mapDispatchToProps )( AddNewMusicPage );