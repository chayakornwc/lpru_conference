import { combineReducers } from 'redux';
import authReducers from './authReducers';
import userReducers from './userReducers';
import periodReducers from './periodReducers';
import courseReducers from './courseReducer';
import operationRoomReducers from './operationRoomReducers';
import  courseorderReducers from './courseorderReducers';
import attendsReducers from './attendsReducers';
import examinationReducers from './examinationReducers';
import { reducer as formReducer } from 'redux-form'
const rootReducers = combineReducers({
    form: formReducer,
    authReducers,
    userReducers,
    periodReducers,
    courseReducers,
    operationRoomReducers,
    courseorderReducers,
    examinationReducers,
    attendsReducers
    

});
export default rootReducers;