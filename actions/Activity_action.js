import {
    SAVE_ACTIVITY,
    SAVE_ACTIVITY_TODAY,
    GET_OVERALL_ACTIVITY,
    GET_MONTHLY_ACTIVITY,
    GET_CHART_DATA
  } from './types';
  import {Platform} from 'react-native'
  import { NetworkConstants } from './../config/appConstants'
  let ls = require('react-native-local-storage');
  import NavigatorService from './../utils/navigator';
  import  qs from "qs";
  let moment = require('moment');
  var today = new Date().toLocaleDateString("en-US", {timeZone: "Australia/Brisbane"});

  
  export const save_acitivity = (values) => {

    return async (dispatch) => {
      if(values) {
        let insertData = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: qs.stringify({
            userid: values._userid,
            activitydate: today.trim(),
            totaltokens: values.totalToken,
            totalcalories: values.totalCalories,
            totaldistance: values.totalDistance,
            walkingdistance: values.walkdistance,
            walkingcalories: values.walkingcalories,
            walkingtokens: values.walkingtokens,
            bikedistance: values.bikeDistance,
            bikecalories:values.bikecalories,
            biketokens:values.cycleTokens,
            vehicledistance: values.vehicleDistances,
            vehiclecalories:values.vehiclecalories,
            vehicletokens: values.vehicletokens
          })
        }
        fetch(NetworkConstants.RequestUrl('save_activity'), insertData).then ((res) => {
          res.json().then(function(data) {
              if(data.res.response == 200) {
                dispatch({
                    type: SAVE_ACTIVITY,
                    payload: data.res.data
                  })
              }
          })
        }).catch((err) => {
          console.log("ERROR---", err);
          
        })
    
            } else {
                console.log("ERROR");
                
            }
  
    }
  
  }


  export const get_activity_today = (userid) => {
      return async (dispatch) => {
        let header = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: qs.stringify({
              userid,
              activitydate: today
            })
          }
        fetch(NetworkConstants.RequestUrl('get_activity_today'), header).then ((res) => {
            res.json().then(function(data) {
              //console.log('ACTION-RESPONSE', data.res.response[0]);
                if(data.res.status == '200') {
                    dispatch({
                        type: SAVE_ACTIVITY_TODAY,
                        payload: data.res.response[0]
                      })
                 }
            })
          }).catch((err) => {
            console.log("ERROR---", err);
            
          })
      }
  }

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

export const get_weekly_activity = (userid) => {
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
    fetch(NetworkConstants.RequestUrl('monthly_activity'), header).then ((res) => {
        res.json().then(function(data) {
          //console.log('ACTION-RESPONSE', data.res.response[0]);
            if(data.res.status == '200') {
              console.log("MONTHLY DATA", data);
              
                dispatch({
                    type: GET_MONTHLY_ACTIVITY,
                    payload: data.res.data
                  })
             }
        })
      }).catch((err) => {
        console.log("ERROR---", err);
      })
  }
}

