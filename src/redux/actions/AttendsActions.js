import axios from 'axios';
import config from '../../configure';

//config
const BASE_URL = config.BASE_URL

export const getAttendee = (id)=>{
    return(dispatch) => {
        dispatch({type:'LOAD_ATTENDERS_PENDING'})
        return  axios.get(`${BASE_URL}/attendee/${id}`).then( results =>{
            dispatch({type:'LOAD_ATTENDERS_SUCCESS',  payload:results.data})
        }).catch(err=>{
            dispatch({type:'LOAD_ATTENDERS_REJECTED', payload:err.message})
        })
    }
}
