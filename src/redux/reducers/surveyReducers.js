//กำหนดค่าเริ่มต้นให้ state เช่น เช็คว่าข้อมูลที่ดึงมา error หรือไม่เราก็จะเช็คจาก isRejected
//ซึ่งถ้าเราไม่กำหนด state  เริ่มต้นก็จะไม่มี object ชื่อ isRejected ให้เรียกใช้งาน
const initialState = {
    surveySave: { data: null, isLoading: true, isRejected: false },

}

export default (state = initialState, action) => {
    switch (action.type) {
        //เก็บ state การดึงข้อมูลผู้ใช้ทั้งหมด
        case 'SAVE_SURVEY_PENDING':
            return { ...state, surveySave: { data: null, isLoading: true, isRejected: false } }
        case 'SAVE_SURVEY_SUCCESS':
            return { ...state, surveySave: { data: action.payload, isLoading: false, isRejected: false } }
        case 'SAVE_SURVEY_REJECTED':
            return { ...state, surveySave: { data: action.payload, isLoading: false, isRejected: true } }

    

        default:
            return state
    }
}