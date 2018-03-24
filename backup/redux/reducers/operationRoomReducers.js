const initialState = {
    operation_rooms:{data:null, isLoading:true, isRejected: false},
    operation_room:{data:null, isLoading:true, isRejected: false},
    operation_roomDelete:{data:null, isLoading:true, isRejected: false},
    operation_roomSave:{data:null, isLoading:true, isRejected: false}
}

export default (state = initialState, action) =>{
    switch (action.type){
        // state ของข้อมูลทั้งหมด
        case'LOAD_OPERATIONROOMS_PENDING':
        return {...state, operation_rooms:{data:null, isLoading:true, isRejected:false}}
        case'LOAD_OPERATIONROOMS_SUCCESS':
        return{...state, operation_rooms:{data:action.payload, isLoading:false, isRejected:false}}
        case'LOAD_OPERATIONROOMS_REJECTED':
        return{...state, operation_rooms:{data:action.payload, isLoading:false, isRejected:true}}

         // การดึงข้อมูลตามไอดีที่ส่งไป 
        case'LOAD_OPERATIONROOM_PENDING':
        return {...state, operation_room:{data:null, isLoading:true, isRejected:false}}
        case'LOAD_OPERATIONROOM_SUCCESS':
        return{...state, operation_room:{data:action.payload, isLoading:false, isRejected:false}}
        case'LOAD_OPERATIONROOM_REJECTED':
        return{...state, operation_room:{data:action.payload, isLoading:false, isRejected:true}}

       //การลบข้อมูล
        case'DELETE_OPERATIONROOM_SUCCESS':
        return{...state, operation_roomDelete:{data:null, isLoading:false, isRejected:false}}
        case'DELETE_OPERATIONROOM_REJECTED':
        return{...state, operation_roomDelete:{data:action.payload, isLoading:false, isRejected:true}}

        //การบันทึกข้อมูล  
        case'SAVE_OPERATIONROOM_SUCCESS':
        return{...state, operation_roomSave:{data:null, isLoading:false, isRejected:false}}
        case'SAVE_OPERATIONROOM_REJECTED':
        return{...state, operation_roomSave:{data:action.payload, isLoading:false, isRejected:true}}

        default: 
        return state
    }
}