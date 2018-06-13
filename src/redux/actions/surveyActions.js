import axios from 'axios';
//lib


//config
import config from '../../configure';
import actions from 'redux-form/lib/actions';
const BASE_URL = config.BASE_URL
 
export const saveSurvey = (values)=>{
    return(dispatch) =>{
            dispatch({
                type:'SAVE_SURVEY_PENDING'
            })
            return axios({
                method:'post',
                url:`${BASE_URL}/survey`,
                data:values,
                headers:{authorization: localStorage.getItem('token')}
            }).then(results=>{
                dispatch({
                    type:'SAVE_SURVEY_SUCCESS',
                    payload:results.data
                })
            }).catch(err=>{
                dispatch({
                    type:'SAVE_SURVEY_REJECTED',
                    payload:err.message
                })
            })
    }
}