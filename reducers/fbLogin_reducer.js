import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  LOGIN_STATUS_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
 } from '../actions/types';

export default function(state = {}, action) {
  console.log('REDUCERLogin__', action);
    switch (action.type) {
      case FACEBOOK_LOGIN_SUCCESS:
        return { ...state, fbuserData: action.payload };
      case FACEBOOK_LOGIN_FAIL:
        return { ...state, fbuserData: action.payload };
      case LOGIN_STATUS_CHANGED:
        return { ...state, fbuserData: action.payload };
      case LOGIN_USER_SUCCESS:
        return { ...state, user: action.payload, loginStatus: 'loggedin' };
      case LOGIN_USER_FAIL:
        return { ...state, error: action.payload, loginStatus: 'loginfailed' };
      default:
        return state;
    }
  }
