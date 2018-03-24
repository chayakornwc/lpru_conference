const initialState = {
    courses:{data:null, isLoading:true, isRejected: false},
    course:{data:null, isLoading:true, isRejected: false},
    courseDelete:{data:null, isLoading:true, isRejected: false},
    courseSave:{data:null, isLoading:true, isRejected: false}
}

export default (state = initialState, action) =>{
    switch (action.type){
        // state ของข้อมูลทั้งหมด
        case'LOAD_COURSES_PENDING':
        return {...state, courses:{data:null, isLoading:true, isRejected:false}}
        case'LOAD_COURSES_SUCCESS':
        return{...state, courses:{data:action.payload, isLoading:false, isRejected:false}}
        case'LOAD_COURSES_REJECTED':
        return{...state, courses:{data:action.payload, isLoading:false, isRejected:true}}

         // การดึงข้อมูลตามไอดีที่ส่งไป 
        case'LOAD_COURSE_PENDING':
        return {...state, course:{data:null, isLoading:true, isRejected:false}}
        case'LOAD_COURSE_SUCCESS':
        return{...state, course:{data:action.payload, isLoading:false, isRejected:false}}
        case'LOAD_COURSE_REJECTED':
        return{...state, course:{data:action.payload, isLoading:false, isRejected:true}}

       //การลบข้อมูล
        case'DELETE_COURSE_SUCCESS':
        return{...state, courseDelete:{data:null, isLoading:false, isRejected:false}}
        case'DELETE_COURSE_REJECTED':
        return{...state, courseDelete:{data:action.payload, isLoading:false, isRejected:true}}

        //การบันทึกข้อมูล  
        case'SAVE_COURSE_SUCCESS':
        return{...state, courseSave:{data:null, isLoading:false, isRejected:false}}
        case'SAVE_COURSE_REJECTED':
        return{...state, courseSave:{data:action.payload, isLoading:false, isRejected:true}}

        default: 
        return state
    }
}