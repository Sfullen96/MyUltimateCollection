import React from "react";
import { reduxForm, Field, Form } from "redux-form";
import moment from "moment";
import * as _Form from "../../../../helpers/formFieldHelpers";

const AddNewMusicForm = ( props ) => {
    const { handleSubmit, submitting } = props;

    return (
        <Form onSubmit={ handleSubmit }>
            <div className="form-group">
                <Field
                    name="title"
                    placeholder="Title..."
                    component={ _Form.textField }
                />
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
                            options={ [ {
                                name: "CD",
                                id: 1,
                            }, {
                                name: "CD x2",
                                id: 2,
                            } ] }
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
                <Field
                    name="price"
                    placeholder="Price..."
                    component={ _Form.textField }
                />
            </div>

            <button type="submit" className="btn btn-primary margin-bottom" disabled={ submitting }> Login </button>
        </Form>
    )
};

export default reduxForm( { form: "new-music-form" } )( AddNewMusicForm );