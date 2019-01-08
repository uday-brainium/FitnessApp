import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  LOGIN_STATUS_CHANGED,
  ERROR_SET,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from './types';

let ls = require('react-native-local-storage');
import NavigatorService from './../utils/navigator';


export const fb_login_action = (values) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_STATUS_CHANGED,
      payload: 'loading'
    })

    if(values.type == 'success') {
        ls.save('userdata', JSON.stringify(values.profile)).then(() => {
              dispatch({
                type: FACEBOOK_LOGIN_SUCCESS,
                payload: values.profile
              })
              NavigatorService.reset('dashboard_screen');
            })
          } else {
              dispatch({
                type: FACEBOOK_LOGIN_FAIL,
                payload: 'failed'
              })
          }

  }

}
