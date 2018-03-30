import React from "react";
import { reduxForm, Field, Form } from "redux-form";
import moment from "moment";
import * as _Form from "../../../../helpers/formFieldHelpers";

const AddNewMusicForm = ( props ) => {
    const { handleSubmit, submitting, artists, formats } = props;
    
    return (
        <Form onSubmit={ handleSubmit }>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="form-group">
                        <Field
                            name="title"
                            placeholder="Title..."
                            component={ _Form.textField }
                        />
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="form-group">
                        <Field
                            name="artist"
                            placeholder="Artist(s)..."
                            options={
                                artists
                                    .map( ( artist ) => {
                                        return {
                                            id: artist.id,
                                            name: artist.name,
                                        }
                                    } )
                            }
                            component={ _Form.multiSelectField }
                        />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <Field
                    name="description"
                    placeholder="Description..."
                    component={ _Form.textEditor }
                />
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6">
                        <Field
                            name="format_id"
                            placeholder="Format"
                            component={ _Form.selectField }
                            options={
                                formats
                                    .map( ( format ) => {
                                        return {
                                            id: format.id,
                                            name: format.name,
                                        }
                                    } )
                            }
                        />
                    </div>
                    <div className="col-12 col-sm-12 col-md-6">
                        <Field
                            name="disc_count"
                            placeholder="Disc Count"
                            component={ _Form.textField }
                        />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6">
                        <Field
                            name="purchased_on"
                            placeholder="Purchased On"
                            component={ _Form.datePicker }
                            max={ moment().format( "YYYY-MM-DD" ) }
                        />
                    </div>
                    <div className="col-12 col-sm-12 col-md-6">
                        <Field
                            name="purchased_from"
                            placeholder="Purchased From"
                            component={ _Form.textField }
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
                                placeholder="Price..."
                                component={ _Form.textField }
                            />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6">
                        <Field
                            name="reference"
                            placeholder="Reference"
                            component={ _Form.textField }
                        />
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary margin-bottom" disabled={ submitting }> Login </button>
        </Form>
    )
};

export default reduxForm( { form: "new-music-form" } )( AddNewMusicForm );