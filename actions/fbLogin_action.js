import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  LOGIN_STATUS_CHANGED,
  ERROR_SET,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from './types';
import {Platform} from 'react-native'
import { NetworkConstants } from './../config/appConstants'
let ls = require('react-native-local-storage');
import NavigatorService from './../utils/navigator';


export const fb_login_action = (values) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_STATUS_CHANGED,
      payload: 'loading'
    })

    if(values.type == 'success') {
      let insertData = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.profile.name,
          email: values.profile.email,
          apptype: Platform.OS === 'android' ? 'android' : 'ios',
          fb_id: values.profile.id,
          image_url: values.profile.picture.data.url
        })
      }
      fetch(NetworkConstants.RequestUrl('fbsignup'), insertData).then ((res) => {
        res.json().then(function(data) {
          ls.save('userdata', JSON.stringify(data)).then(() => {
            dispatch({
              type: FACEBOOK_LOGIN_SUCCESS,
              payload: data
            })
            NavigatorService.reset('dashboard_screen');
          })
        })

        

      }).catch((err) => {
        console.log("ERROR---", err);
        
      })
  
          } else {
              dispatch({
                type: FACEBOOK_LOGIN_FAIL,
                payload: 'failed'
              })
          }

  }

}
