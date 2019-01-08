import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import FacebookReducer from './FacebookReducer'
import UserDataReducer from './UserDataReducer'
import fbLogin_reducer from './fbLogin_reducer'


export default combineReducers({
  auth: AuthReducer,
  fbauth: FacebookReducer,
  userdata: UserDataReducer,
  fbuserData: fbLogin_reducer
});
