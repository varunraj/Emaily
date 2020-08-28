// Form for the user to enter all survey details

import React from 'react';
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import _ from 'lodash';
import {Link} from 'react-router-dom'

const FIELDS = [
    {label:'Survey Title', name:'title'},
    {label:'Subject Line', name:'subject'},
    {label:'Email Body', name:'body'},
    {label:'Recipient List', name:'emails'},
        
]

class SurveyForm extends React.Component{


    renderFields(){
        return _.map(FIELDS, (field) => {
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
                <form onSubmit={this.props.handleSubmit(values=>console.log(values))} >
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


export default reduxForm({
    form:'surveyForm'
})(SurveyForm);