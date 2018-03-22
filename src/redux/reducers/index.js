import { combineReducers } from 'redux';
import authReducers from './authReducers';
import userReducers from './userReducers';
import { reducer as formReducer } from 'redux-form'
const rootReducers = combineReducers({
    form: formReducer,
    authReducers,
    userReducers,
    periodReducers,
     
});
export default rootReducers;