//กำหนดค่าเริ่มต้นให้ state เช่น เช็คว่าข้อมูลที่ดึงมา error หรือไม่เราก็จะเช็คจาก isRejected
//ซึ่งถ้าเราไม่กำหนด state  เริ่มต้นก็จะไม่มี object ชื่อ isRejected ให้เรียกใช้งาน
const initialState = {
    users: { data: null, isLoading: true, isRejected: false },
    user: { data: null, isLoading: true, isRejected: false },
    userDelete: { success: false, isLoading: true, isRejected: false },
    userSave: { data: null, isLoading: true, isRejected: false },
}

export default (state = initialState, action) => {
    switch (action.type) {
        //เก็บ state การดึงข้อมูลผู้ใช้ทั้งหมด
        case 'LOAD_USERS_PENDING':
            return { ...state, users: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_USERS_SUCCESS':
            return { ...state, users: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_USERS_REJECTED':
            return { ...state, users: { data: action.payload, isLoading: false, isRejected: true } }

        //เก็บ state การดึงข้อมูลผู้ใช้ตาม id ที่ส่งไป
        case 'LOAD_USER_PENDING':
            return { ...state, user: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_USER_SUCCESS':
            return { ...state, user: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_USER_REJECTED':
            return { ...state, user: { data: action.payload, isLoading: false, isRejected: true } }

        //เก็บ state การลบข้อมูลผู้ใช้
        case 'DELETE_USER_SUCCESS':
            return { ...state, userDelete: { data: true, isLoading: false, isRejected: false } }
        case 'DELETE_USER_REJECTED':
            return { ...state, userDelete: { data: action.payload, isLoading: false, isRejected: true } }

        //เก็บ state สถานะการบันทึกข้อมูลผู้ใช้
        case 'SAVE_USER_SUCCESS':
            return { ...state, userSave: { data: null, isLoading: false, isRejected: false } }
        case 'SAVE_USER_REJECTED':
            return { ...state, userSave: { data: action.payload, isLoading: false, isRejected: true } }

        default:
            return state
    }
}