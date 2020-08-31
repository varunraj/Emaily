// shows user form text for review

import React from 'react'
import {connect } from 'react-redux'
import formFields from './formFields'
import _ from 'lodash'
import {withRouter} from 'react-router-dom';
import * as actions from '../../actions'

// history object is injected into prop by withRouter 
const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) =>{
    
    
    const reviewFields = _.map(formFields, field =>{
        return (
            <div key={field.name}>
                <label>{field.label}</label>
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
                onClick={()=>submitSurvey(formValues, history)} // pass router history to action creator    
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


//withRouter is used to redirect user back to dashboard after submitting 
// the survey
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
