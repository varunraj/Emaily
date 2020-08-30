// Form for the user to enter all survey details

import React from 'react';
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import _ from 'lodash';
import {Link} from 'react-router-dom'
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields'


class SurveyForm extends React.Component{


    renderFields(){
        return _.map(formFields, (field) => {
          return <Field key={field.name}
                        component={SurveyField} 
                        type="text" 
                        label={field.label}
                        name={field.name}  />
        })
        
    }

    render(){
        // handleSubmit is a prop added by redux-form which will contain all values from form
        return(
            <div> 
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} >
                    {this.renderFields()}         
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>  
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
                
        )
    }

}

// values will contain all form values

function validate(values){
    const errors = {}

    
    errors.emails = validateEmails(values.emails || '')

    _.each(formFields, ({name})=>{
        if(!values[name]){
            errors[name]= "You must provide a value"
        }
    })

    // when form render first, no emails present, so we need to 
    // send empty string to validateEmail otherwise it will break

    



    // if errors object is empty, then redux assume all good.
    return errors;
}


// funciton passed to validate will be executed any time user submits
//distroyOnUnmount will keep in the values in form on back button

export default reduxForm({
    validate: validate,
    form:'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);
