const initialState = {
    attendsSave:{data:null, isLoading:true, isRejected: false},
    orders:{data:null, isLoading:true, isRejected:false}
}
export default (state = initialState, action) =>{
    switch (action.type){
        // state ของข้อมูลทั้งหมด
        case'SAVE_ATTENDS_PENDING':
        return {...state, attendsSave:{data:null, isLoading:true, isRejected:false}}
        case'SAVE_ATTENDS_SUCCESS':
        return {...state, attendsSave:{data:action.payload, isLoading:false, isRejected:false}}
        case'SAVE_ATTENDS_REJECTED':
        return {...state, attendsSave:{data:action.payload, isLoading:false, isRejected:true}}

        case'LOAD_ORDERS_PEDNING':
        return{...state, orders:{data:null, isLoading:true, isRejected:false}}
        case'LOAD_ORDERS_SUCCESS':
        return {...state, orders:{data:action.payload, isLoading:false, isRejected:false}}
        case'LOAD_ORDERS_REJECTED':
        return{...state, orders:{data:action.payload, isLoading:false, isRejected:true}}
     
        

        default: 
        return state
    }
}