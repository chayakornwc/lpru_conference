//Reducer เก็บ State เกี่ยวกับการ Signin/Signout
const initialState = {
    authenticated:false,
    data:null,
    error:null,
    message:null
}

export default (state = initialState, action) => {
    switch (action.type) {
    case 'AUTH_USER':
    return { ...state, authenticated: true, data: action.payload } //break
    case 'UNAUTH_USER':
    return { ...state, authenticated: false, data: null, error: null } //break
    case 'AUTH_ERROR':
    return { ...state, error: action.payload } //break
    case 'FETCH_MESSAGE':
    return { ...state, message: action.payload } //break
    default:
    return state
    }
    }