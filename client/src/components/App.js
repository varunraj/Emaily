import React, {Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Header';
import { fetchUser } from '../actions';
import {connect} from 'react-redux'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew';




class App extends Component {
  
    componentDidMount(){
        this.props.fetchUser()
    }


    render() {
        return (
            
                <BrowserRouter >
                    <div className="container">
                        <Header /> 
                        <Route exact={true} path="/" component={Landing} />
                        <Route exact={true} path="/surveys" component={Dashboard} /> 
                        <Route exact={true} path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            
            )
    }
}
export default connect(null, {fetchUser} )(App)