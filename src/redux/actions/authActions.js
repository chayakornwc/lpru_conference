import axios from 'axios'
import config from '../../configure'
import { browserHistory } from 'react-router'
import jwtDecode from 'jwt-decode';

const BASE_URL = config.BASE_URL

export const signin = ({ username, password }) => {
    return (dispatch) => {
                return axios({
                    method: "post",
                    url: `${BASE_URL}/signin`,
                    data: { username, password }
                    }).then(response => {
                        localStorage.setItem('token', response.data.token)
                        const token = localStorage.getItem('token')
                            dispatch({
                            type: 'AUTH_USER',
                            payload: jwtDecode(token)
                            })
                            setTimeout(function(){ 
                                browserHistory.push('/')
                            }, 300);
                               
                           
                     }).catch(() => {
                             dispatch({ type: 'AUTH_ERROR', payload: "Login failed wrong username or password." })
                            })
                }
        }
export const updateToken=()=>{
        return (dispatch)=>{
            return axios({
                method:"get",
                url:`${BASE_URL}/updateToken`,
                headers:{authorization:localStorage.getItem('token')}
            }).then(response=>{
                localStorage.setItem('token', response.data.token)
                const token = localStorage.getItem('token')
                    dispatch({
                        type:'AUTH_USER',
                        payload:jwtDecode(token)
                    })
                    console.log(jwtDecode(token))
            }).catch(()=>{
                dispatch({
                    type:'AUTH_ERROR', payload:'Authorization Failed'
                })
            })
        }
}
        export const signout = () => {
            return (dispatch) => {
                localStorage.removeItem('token')
                dispatch({ type: 'UNAUTH_USER' })
                browserHistory.push('/signin')
                }
        }