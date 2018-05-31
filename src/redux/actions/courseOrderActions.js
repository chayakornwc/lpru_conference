import axios from 'axios';
//lib
import config from '../../configure';
//config
const BASE_URL = config.BASE_URL

// loadPeriod for loops
export const loadOrder =(id)=>{
    return(dispatch) =>{
        dispatch({type:'LOAD_ATTENDS_PENDING'})
        return axios.get(`${BASE_URL}/courseOrder/period/${id}`,{
            }).then( results =>{
                dispatch({type:'LOAD_PERIODS_SUCCESS', payload:results.data})  
            }).catch(err=>{
                dispatch({type:'LOAD_PERIODS_REJECTED',payload: err.message})
            })  
    }
}

 // สมัครอบรม
export const Attends = (values)=>{
    return(dispatch) =>{
        dispatch({type:'SAVE_ATTENDS_PENDING'})
        return axios({
            url:`${BASE_URL}/attendee/${values.id}`,
            method:'post',
            data:values,
            headers: { 
                authorization: localStorage.getItem('token') 
            }
        }).then( results=>{
            if(results.status =201){
                dispatch({type:'SAVE_ATTENDS_REJECTED', payload:results.data})
            }else{
                dispatch({type:'SAVE_ATTENDS_SUCCESS', payload:results.data})
            }
           
        }).catch(err=>{
            dispatch({type:'SAVE_ATTENDS_REJECTED',payload:err.message})
        })
    }
}   

// reset error message
export const resetStatus = () =>{
    return(dispatch)=>{
        dispatch({type:'SAVE_ATTENDS_SUCCESS'})
    }
    
}