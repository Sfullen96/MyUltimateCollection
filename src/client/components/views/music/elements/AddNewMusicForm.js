import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, Form, getFormValues, formValueSelector } from "redux-form";
import moment from "moment";
import * as _Form from "../../../../helpers/formFieldHelpers";

class AddNewMusicForm extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            formDisabled: false,
        };
    }

    changeArtist = () => {
        const { getAlbumInfo, formValues } = this.props;
        if ( formValues && formValues.title && formValues.artist ) {
            this.setState( { formDisabled: true } );
            setTimeout( () => {
                getAlbumInfo( formValues.title, formValues.artist );
            }, 1000 );
        }
    };

    toggleFormDisable = () => {
        this.setState( { formDisabled: false } );
    };

    componentWillReceiveProps( nextProps ) {
        const { lastFmInfo } = nextProps;

        console.log( "EHHERHEHR" );
        if ( lastFmInfo ) {
            this.toggleFormDisable();
        }
    }

    render() {
        const { handleSubmit, submitting, artists, formats, lastFmInfo } = this.props;
        const { formDisabled } = this.state;

        return (
            <Form onSubmit={ handleSubmit }>
                {
                    formDisabled &&
                        <div class="alert alert-info alert-dismissible fade show" role="alert">
                            Searching Last.fm for the album you entered...
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                }
                {
                    lastFmInfo && lastFmInfo.data.error &&
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        We were unable to find the album or artist you entered on last.fm<br />
                        Please continue to fill the form in as normal
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                {
                    lastFmInfo && !lastFmInfo.data.error && lastFmInfo.data.album.image &&
                    <img src={ lastFmInfo.data.album.image[ 2 ][ '#text' ] } alt=""/>
                }
                <fieldset disabled={ formDisabled } >
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                                <Field
                                    name="title"
                                    label="Album Title"
                                    placeholder="Title"
                                    component={ _Form.textField }
                                    onBlur={ this.changeArtist }
                                    disabled={ formDisabled }
                                />


                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                                <Field
                                    name="artist"
                                    label="Album Artist(s)"
                                    placeholder="Artist(s)"
                                    options={
                                        artists
                                            .map( ( artist ) => {
                                                return {
                                                    id: artist.id,
                                                    name: artist.name,
                                                }
                                            } )
                                    }
                                    onBlur={ this.changeArtist }
                                    component={ _Form.multiSelectField }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <Field
                            name="description"
                            label="Album Description"
                            placeholder="Description..."
                            component={ _Form.textEditor }
                            value={ "LAST FM!" }
                            content={ lastFmInfo && "LAST FM!" }
                        />
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6">
                                <Field
                                    name="format_id"
                                    placeholder="Format"
                                    label="Album Format"
                                    component={_Form.selectField}
                                    options={
                                        formats
                                            .map((format) => {
                                                return {
                                                    id: format.id,
                                                    name: format.name,
                                                }
                                            })
                                    }
                                />
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <Field
                                    name="disc_count"
                                    label="Disc Count"
                                    placeholder="Disc Count"
                                    component={_Form.textField}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6">
                                <Field
                                    name="purchased_on"
                                    label="Purchased On"
                                    placeholder="Purchased On"
                                    component={_Form.datePicker}
                                    max={moment().format("YYYY-MM-DD")}
                                />
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <Field
                                    name="purchased_from"
                                    label="Purchased From"
                                    placeholder="Purchased From"
                                    component={_Form.textField}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="form-group">
                                    <Field
                                        name="price"
                                        label="Price"
                                        placeholder="Price..."
                                        component={_Form.textField}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <Field
                                    name="reference"
                                    label="Album Reference"
                                    placeholder="Reference"
                                    component={_Form.textField}
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-outline-dark margin-bottom" disabled={submitting}>Add Music</button>
                </fieldset>
            </Form>
        )
    }
}
AddNewMusicForm = reduxForm( { form: "new-music-form" } )( AddNewMusicForm );

const mapStateToProps = ( state ) => {
    return {
        formValues: state.form[ "new-music-form" ] && state.form[ "new-music-form" ].values,
    };
};

AddNewMusicForm = connect( mapStateToProps )( AddNewMusicForm );

export default AddNewMusicForm;