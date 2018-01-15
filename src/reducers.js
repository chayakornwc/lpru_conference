import { combineReducers } from 'redux';
function countAge(state = 0, action) {
    switch (action.type) {
    case 'INCREMENT':
    return state + 1
    case 'DECREMENT':
    return state - 1
    default:
    return state
    }
    }

function email(state = "",action){
    switch(action.type){
        case 'SETDATA':
        return state = action.payload
        default:
        return state
    }
}


    const initialState = {isRejected: true, data: null}

    function albums(state = initialState, action) {
        switch (action.type) {
        case 'LOAD_ALBUMS_PENDING':
        return {
        isRejected: false,
        data: null
        }
        case 'LOAD_ALBUMS_FULFILLED':
        return {
        isRejected: false,
        data: action.payload
        }
        case 'LOAD_ALBUMS_REJECTED':
        return {
        isRejected: true,
        data: null
        }
        default:
        return state
        }
        }
    function registration(state = initialState, action){
        switch (action.type) {
            case 'CHANGE':
            return {
            state
            }
            case 'LOAD_FORM_FULFILLED':
            return {
            isRejected: false,
            data: action.payload
            }
            case 'LOAD_FORM_REJECTED':
            return {
            isRejected: true,
            data: null
            }
            default:
            return state
            }
    }
    function users(state = initialState, action) {
        switch (action.type) {
        case 'LOAD_USERS_PENDING':
        return {
        isRejected: false,
        data: null
        }
        case 'LOAD_USERS_FULFILLED':
        return {
        isRejected: false,
        data: action.payload
        }
        case 'LOAD_USERS_REJECTED':
        return {
        isRejected: true,
        data: null
        }
        default:
        return state
        }
        }
        function photos(state = initialState, action) {
            switch (action.type) {
            case 'LOAD_PHOTOS_PENDING':
            return {
            isRejected: false,
            data: null
            }
            case 'LOAD_PHOTOS_FULFILLED':
            return {
            isRejected: false,
            data: action.payload
            }
            case 'LOAD_PHOTOS_REJECTED':
            return {
            isRejected: true,
            data: null
            }
            default:
            return state
            }
            }
    const reducers = combineReducers({
    countAge,
    users,
    albums,
    photos,
    registration,
    email
    })
    export default reducers