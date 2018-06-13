import axios from 'axios';
//lib

import config from '../../configure';
import { values } from 'redux-form';
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
export const saveExamination = (values) =>{
    return(dispatch)=>{
        dispatch({
            type:'SAVE_EXAMINATION_PENDING'
        })
        return axios({
            method:'post',
            data:values,
            url:`${BASE_URL}/examination/save`,
            headers:{
                authorization:localStorage.getItem('token')
            }
        }).then(results =>{
            if(results.status){
                dispatch({
                    type:'SAVE_EXAMINATION_REJECTED',
                    payload:results.data.message,
                })
            }else{
                dispatch({
                    type:'SAVE_EXAMINATION_SUCCESS',
                    payload:results.message,
                })
            }
        }).catch(err=>{
            dispatch({
                type:'SAVE_EXAMINATION_REJECTED',
                payload:err.message
            })
        })
    }
}
export const examinationChecker = (data) =>{
    return (dispatch)=>{ 
        dispatch({
            type:'LOAD_EXAMINATIONCHECKER_PENDING'
        })
        return axios({
            method:'get',
            url:`${BASE_URL}/examination/check/${data.per_id}/${data.sub}`,
            headers:{authorization:localStorage.getItem('token')}
        }).then(results =>{
            dispatch({
                type:'LOAD_EXAMINATIONCHECKER_SUCCESS',
                payload:results.data
            })
        }).catch(err=>{
            dispatch({
                type:'LOAD_EXAMINATIONCHECKER_REJECTED',
                payload:err.message
            })
        })
    }
}
   
    
// only one action dispatch courseReducers

