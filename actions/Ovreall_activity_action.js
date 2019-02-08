import {
    GET_OVERALL_ACTIVITY
  } from './types';
  import { NetworkConstants } from '../config/appConstants'
 // let ls = require('react-native-local-storage');
 // import NavigatorService from './../utils/navigator';
 // import  qs from "qs";
  

 export const get_overall_activity = (userid) => {
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
    fetch(NetworkConstants.RequestUrl('get_overall_activity'), header).then ((res) => {
        res.json().then(function(data) {
          //console.log('ACTION-RESPONSE', data.res.response[0]);
            if(data.res.status == '200') {
                dispatch({
                    type: GET_OVERALL_ACTIVITY,
                    payload: data.res.response
                  })
             }
        })
      }).catch((err) => {
        console.log("ERROR---", err);
        
      })
  }
}
