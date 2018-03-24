
import axios from 'axios';
//lib
import config from '../../configure';
import actions from 'redux-form/lib/actions';

const BASE_URL = config.BASE_URL
export const loadRooms = (term='')=>{
    return(dispatch)=>{
        dispatch({type:'LOAD_OPERATIONROOMS_PENDING'})
        return axios({
                url:`${BASE_URL}/operation_room?term=${term}`,
                method:'get',
                headers: { authorization: localStorage.getItem('token') }
        }).then(results =>{
            dispatch({type:'LOAD_OPERATIONROOMS_SUCCESS', payload:results.data})
           
        }).catch(err=>{
            dispatch({type:'LOAD_OPERATIONROOMS_REJECTED', payload:err.message})
        })
    }
}
