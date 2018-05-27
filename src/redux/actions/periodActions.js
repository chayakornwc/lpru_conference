import axios from 'axios';
//lib
import config from '../../configure';
import actions from 'redux-form/lib/actions';
//config
const BASE_URL = config.BASE_URL

// loadPeriod for loops
export const loadPeriods =(term='')=>{
    return(dispatch) =>{
        dispatch({type:'LOAD_PERIODS_PENDING'})
        return axios.get(`${BASE_URL}/period?term=${term}`,{
            }).then( results =>{
                dispatch({type:'LOAD_PERIODS_SUCCESS', payload:results.data})  
            }).catch(err=>{
                dispatch({type:'LOAD_PERIODS_REJECTED',payload: err.message})
            })  
    }
}

 // get period by id
export const getPeriod = (id)=>{
    return(dispatch) =>{
        dispatch({type:'LOAD_PERIOD_PENDING'})
        return axios.get(`${BASE_URL}/period/${id}`,{
        }).then( results=>{
            dispatch({type:'LOAD_PERIOD_SUCCESS', payload:results.data})
        }).catch(err=>{
            dispatch({type:'LOAD_PERIOD_REJECTED',payload:err.message})
        })
    }
}   

// reset error message
export const resetStatus = () =>{
    return(dispatch)=>{
        dispatch({type:'SAVE_PERIOD_SUCCESS'})
    }
    
}