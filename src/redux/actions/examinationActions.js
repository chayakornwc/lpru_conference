import axios from 'axios';
//lib

import config from '../../configure';
//config
const BASE_URL = config.BASE_URL

export const getExamination = (id) => { //  get by course_id
    return(dispatch)=>{
        dispatch({type:'LOAD_EXAMINATION_PENDING'})
        return axios.get(`${BASE_URL}/examination/${id}`,{
            headers:{authorization:localStorage.getItem('token')}
        }).then(results =>{
            dispatch({type:'LOAD_EXAMINATION_SUCCESS', payload:results.data})
        }).catch(err =>{
            dispatch({type:'LOAD_EXAMINATION_REJECTED',payload:err.message})
        })
    }
}

   
    
// only one action dispatch courseReducers

