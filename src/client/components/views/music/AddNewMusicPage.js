import React, { Component } from "react";
import { connect } from "react-redux";
import { AddNewMusicForm } from "./elements";

class AddNewMusicPage extends Component {
    formSubmit = ( music ) => {
        console.log( "MUSIC POST", music );
    };

    render() {
        return (
            <div className="container">
                <h1>Add New Music</h1>
                <AddNewMusicForm onSubmit={ this.formSubmit } />
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ( {

} );

const mapDispatchToProps = ( dispatch ) => ( {

} );

export default connect( mapDispatchToProps, mapStateToProps )( AddNewMusicPage );