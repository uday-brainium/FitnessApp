import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import FacebookReducer from './FacebookReducer'
import UserDataReducer from './UserDataReducer'
import fbLogin_reducer from './fbLogin_reducer'
import activity from './Activity_reducer'
import overall_activity from './Overall_activity_reducer'

export default combineReducers({
  auth: AuthReducer,
  fbauth: FacebookReducer,
  userdata: UserDataReducer,
  fbuserData: fbLogin_reducer,
  activityData: activity,
  overallActivity: overall_activity
});
