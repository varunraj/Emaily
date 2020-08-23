import React, {Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Header';
import { fetchUser } from '../actions';
import {connect} from 'react-redux'
import Landing from './Landing'

const Dashboard = () => {
    return <h2>Dashboard</h2>
}
const SurveyNew = () => {
    return <h2>SurveyNew</h2>
}



class App extends Component {
  
    componentDidMount(){
        this.props.fetchUser()
    }


    render() {
        return (
            <div className="container">
                <BrowserRouter >
                    <div>
                        <Header /> 
                        <Route exact={true} path="/" component={Landing} />
                        <Route exact={true} path="/surveys" component={Dashboard} /> 
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
            )
    }
}
export default connect(null, {fetchUser} )(App)