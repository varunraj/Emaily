// Survey Field contain logic to render a single field.


import React from 'react'

// props contain input object with several methods added by redux-form from parent
const SurveyField =  ({input, label}) =>{
    
    // get all the callbacks from inout method and assign to input field below 
    // code {...input} is same as onClick={input.onClick} onBlur= {input.onBlur}. All such callbacks are assigend at one go.

    return (
        <div>
            <label>{label}</label>
            <input {...input} />
        </div>
    )
}

export default SurveyField;