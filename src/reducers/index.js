import { combineReducers } from 'redux';
import isLogin from './isLogin';
import isEditMode from './isEditMode';
import isEditRole from './isEditRole';
import userData from './userData';
import data from './data';
import currentMetadata from './currentMetadata';

const pcmApp = combineReducers({
    isLogin,
    isEditMode,
    isEditRole,
    userData,
    currentMetadata,
    data
})

export default pcmApp