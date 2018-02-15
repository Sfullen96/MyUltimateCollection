import React from 'react';
import Multiselect from 'react-widgets/lib/Multiselect'
import ReactQuill from 'react-quill';
import 'react-widgets/dist/css/react-widgets.css'

export function textField( { input, label = null, placeholder, initialValue, disabled, type = "text", className, meta: { touched, error, warning } } ) {
    return (
        <div>
            { !!label && <label>{ label }</label> }

            <div>
                <input { ...input } className={ `form-control ${ className } ${ touched ? (!error ? "" : " error-field") : "" }` } type={ type } placeholder={ placeholder || null }
                       value={ initialValue ? initialValue : input.value } disabled={!!disabled}
                />

                { touched &&
                (
                    ( error && <span className="error">{ error }</span> )
                    ||
                    ( warning && <span className="warning">{ warning }</span> )
                )
                }

            </div>
        </div>
    );
}

export function selectField( { label, options, placeholder, className, meta: { touched, error, warning } } ) {

    return (
        <div>
            { !!label && <label>{ label }</label> }
            <select className={ `form-control ${ className } ` } >
            <option value={ null } selected>{ `${ placeholder }...` }</option>
            {
            options.map( ( option, index ) => <option value={ option.name }>{ option.label }</option> )
            }
            </select>
            {
            touched &&
            (
            ( error && <span>{ error }</span> )
            ||
            ( warning && <span>{ warning }</span> )
            )
            }
        </div>
    );
}

export function multiSelectField( { label, options, placeholder, className, meta: { touched, error, warning } } ) {
    return (
        <div>
            { !!label && <label>{ label }</label> }

            <Multiselect
                data={ options.map( ( option ) => {
                    return option.label;
                } ) }
                className={ `${ className }` }
                textField={ options.map( option => option.label ) }
                valueField={ options.map( option => option.value ) }
                placeholder={ placeholder }
            />
        </div>

    );
}

export const renderField = ( { input, label, type, placeholder, className, meta: { touched, error } } ) => {
    return (
        <div>
            { label && <label>{ label }</label> }
            <div>
                <input className={ `${ className }` } { ...input } type={ type } placeholder={ placeholder }/>
                {
                    touched && error && <span>{ error }</span>
                }
            </div>
        </div>
    );
}

export function textEditor( { input, label, content, className, placeholder = null } ) {
    console.log( "PLACEHOLDER", placeholder );
    return (
        <div>
            { label && <label>{ label }</label> }

            <ReactQuill
                value={ content }
                placeholder={ placeholder }
            />
        </div>
    );
}
