const initialState = {
    attenders:{data:null, isLoading:true, isRejected: false},
  
}

export default (state = initialState, action) =>{
    switch (action.type){
      case 'LOAD_ATTENDERS_PENDING'
      : return {...state, attenders:{data:null, isLoading:true, isRejected:false}}
      case 'LOAD_ATTENDERS_SUCCESS'
      : return {...state, attenders:{data:action.payload, isLoading:false, isRejected:false}}
      case 'LOAD_ATTENDERS_REJECTED'
      : return {...state, attenders:{data:action.payload, isLoading:false, isRejected:true}}
        default: 
        return state
    }
}