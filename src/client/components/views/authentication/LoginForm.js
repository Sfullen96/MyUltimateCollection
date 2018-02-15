import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Field, Form, reduxForm } from "redux-form";
import { formFieldHelpers as _Form } from '../../../helpers';

class LoginForm extends Component {
    render() {
        const { handleSubmit, submitting } = this.props;

        return(
            <Form onSubmit={ handleSubmit } >
                <div className="form-group">
                    <Field
                        type="text"
                        name="usernameOrEmail"
                        placeholder="Email Address or Username"
                        component={ _Form.textField }
                    />
                </div>
                <div className="form-group">
                    <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        component={ _Form.textField }
                    />
                </div>
                <button type="submit" className="btn btn-primary margin-bottom" disabled={ submitting }> Login </button>
                <Link to="/register" className="btn btn-primary pull-right"> Register Now </Link>
            </Form>
        )
    }
}

export default reduxForm( { form: "login-form" } )( LoginForm );