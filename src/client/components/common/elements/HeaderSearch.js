import React from 'react';
import { Field, reduxForm } from "redux-form";

const HeaderSearch = (
        {
            handleSubmit,
            value,
            handleChange,
            music,
            showSearchPreview,
            onBlur,
            onHover,
            onMouseOut,
            onSearchResultClick,
        }
    ) => {
    return (
        <form className="navbar-form navbar-left" method="POST" action="" onSubmit={ handleSubmit }>
            <div className="row">
                <div className="col-xs-12 col-sm-12">
                    <div className="form-group">
                        <Field
                            component="input"
                            type="text"
                            className="form-control search-input"
                            name="keyword"
                            required
                            placeholder="Search..."
                            value={ value }
                            onChange={ handleChange }
                            autoComplete="off"
                            onBlur={ onBlur }
                            onFocus={ handleChange }
                        />
                        {
                            music && music.length && showSearchPreview &&
                            <div
                                className="search-dropdown"
                                onMouseOut={ onMouseOut }
                                onMouseOver={ onHover }>
                                <ul className="search-list">
                                    {
                                        music
                                            .map( ( _music, x ) => {
                                                return (
                                                    <div key={ x } className="search-item" onClick={ () => onSearchResultClick( _music.id ) } >
                                                        <li>{ _music.title }</li>
                                                        <i>{ _music.artists[ 0 ].name }</i>
                                                        {
                                                            music.length > 1 &&
                                                            <hr/>
                                                        }
                                                    </div>
                                                );
                                            } )
                                    }
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </form>
    )
};

export default reduxForm( { form: 'search-form' } )( HeaderSearch );
