const initialState = {
    examinations:{data:null, isLoading:true, isRejected: false},
    examinationsSave:{data:null, isLoading:true, isRejected: false}
}

export default (state = initialState, action) =>{
    switch (action.type){
        // state ของข้อมูลทั้งหมด
        case'LOAD_EXAMINATION_PENDING':
        return {...state, examinations:{data:null, isLoading:true, isRejected:false}}
        case'LOAD_EXAMINATION_SUCCESS':
        return{...state, examinations:{data:action.payload, isLoading:false, isRejected:false}}
        case'LOAD_EXAMINATION_REJECTED':
        return{...state, examinations:{data:action.payload, isLoading:false, isRejected:true}}
        
        case'SAVE_EXAMINATION_PENDING':
        return {...state, examinationsSave:{data:null, isLoading:true, isRejected:false}}
        case'SAVE_EXAMINATION_SUCCESS':
        return{...state, examinationsSave:{data:action.payload, isLoading:false, isRejected:false}}
        case'SAVE_EXAMINATION_REJECTED ':
        return{...state, examinationsSave:{data:action.payload, isLoading:false, isRejected:true}}


        default: 
        return state
    }
}