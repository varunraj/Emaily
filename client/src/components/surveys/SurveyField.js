// Survey Field contain logic to render a single field.


import React from 'react'

// props contain input object with several methods added by redux-form from parent

// below code will pull error and touch out of meta using es6 destrcturing 
const SurveyField =  ({input, label, meta:{error, touched}}) =>{

    // meta contains error if validation fails


    // get all the callbacks from inout method and assign to input field below 
    // code {...input} is same as onClick={input.onClick} onBlur= {input.onBlur}. All such callbacks are assigend at one go.

    // {touched&&error} touched is boolean. If its true, then show error if present

    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom:'5px'}} />
            <div className="red-text" style={{marginBottom:'20px'}}>
            {touched && error}
            </div>
        </div>
    )
}

export default SurveyField;