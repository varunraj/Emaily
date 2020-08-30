// SurveyNew will contain both surveyForm and surveyReview

import React from 'react';
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'
import {reduxForm} from 'redux-form';

class SurveyNew extends React.Component{


    state = { showFormReview: false };

    renderContent(){
        if(this.state.showFormReview) {
            return <SurveyFormReview onCancel={()=>this.setState({showFormReview : false})}/>
        } 

        return <SurveyForm 
            onSurveySubmit={()=> this.setState({ showFormReview : true})} 
        />
    }


    render(){
        return(
            <div>
                {this.renderContent()}
            </div>
                
        )
    }

}

// below we dont use destroyonUnmount option. So form will clear 
// once user move away from surveyNew
export default reduxForm({
    form:'surveyForm'
})(SurveyNew);