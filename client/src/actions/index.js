import axios from 'axios'
import { FETCH_USER } from './types'



export const fetchUser = () => async dispatch => {
        const res = await axios.get('/api/current_user')
        dispatch({type:FETCH_USER, payload:res.data })
    }

export const handleToken = (token) => {
    return async (dispatch)=>{
        const res = await axios.post('/api/stripe',token)
        // below response will have user credits from user model
        dispatch({type:FETCH_USER, payload:res.data})
    }
}

// history is passed from survey submit button for url reroute to dashboard.
export const submitSurvey = (values, history)=>{
    return async (dispatch)=>{
        const res = await axios.post('/api/surveys',values)
        history.push('/surveys')
        // below response will have user credits from user model
        dispatch({type:FETCH_USER, payload:res.data})
    }

}

