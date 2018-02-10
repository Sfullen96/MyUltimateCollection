import React from 'react';
import { Field, reduxForm } from "redux-form";

const HeaderSearch = ( { handleSubmit, value } ) => {
    return (
        <form className="navbar-form navbar-left" method="POST" action="" onSubmit={ handleSubmit }>
            <div className="row">
                <div className="col-xs-12 col-sm-12">
                    <div className="form-group">
                        <Field
                            component="input"
                            type="text"
                            className="form-control margin-bottom"
                            name="keyword"
                            required
                            placeholder="Search..."
                            value={ value }
                            // onChange={ ( data ) => this.handleSearch( data ) }
                        />
                    </div>
                </div>
                <div className="col-xs-12 col-sm-3">
                </div>
            </div>
        </form>
    )
};

export default reduxForm( { form: 'search-form' } )( HeaderSearch );
