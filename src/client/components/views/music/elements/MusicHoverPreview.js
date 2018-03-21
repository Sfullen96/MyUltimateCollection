import React, { Component } from "react";
import { connect } from "react-redux";

class MusicHoverPreview extends Component {
    render() {
        return (
            <div className="showMusicHoverPreview">
                <h1>HOVER PREVIEW!</h1>
            </div>

        );
    }
}

const mapDispatchToProps = ( dispatch ) => ( {

} );

const mapStateToProps = ( dispatch ) => ( {

} );

export default connect( mapStateToProps, mapDispatchToProps )( MusicHoverPreview );