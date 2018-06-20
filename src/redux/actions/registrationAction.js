import axios from 'axios'
import config from '../../configure'
import { browserHistory } from 'react-router'
const BASE_URL = config.BASE_URL;


//ฟังก์ชันดึงข้อมูลสถานที่ทุกรายการโดยจะส่ง query ชื่อ term เข้าไปด้วยเพื่อนำไป filter
//สำหรับ es6 เราสามารถก􀄞ำหนดค่า default ของ parameter ได้ด้วยครับ
export const loadLocations = (term = '') => {
return (dispatch) => {
//ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
dispatch({ type: 'POST_PENDING' })
return axios.get(`${BASE_URL}/locations?term=${term}`, {
//ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
//เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
headers: { authorization: localStorage.getItem('token') }
}).then(results => {
//เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
//เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
//ที่มี Array อยู่ข้างใน ดังนั้นน􀄞ำไป data.map ได้เลยครับ
dispatch({ type: 'LOAD_LOCATIONS_SUCCESS', payload: results.data })
}).catch(err => {
//กรณี error
dispatch({ type: 'LOAD_LOCATIONS_REJECTED', payload: err.message })
})
}
}

//ฟังก์ชันดึงข้อมูลสถานที่ตาม id ที่ส่ง
export const getLocation = (id) => {
return (dispatch) => {
dispatch({ type: 'LOAD_LOCATION_PENDING' })
return axios.get(`${BASE_URL}/locations/${id}`, {
//ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
//เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
headers: { authorization: localStorage.getItem('token') }
}).then(results => {
//เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
//axios จะส่งข้อมูลกลับมากับ object ชื่อ data
dispatch({ type: 'LOAD_LOCATION_SUCCESS', payload: results.data })
}).catch(err => {
//กรณี error
dispatch({ type: 'LOAD_LOCATION_REJECTED', payload: err.message })
})
}
}
//ฟังก์ชันบันทึกข้อมูลสถานที่ โดยเราจะเช็คว่าเป็นการเพิ่มข้อมูลใหม่ หรือปรับปรุงข้อมูล
export const saveRegister = (values) => {

let _id = ''
let _method = 'post'

if (values.id) {
_id = values.id
_method = 'put'
}
return (dispatch) => {

return axios({
method: _method,
url: `${BASE_URL}/locations/${_id}`,
data: values,
headers: { authorization: localStorage.getItem('token') }
}).then(results => {
//เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ􀄞้ำหรือไม่
//โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
if (results.data.status) {
dispatch({ type: 'SAVE_LOCATION_REJECTED', payload: results.data.message })
} else {
dispatch({ type: 'SAVE_LOCATION_SUCCESS' })
}
}).catch(err => {
//กรณี error
dispatch({ type: 'SAVE_LOCATION_REJECTED', payload: err.message })
})
}
}
//ฟังก์ชันลบข้อมูลสถานที่ตาม id ที่ส่งเข้ามา
export const deleteLocation = (id) => {
return (dispatch) => {
return axios.delete(`${BASE_URL}/locations/${id}`, {
//ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
headers: { authorization: localStorage.getItem('token') }
}).then(results => {
//ลบข้อมูลส􀄞ำเร็จ
dispatch({ type: 'DELETE_LOCATION_SUCCESS' })
}).catch(err => {
//กรณี error
dispatch({ type: 'DELETE_LOCATION_REJECTED', payload: err.message })
})
}
}

//ฟังก์ชันสำหรับ reset ค่า status เพื่อล้างข้อความ error ที่ค้างอยู่
export const resetStatus = () => {
return (dispatch) => {
dispatch({ type: 'SAVE_LOCATION_SUCCESS' })
}
}