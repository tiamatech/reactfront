import { combineReducers } from 'redux';
import authReducer from '../../features/auth/authSlice';
import factoryReducer from '../../features/factory/factorySlice';

const rootReducer = combineReducers({
  auth: authReducer,
  factory: factoryReducer
});

export default rootReducer;
