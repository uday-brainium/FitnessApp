import {
    GET_CHART_DATA
  } from './types';
  import {Platform} from 'react-native'
  import { NetworkConstants } from './../config/appConstants'
  let ls = require('react-native-local-storage');
  import  qs from "qs";

export const chart_data = (userid) => {
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
    fetch(NetworkConstants.RequestUrl('activitydata_for_months'), header).then ((res) => {
        res.json().then(function(data) {
          //console.log('ACTION-RESPONSE', data.res.response[0]);
            if(data.res.status == '200') {
                dispatch({
                    type: GET_CHART_DATA,
                    payload: data.res.response
                  })
             }
        })
      }).catch((err) => {
        console.log("ERROR---", err);
        
      })
    }
  }