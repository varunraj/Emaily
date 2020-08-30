// shows user form text for review

import React from 'react'
import {connect } from 'react-redux'
import formFields from './formFields'
import _ from 'lodash'
import * as actions from '../../actions'

const SurveyFormReview = ({onCancel, formValues, submitSurvey}) =>{
    
    
    const reviewFields = _.map(formFields, field =>{
        return (
            <div key={field.name}>
                <lablel>{field.label}</lablel>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        )
    })
    
    
    
    return (
        <div>
            <h5>Please validate your entries </h5>
            {reviewFields}

            <button 
                className="yellow darken-3 btn-flat"
                onClick={onCancel}
            >
                Back
            </button>
            <button 
                className="green btn-flat right"
                onClick={()=>submitSurvey(formValues)}    
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

function mapStateToProps(state){
    return {
        formValues:state.form.surveyForm.values
    };
}



export default connect(mapStateToProps, actions)(SurveyFormReview);