import { combineReducers } from 'redux';
import authReducers from './authReducers';
import userReducers from './userReducers';

const rootReducers = combineReducers({
    authReducers,
    userReducers 
});
export default rootReducers;