

const initialState = {
    registration: { data: null, isLoading: true, isRejected: false },
  
    }
    export default (state = initialState, action) =>{
        switch (action.type){
                case 'POST_PENDING':
                return {...state, registration: {data:null, isLoading: true, isRejected: false} }
                break;
                case 'SET_DATA':
                return{...state, registration:{data:action.payload, isLoading:false, isRejected:false }} 
                break;
                case 'LOAD_REJECTED': 
                return {...state, registration:{data:action.payload, isLoading:false, isRejected:false }} 
                break;
            default: return state
        }
    }