import axios from 'axios'
import config from '../../configure'

//ดึงเอา url ที่ใช้ fetch data มาเก็บไว้ใน BASE_URL
const BASE_URL = config.BASE_URL

//ฟังก์ชันดึงข้อมูลผู้ใช้ทุกรายการโดยจะส่ง query ชื่อ term เข้าไปด้วยเพื่อนำไป filter
//สำหรับ es6 เราสามารถกำหนดค่า default ของ parameter ได้ด้วยครับ
export const loadUsers = (term = '') => {
    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_USERS_PENDING' })
        return axios.get(`${BASE_URL}/users?term=${term}`, {
            //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
            //เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
            //ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ
            dispatch({ type: 'LOAD_USERS_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_USERS_REJECTED', payload: err.message })
        })
    }
}

//ฟังก์ชันดึงข้อมูลผู้ใช้ตาม id ที่ส่ง
export const getUser = (id) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_USER_PENDING' })
        return axios.get(`${BASE_URL}/users/${id}`, {
            //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไป
            //เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //axios จะส่งข้อมูลกลับมากับ object ชื่อ data
            dispatch({ type: 'LOAD_USER_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_USER_REJECTED', payload: err.message })
        })
    }
}

//ฟังก์ชันบันทึกข้อมูลผู้ใช้ โดยเราจะเช็คว่าเป็นการเพิ่มข้อมูลใหม่ หรือปรับปรุงข้อมูล
export const saveUser = (values) => {
    //ถ้ามี values.id แสดงว่าเป็นการบันทึกการปรับปรุงข้อมูลจึงต้องส่ง method put
    //put จะไป match กับ route ฝั่ง server คือ app.put('/users/:id', requireAuth, users.update)
    //แต่ถ้าไม่ใช่ให้ส่ง method post เพื่อเพิ่มข้อมูลใหม่
    //post จะไป match กับ route ฝั่ง server คือ app.post('/users', requireAuth, users.create)
    let _id = ''
    let _method = 'post'
    if (values.id) {
        _id = values.id
        _method = 'put'
    }

    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        return axios({
            method: _method,
            url: `${BASE_URL}/users/${_id}`,
            data: values,
            headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า username ซ้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
            if (results.data.status) {
                dispatch({ type: 'SAVE_USER_REJECTED', payload: results.data.message })
            } else {
                dispatch({ type: 'SAVE_USER_SUCCESS' })
            }
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'SAVE_USER_REJECTED', payload: err.message })
        })
    }
}

//ฟังก์ชันลบข้อมูลผู้ใช้ตาม id ที่ส่งเข้ามา
export const deleteUser = (id) => {
    return (dispatch) => {
        return axios.delete(`${BASE_URL}/users/${id}`, {
            //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
            headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            //ลบข้อมูลสำเร็จ
            dispatch({ type: 'DELETE_USER_SUCCESS' })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'DELETE_USER_REJECTED', payload: err.message })
        })
    }
}

//ฟังก์ชันสำหรับ reset ค่า status เพื่อล้างข้อความ error ที่ค้างอยู่
export const resetStatus = () => {
    return (dispatch) => {
        dispatch({ type: 'SAVE_USER_SUCCESS' })
    }
}