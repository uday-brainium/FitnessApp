import {
    IS_SUBSCRIBED,
  } from './types';
import { NetworkConstants } from '../config/appConstants'
import qs from 'qs'

export const check_subscription = (userid) => {
    return async (dispatch) => {
      let header = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: qs.stringify({
             userid
          })
        }
      fetch(NetworkConstants.RequestUrl('is_subscribed'), header).then ((res) => {
          res.json().then(function(data) {
              if(data.status == '200') {
                  dispatch({
                      type: IS_SUBSCRIBED,
                      payload: data.response
                    })
               }
          })
        }).catch((err) => {
          console.log("ERROR---", err);
          
        })
    }
  }

  export const subscribe = (data) => {
    return async (dispatch) => {
      let header = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: qs.stringify({
             userid: data.userid,
             trans_id: data.trans_id
          })
        }
      fetch(NetworkConstants.RequestUrl('subscribe'), header).then ((res) => {
          res.json().then(function(res) {
            console.log('API', res);
            
              if(res.status == '200') {
                  dispatch({
                      type: IS_SUBSCRIBED,
                      payload: res.response.is_subscribed
                    })
               }
          })
        }).catch((err) => {
          console.log("ERROR---", err);
          
        })
    }
  }