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
            description: "",
            title: "",
            artist: "",
            showLastFmInfo: false,
        };
    }

    gotoLastFmSearch = () => {
        const { getAlbumInfo, formValues } = this.props;
        
        if (
            formValues
            && formValues.title
            && ( formValues.artist && formValues.artist.length )
            && ( formValues.artist[ 0 ].id !== this.state.artist || formValues.title !== this.state.title ) ) {
            this.setState( {
                formDisabled: true,
                artist: formValues.artist[ 0 ].id,
                title: formValues.title,
                showLastFmInfo: true,
            } );
            setTimeout( () => {
                getAlbumInfo( formValues.title, formValues.artist );
            }, 300 );
        } else if ( !formValues || !formValues.title || !formValues.artist || !formValues.artist.length ) {
            this.setState( {
                showLastFmInfo: false,
            } )
        }
    };

    componentWillReceiveProps( nextProps ) {
        const { lastFmInfo } = nextProps;
        
        if ( lastFmInfo && this.state.showLastFmInfo ) {
            if ( lastFmInfo.data.album.wiki ) {
                this.setState( { description: lastFmInfo.data.album.wiki.content && lastFmInfo.data.album.wiki.content } );
            } else {
                this.setState( { description: "" } );
            }
            this.setState( { formDisabled: false } );
        }
    }

    render() {
        const { handleSubmit, submitting, artists, formats, lastFmInfo } = this.props;
        const { formDisabled, showLastFmInfo } = this.state;

        return (
            <Form onSubmit={ handleSubmit }>
                {
                    formDisabled &&
                        <div className="alert alert-info alert-dismissible fade show" role="alert">
                            Searching Last.fm for the album you entered...
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                }
                {
                    lastFmInfo && lastFmInfo.data.error && showLastFmInfo &&
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        We were unable to find the album or artist you entered on last.fm<br />
                        Please continue to fill the form in as normal, or try another album
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                {
                    lastFmInfo && !lastFmInfo.data.error && lastFmInfo.data.album.image && showLastFmInfo && !formDisabled &&
                        <div className="last-fm-info mb-3">
                            <h6>Data Retrieved from Last.fm:</h6>
                            <div className="row">
                                {
                                    lastFmInfo.data.album.image[ 4 ][ '#text' ] !== '' &&
                                    <div className="col-12 col-sm-2">
                                        <img width="100%" src={ lastFmInfo.data.album.image[2]['#text'] } alt=""/>
                                    </div>
                                }
                                <div className={ `col-12 col-sm-${ lastFmInfo.data.album.image[ 4 ][ '#text' ] !== '' ? "10" : "12" } `}>
                                    <h4 className="mb-2 capitalize">{ lastFmInfo.data.album.name }</h4>
                                    <p className="mb-0"><strong>Listeners</strong>: { parseInt( lastFmInfo.data.album.listeners, 10 ).toLocaleString() }</p>
                                    <p><strong>Plays</strong>: { parseInt( lastFmInfo.data.album.playcount, 10 ).toLocaleString() }</p>
                                    <h5>
                                        {
                                            lastFmInfo.data.album.tags &&
                                                lastFmInfo.data.album.tags.tag.map( ( tag ) => {
                                                    if ( tag.name !== "albums i own" ) {
                                                        return <span
                                                            className="badge badge-default mr-2 capitalize">{ tag.name }</span>;
                                                    }
                                                } )
                                        }
                                    </h5>
                                </div>
                            </div>
                        </div>
                }
                <fieldset disabled={ formDisabled } >

                    {
                        lastFmInfo && lastFmInfo.data.album.image && lastFmInfo.data.album.image[ 4 ][ '#text' ] && showLastFmInfo &&
                            <div className="d-none">
                                <Field
                                    name="image"
                                    component={ _Form.textField }
                                    style={ { 'display': "none" } }
                                    // type="hidden"
                                    content={ lastFmInfo.data.album.image[ 4 ][ '#text' ] }
                                    disabled={ formDisabled }
                                />
                            </div>
                    }
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6">
                            <div className="form-group">
                                <Field
                                    name="title"
                                    label="Album Title"
                                    placeholder="Title"
                                    component={ _Form.textField }
                                    onBlur={ this.gotoLastFmSearch }
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
                                    onBlur={ this.gotoLastFmSearch }
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
                            content={ this.state.description && showLastFmInfo && this.state.description }
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