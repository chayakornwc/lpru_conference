const initialState = {
    periods:{data:null, isLoading:true, isRejected: false},
    period:{data:null, isLoading:true, isRejected: false},
    periodDelete:{data:null, isLoading:true, isRejected: false},
    periodSave:{data:null, isLoading:true, isRejected: false}
}

export default (state = initialState, action) =>{
    switch (action.type){
        // state ของข้อมูลทั้งหมด
        case'LOAD_PERIODS_PENDING':
        return {...state, periods:{data:null, isLoading:true, isRejected:false}}
        case'LOAD_PERIODS_SUCCESS':
        return{...state, periods:{data:action.payload, isLoading:false, isRejected:false}}
        case'LOAD_PERIODS_REJECTED':
        return{...state, periods:{data:action.payload, isLoading:false, isRejected:true}}

         // การดึงข้อมูลตามไอดีที่ส่งไป 
        case'LOAD_PERIOD_PENDING':
        return {...state, period:{data:null, isLoading:true, isRejected:false}}
        case'LOAD_PERIOD_SUCCESS':
        return{...state, period:{data:action.payload, isLoading:false, isRejected:false}}
        case'LOAD_PERIOD_REJECTED':
        return{...state, period:{data:action.payload, isLoading:false, isRejected:true}}

       //การลบข้อมูล
        case'DELETE_PERIOD_SUCCESS':
        return{...state, periodDelete:{data:null, isLoading:false, isRejected:false}}
        case'DELETE_PERIOD_REJECTED':
        return{...state, periodDelete:{data:action.payload, isLoading:false, isRejected:true}}

        //การบันทึกข้อมูล  
        case'SAVE_PERIOD_SUCCESS':
        return{...state, periodSave:{data:null, isLoading:false, isRejected:false}}
        case'SAVE_PERIOD_REJECTED':
        return{...state, periodSave:{data:action.payload, isLoading:false, isRejected:true}}

        default: 
        return state
    }
}