import React from 'react';
import { Field, FieldArray } from 'redux-form';

// Locations consists of city and region

export const postJobFormValidation = values => {
    const errors = {};
    const locationArrayErrors = [];

    if( !values.title ) {
        errors.title = `${ values.title } is required`;
    }

    // values.forEach( value => {
    //     if( !value ) {
    //         return errors[ value ] = `${ values[ value ] } is required`;
    //     }
    // } );

    // if( !values.example_one ) {
    //     errors.name = `${ values.name } is required`;
    // }

    if( !values.locations || !values.locations.length ) {
        errors.locations = { _error: 'At least one location is required' };
    } else {
        values.locations.forEach( ( location, index ) => {
            const locationErrors = {};

            if( !location ) {
                locationErrors.name = `${ location } is required`;
                locationArrayErrors[ index ] = locationErrors;
            }
        } );

        if( locationArrayErrors.length ) {
            errors.locations = locationArrayErrors;
        }
    }
    return errors;
};




const renderField = ({ input, label, type, meta: { touched, error } }) =>
    <div>
        <label>
            {label}
        </label>
        <div>
            <input {...input} type={type} placeholder={label} />
            {touched &&
            error &&
            <span>
          {error}
        </span>}
        </div>
    </div>

const renderHobbies = ({ fields, meta: { error } }) =>
    <ul>
        <li>
            <button type="button" onClick={() => fields.push()}>
                Add Hobby
            </button>
        </li>
        {fields.map((hobby, index) =>
            <li key={index}>
                <button
                    type="button"
                    title="Remove Hobby"
                    onClick={() => fields.remove(index)}
                />
                <Field
                    name={hobby}
                    type="text"
                    component={renderField}
                    label={`Hobby #${index + 1}`}
                />
            </li>
        )}
        {error &&
        <li className="error">
            {error}
        </li>}
    </ul>

const renderMembers = ({ fields, meta: { error, submitFailed } }) =>
    <ul>
        <li>
            <button type="button" onClick={() => fields.push({})}>
                Add Member
            </button>
            {submitFailed &&
            error &&
            <span>
          {error}
        </span>}
        </li>
        {fields.map((member, index) =>
            <li key={index}>
                <button
                    type="button"
                    title="Remove Member"
                    onClick={() => fields.remove(index)}
                />
                <h4>
                    Member #{index + 1}
                </h4>
                <Field
                    name={`${member}.firstName`}
                    type="text"
                    component={renderField}
                    label="First Name"
                />
                <Field
                    name={`${member}.lastName`}
                    type="text"
                    component={renderField}
                    label="Last Name"
                />
                <FieldArray name={`${member}.hobbies`} component={renderHobbies} />
            </li>
        )}
    </ul>;

const FieldArraysForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="clubName"
                type="text"
                component={renderField}
                label="Club Name"
            />
            <FieldArray name="members" component={renderMembers} />
            <div>
                <button type="submit" disabled={submitting}>
                    Submit
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
        </form>
    )
};