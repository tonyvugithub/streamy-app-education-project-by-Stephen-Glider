import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = (formValues) => {
  //Redux-form will look at errors = { title: 'You must enter a title' } to understand that sth went wrong
  // and then pass the error to props meta of renderInput function
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }
  return errors;
};

const renderInput = ({ input, label, meta: { touched, error } }) => {
  const className = `field ${error && touched && 'error'}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input
        autoComplete="off"
        {...input}
        /* onChange={input.onChange}
        value={input.value} */
      />
      {/*Display error only if the input component is touched */}
      {renderError(error, touched)}
    </div>
  );
};

const renderError = (error, touched) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};

const StreamForm = ({ handleSubmit, onSubmit }) => {
  return (
    <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
      <Field name="title" component={renderInput} label="Enter Title" />
      <Field
        name="description"
        component={renderInput}
        label="Enter Description"
      />
      <button className="ui button primary">Submit</button>
    </form>
  );
};

export default reduxForm({
  form: 'streamForm',
  validate,
})(StreamForm);
