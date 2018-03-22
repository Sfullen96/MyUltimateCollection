import React from 'react';
import { Field, reduxForm } from "redux-form";
import defaultImage from "../../../../../public/images/placeholder.png"

const HeaderSearch = (
        {
            handleSubmit,
            value,
            handleChange,
            showSearchPreview,
            onBlur,
            onHover,
            onMouseOut,
            onSearchResultClick,
            searchResults,
        }
    ) => {

    return (
        <form className="navbar-form navbar-left form-inline my-2 my-lg-0" method="POST" action="" onSubmit={ handleSubmit }>
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
                        <button className="btn btn-outline-light my-2 my-sm-0 header-search-submit" type="submit">Search</button>
                        {
                            searchResults && searchResults[ 0 ] && ( searchResults[ 0 ].music.count > 0 || searchResults[ 0 ].artists.count > 0 ) && showSearchPreview &&
                            <div
                                className="search-dropdown container-fluid"
                                onMouseOut={ onMouseOut }
                                onMouseOver={ onHover }>
                                <div className="row">
                                    <div className="col-md-6">
                                        <ul className="search-list">
                                            <h3>Music</h3>
                                            <hr/>
                                            {
                                                searchResults[ 0 ].music &&
                                                searchResults[ 0 ].music.count ?
                                                searchResults[ 0 ]
                                                    .music
                                                    .rows
                                                    .map( ( _music, x ) => {
                                                        return (
                                                            <div key={ x } className="search-item" onClick={ () => onSearchResultClick( _music.id, "music" ) } >
                                                                <div className="hidden-xs">
                                                                    <img src={ _music.image ? _music.image : defaultImage } />
                                                                </div>
                                                                <div className="music-search-result-title-container">
                                                                    <li>{ _music.title }</li>
                                                                    <i>{
                                                                        _music.artists[ 0 ].name.includes( "(the)" ) || _music.artists[ 0 ].name.includes( "(The)" )
                                                                            ?
                                                                            `The ${ _music.artists[ 0 ].name.substring( 0, _music.artists[ 0 ].name.length - 6 ) }`
                                                                            :
                                                                            _music.artists[ 0 ].name
                                                                    }</i>
                                                                </div>
                                                                {
                                                                    searchResults[ 0 ].music.count > 1 &&
                                                                    <hr/>
                                                                }
                                                            </div>
                                                        );
                                                    } ) : <h4>No music found</h4>
                                            }
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="search-list">
                                            <h3>Artists</h3>
                                            <hr/>
                                            {
                                                searchResults[ 0 ].artists &&
                                                searchResults[ 0 ].artists.count ?
                                                searchResults[ 0 ]
                                                    .artists
                                                    .rows
                                                    .map( ( _artist, x ) => {
                                                        return (
                                                            <div key={ x } className="search-item" onClick={ () => onSearchResultClick( _artist.id, "artist" ) } >
                                                                <div className="hidden-xs">
                                                                    <img src={ _artist.image ? _artist.image : defaultImage } />
                                                                </div>
                                                                <div className="music-search-result-title-container">
                                                                    <li>{
                                                                        _artist.name.includes( "(the)" ) || _artist.name.includes( "(The)" )
                                                                            ?
                                                                            `The ${ _artist.name.substring( 0, _artist.name.length - 6 ) }`
                                                                            :
                                                                            _artist.name
                                                                    }</li>
                                                                </div>
                                                                {
                                                                    searchResults[ 0 ].music.count > 1 &&
                                                                    <hr/>
                                                                }
                                                            </div>
                                                        );
                                                    } ) : <h4>No artists found</h4>
                                            }
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        }
                    </div>
                </div>
            </div>
        </form>
    )
};

export default reduxForm( { form: 'search-form' } )( HeaderSearch );
