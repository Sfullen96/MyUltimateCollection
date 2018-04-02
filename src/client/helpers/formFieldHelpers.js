import React from 'react';
import { Multiselect, DropdownList } from 'react-widgets';
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

export function selectField( { input, label, options, placeholder, className, name, meta: { touched, error, warning } } ) {
    return (
        <div>
            { !!label && <label>{ label }</label> }

            <DropdownList { ...input }
                          onBlur={ () => input.onBlur() }
                          data={ options }
                          textField="name"
                          valueField="id"
                          className={ `${ className }` }
                          placeholder={ placeholder }
                          defaultValue={ 1 } />
            {
                touched &&
                (
                    ( error && <span className="glyphicon glyphicon glyphicon-remove">{ error }</span> )
                    ||
                    ( warning && <span>{ warning }</span> )
                )
            }
        </div>
    );
}

export function multiSelectField( { input, label, options, disabled, placeholder, className, textField, valueField, meta: { touched, error, warning } } ) {
    return (
        <div>
            { !!label && <label>{ label }</label> }

            <Multiselect { ...input }
                         value={ input.value || [] }
                         onBlur={ () => input.onBlur() }
                         disabled={ !!disabled }
                         data={ options }
                         textField="name"
                         valueField="id"
                         className={ `${ className }` }
                         placeholder={ placeholder } />
            {
                touched &&
                (
                    ( error && <span className="glyphicon glyphicon glyphicon-remove">{ error }</span> )
                    ||
                    ( warning && <span>{ warning }</span> )
                )
            }
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

export function textEditor( { input, value, label, placeholder = null, meta: { touched, error, warning } } ) {
    return (
        <div>
            { label && <label>{ label }</label> }

            { console.log( "INPUT", input, value ) }

            <ReactQuill { ...input }
                        content={ input.value || value || '' }
                        placeholder={ placeholder }
                        value={ value || '' }
                        onBlur={ () => input.onBlur } />

            {touched &&
            ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
        </div>
    );
}

export function datePicker( { input, inputId, label, min, max, defaultValue, selectedValue, meta: { touched, error, warning } } ) {
    return (
        <div>
            { label && <label>{ label }</label> }
            <input id={ inputId }
                   type="date"
                   { ...input }
                   min={ min && min }
                   max={ max && max }
                   value={ defaultValue ? '' : selectedValue }
                   className="form-control"
                   defaultValue={ defaultValue } />
            {
                touched &&
                (
                    ( error && <span className="glyphicon glyphicon-exclamation-sign">{ error }</span> )
                    ||
                    ( warning && <span>{ warning }</span> )
                )
            }
        </div>
    );
}