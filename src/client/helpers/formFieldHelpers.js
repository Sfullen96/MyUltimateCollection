import React from 'react';
import { Multiselect, DropdownList } from 'react-widgets';
import ReactQuill from 'react-quill';
import 'react-widgets/dist/css/react-widgets.css'

export function textField( { input, content, label = null, placeholder, initialValue, disabled, type = "text", className, meta: { touched, error, warning } } ) {
    return (
        <div>
            { !!label && <label>{ label }</label> }

            <div>
                <input { ...input } className={ `form-control ${ className } ${ touched ? (!error ? "" : " error-field") : "" }` } type={ type } placeholder={ placeholder || null }
                       value={ initialValue ? initialValue : content } disabled={ !!disabled }
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

export function textEditor( { input, value, label, content, placeholder = null, meta: { touched, error, warning } } ) {
    console.log( "fsdfsdfsdfsd", input );
    const quill = <ReactQuill theme='snow'
                              { ...input }
        // modules={this._quillModules}
                              toolbar={ false } // Let Quill manage toolbar
                              bounds={ '._quill' }
                              onBlur={ () => input.onBlur }
                              onChange={ () => input.onChange }
                              placeholder={ placeholder }>
        <div key="editor"
             ref="editor"
             className="quill-contents border_solid_top"
             dangerouslySetInnerHTML={ { __html: input.value } } />
    </ReactQuill>;

     return quill;

    // return (
    //     <div>
    //         { label && <label>{ label }</label> }
    //
    //         {/*<ReactQuill { ...input }*/}
    //                     {/*content={ input.value || value || '' }*/}
    //                     {/*placeholder={ placeholder }*/}
    //                     {/*// value={ content }*/}
    //                     {/*// onBlur={ () => input.onBlur }*/}
    //                     {/*onChange={(newValue, delta, source) => {*/}
    //                         {/*if (source === 'user') {*/}
    //                             {/*input.onChange(newValue);*/}
    //                         {/*}*/}
    //                     {/*}}*/}
    //                     {/*onBlur={(range, source, quill) => {*/}
    //                         {/*input.onBlur(quill.getHTML());*/}
    //                     {/*}}/>*/}
    //         <div className='_quill'>
    //
    //         <ReactQuill theme='snow'
    //                     { ...input }
    //                     // modules={this._quillModules}
    //                     toolbar={ false } // Let Quill manage toolbar
    //                     bounds={ '._quill' }
    //                     onBlur={ () => input.onBlur }
    //                     onChange={ () => input.onChange }
    //                     placeholder={ placeholder } >
    //             <div key="editor"
    //                  ref="editor"
    //                  className="quill-contents border_solid_top"
    //                  dangerouslySetInnerHTML={ { __html: input.value } } />
    //         </ReactQuill>
    //         </div>
    //
    //         {touched &&
    //         ((error && <span>{error}</span>) ||
    //         (warning && <span>{warning}</span>))}
    //     </div>
    // );
}

export function changeTextEditor() {
    const quill = textEditor();

    quill.setContents = "HELLLLOOO";
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