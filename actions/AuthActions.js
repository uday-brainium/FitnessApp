import { NetworkConstants } from './../config/appConstants'
let ls = require('react-native-local-storage');
import { Platform } from 'react-native'

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  OLD_PASSWORD_CHANGED,
  NEW_PASSWORD_CHANGED,
  CONFIRM_PASSWORD_CHANGED,
  PHONE_CHANGED,
  FIRSTNAME_CHANGED,
  LASTNAME_CHANGED,
  GENDER_CHANGED,
  DOB_CHANGED,
  HEIGHT_CHANGED,
  WEIGHT_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  LOGIN_STATUS_CHANGED,
  LOAD_WELCOME_CHANGED,
  EMAIL_RESET_CHANGED,
  FONT_LOADED_CHANGED,
  SIGNUP_USER,
  ERROR_SET,
  RESET_USER ,
  RESET_ONLY_LOGIN_DATA,
  LOADING_SPINNER_STATE,
  FACEBOOK_LOGIN_SUCCESS,
  IS_SUBSCRIBED,
  CITY_CHANGED,
  COUNTRY_CHANGED
} from './types';

import NavigatorService from './../utils/navigator';

export const errorSet = (text) => {
  return {
    type: ERROR_SET,
    payload: text
  };
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const fontLoadedChanged = () => {
  return {
    type: FONT_LOADED_CHANGED
  };
};

export const emailResetChanged = (text) => {
  return {
    type: EMAIL_RESET_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const oldPasswordChanged = (text) => {
  return {
    type: OLD_PASSWORD_CHANGED,
    payload: text
  };
};

export const newPasswordChanged = (text) => {
  return {
    type: NEW_PASSWORD_CHANGED,
    payload: text
  };
};

export const confirmPasswordChanged = (text) => {
  return {
    type: CONFIRM_PASSWORD_CHANGED,
    payload: text
  };
};

export const phoneChanged = (text) => {
  return {
    type: PHONE_CHANGED,
    payload: text
  };
};

export const firstnameChanged = (text) => {
  return {    type: FIRSTNAME_CHANGED,
    payload: text
  };
};

export const cityChange = (text) => {
  return {
          type: CITY_CHANGED,
          payload: text
        };
};

export const countryChange = (text) => {
  return {
          type: COUNTRY_CHANGED,
          payload: text
        };
};

export const lastnameChanged = (text) => {
  return {
    type: LASTNAME_CHANGED,
    payload: text
  };
};

export const genderChanged = (text) => {

  return {    
    type: GENDER_CHANGED,
    payload: text
  };
};

export const dobChanged = (text) => {
  console.log('action-text',text);
  
  return {    
    type: DOB_CHANGED,
    payload: text
  };
};

export const heightChanged = (text) => {
  return {    type: HEIGHT_CHANGED,
    payload: text
  };
};

export const weightChanged = (text) => {
  return {    type: WEIGHT_CHANGED,
    payload: text
  };
};

export const loginStatusChanged = (text) => {

  return {
    type: LOGIN_STATUS_CHANGED,
    payload: text
  };
};

export const loadWelcomeChanged = (text) => {

  return {
    type: LOAD_WELCOME_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {

  return async (dispatch) => {

    try {
          dispatch({
            type: LOGIN_STATUS_CHANGED,
            payload: 'checking'
          });

            const reqUrl=NetworkConstants.RequestUrl('login');
            const reqData=NetworkConstants.RequestConfig({
              "email":email,
              "password":password,
              "user_type":"Normal",
              "apptype":"Android"
              });

            let response = await fetch(reqUrl,reqData);
            if(response)
            {
                if (response.ok) // network 200 ok
                {
                      let responseJson = await response.json(); // My Server Raw Response

                        if (responseJson.response_code !='2000') {  // My Server Error Response

                          const err_message = responseJson.response_message;
                          loginUserFail(dispatch, err_message);

                          dispatch({
                            type: ERROR_SET,
                            payload: err_message
                          });

                      } else {
                        dispatch({
                          type: LOGIN_STATUS_CHANGED,
                          payload: 'loggedin'
                        });

                        loginUserSuccess(dispatch, responseJson.response_data);

                        currentNavState = NavigatorService.getCurrentRoute();
                        if (currentNavState.routeName != 'dashboard_screen') {
                          NavigatorService.reset('dashboard_screen');
                        }

                      }
                }else if (!response.ok) {  // Network Error
                      const err_message = response.message;
                      loginUserFail(dispatch, err_message);
                }
            } else {
                    const err_message ='Something went wrong !';
                      loginUserFail(dispatch, err_message);
                      dispatch({
                        type: ERROR_SET,
                        payload: err_message
                      });
        }
      }
      catch (error) {

          const err_message = error.message;
              loginUserFail(dispatch, err_message);
              dispatch({
                type: ERROR_SET,
                payload: err_message
              });
      }
  };
};

export const resetUser = ({ emailReset}) => {

  return async (dispatch) => {

        try {
          // Load spinner  due to true value and popup down by passing false value
           dispatch({ type: LOADING_SPINNER_STATE, payload: true });

          const reqUrl=NetworkConstants.RequestUrl('forgotPassword');
          const reqData=NetworkConstants.RequestConfig({
           "email":emailReset,
           "apptype":"Android"
           });

          let response = await fetch(reqUrl,reqData);

          if(response)
          {
              // Load spinner  due to true value and popup down by passing false value
              dispatch({ type: LOADING_SPINNER_STATE, payload: false });
              if (response.ok) // network 200 ok
              {
                  let responseJson = await response.json(); // My Server Raw Response
                  if (responseJson.response_code !='2000') {  // My Server Error Response

                    const err_message = responseJson.response_message;
                    dispatch({
                      type: ERROR_SET,
                      payload: err_message
                    });

                }else {  // My Server 2000 Response

                  NavigatorService.reset('login_screen');
                  const err_message = responseJson.response_message;
                  dispatch({
                    type: ERROR_SET,
                    payload: err_message
                  });
                  // if require call screen to back/previous screen
                }
            }else if (!response.ok) {  // Network Error
                  let err_message = responseJson.response_message;
                  dispatch({
                    type: ERROR_SET,
                    payload: err_message
                  });
             }
        }else {
           // issue with fetch function
          dispatch({ type: LOADING_SPINNER_STATE, payload: false });
        let err_message ='Something went wrong !';
              dispatch({
                type: ERROR_SET,
                payload: err_message
              });
      }
    }
     catch (error) {
        dispatch({ type: LOADING_SPINNER_STATE, payload: false });
        let err_message = error.message;
        dispatch({
          type: ERROR_SET,
          payload: err_message
        });
     }
  };
};

export const changeUserPassword = ({ user_id,oldPassword,newPassword }) => {
  console.log("Change-PAssword-Details", user_id, oldPassword, newPassword );
  
  //user_id,password,new_password
  return async (dispatch) => {
    try {
      // Load spinner  due to true value and popup down by passing false value
        dispatch({ type: LOADING_SPINNER_STATE, payload: true });

         // {"new_password":"1234567","password":"123456","user_id":"5bfb9c223ddade29a608c58d","apptype":"Android"}

          const reqUrl=NetworkConstants.RequestUrl('changePassword');
          const reqData=NetworkConstants.RequestConfig({
           "user_id":user_id,
           "password":oldPassword,
           "new_password":newPassword,
           "apptype": Platform.OS === 'android'? 'android' : 'ios'
           });

          let response = await fetch(reqUrl,reqData);
              if(response)
              {
                 dispatch({ type: LOADING_SPINNER_STATE, payload: false });

                  console.log('Network Response status code ==>'+response.status);
                  if (response.ok) // network 200 ok
                  {
                    let responseJson = await response.json(); // My Server Raw Response
                       if (responseJson.response_code===!'2000') {  // My Server Error Response
                        console.log('Authentication : Change Password: inside response ');
                        let err_message = responseJson.response_message;
                        dispatch({
                          type: ERROR_SET,
                          payload: err_message
                        });
                    }else {  // My Server 2000 Response

                      dispatch({ type: RESET_ONLY_LOGIN_DATA });
                      dispatch({ type: ERROR_SET, payload: responseJson.response_message });
                    }
                }else if (!response.ok) {  // Network Error

                      let err_message = responseJson.response_message;
                      dispatch({
                        type: ERROR_SET,
                        payload: err_message
                      });
                 }
            }else {
              dispatch({ type: LOADING_SPINNER_STATE, payload: false });
            let err_message ='Something went wrong !';
                  dispatch({
                    type: ERROR_SET,
                    payload: err_message
                  });
          }
        }
         catch (error) {
          dispatch({ type: LOADING_SPINNER_STATE, payload: false });
          let err_message = error.message;
          dispatch({
            type: ERROR_SET,
            payload: err_message
          });
         }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {

       dispatch({ type: RESET_USER });

      currentNavState = NavigatorService.getCurrentRoute();
      if(currentNavState.routeName != 'login_screen') {
           ls.remove('userdata').then(() => {
              ls.remove('modalflag')
              NavigatorService.reset('login_screen');
           })
          dispatch({
            type: IS_SUBSCRIBED,
            payload: false
          })
        }

  };
};

export const signupUser = ( email, password, gender, height, weight, dob, phone, firstname, lastname, city, country ) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_STATUS_CHANGED,
      payload: 'checking'
    });
    dispatch({ type: SIGNUP_USER });
try {
     const reqUrl=NetworkConstants.RequestUrl('signupUser');
     const reqData=NetworkConstants.RequestConfig({
      "email":email,
      "password":password,
      "user_type":"Normal",
      "apptype":"Android",
      "mobile":phone,
      "name_first":firstname,
      "name_last":lastname,
      "gender": gender,
      "height": height,
      "weight": weight,
      "dob":dob,
      "city": city,
      "country": country,
      "heightWeight": true
      });
      console.log('req-data', reqData);
      
        let response = await fetch(reqUrl,reqData);
        if(response)
        {
          if (response.ok) // network 200 ok
            {
              let responseJson = await response.json(); // My Server Raw Response

                if (responseJson.response_code !='2000') {  // My Server Error Response

                  const err_message = responseJson.response_message;
                  loginUserFail(dispatch, err_message);

                  dispatch({
                    type: ERROR_SET,
                    payload: err_message
                  });

                } else {  // My Server 2000 Response
                  dispatch({
                    type: LOGIN_STATUS_CHANGED,
                    payload: 'loggedin'
                  });

                  loginUserSuccess(dispatch, responseJson.response_data);

                  currentNavState = NavigatorService.getCurrentRoute();
                  if (currentNavState.routeName != 'dashboard_screen') {
                    NavigatorService.reset('dashboard_screen');
                  }

                }
              }else if (!response.ok) {  // Network Error
                    const err_message = response.message;
                    loginUserFail(dispatch, err_message);
              }
            }else {
              const err_message ='Something went wrong !';
                loginUserFail(dispatch, err_message);
                dispatch({
                  type: ERROR_SET,
                  payload: err_message
                });
        }
      }
      catch (error) {
          const err_message = error.message;
              loginUserFail(dispatch, err_message);
              dispatch({
                type: ERROR_SET,
                payload: err_message
              });
      }
  };
};

// Get message from firebase and do the reset
export const authStateChanged = (loginStatus) => {
  return ( dispatch ) => {
   // console.log('sarwesh ==> authStateChanged called==>'+this.props.lo );
  // console.log('authstatechanged loginStatus==>' +this.props.loginStatus);
      if(loginStatus==='loggedin')
      {
        dispatch({
                type: LOGIN_STATUS_CHANGED,
                payload: 'loggedin'
              });
              currentNavState = NavigatorService.getCurrentRoute();
              if (currentNavState.routeName != 'main_screen') {
                NavigatorService.reset('main_screen');
              }
      } else if(loginStatus==='notloggedin' || loginStatus==='initial' ) {
        dispatch({
          type: LOGIN_STATUS_CHANGED,
          payload: 'notloggedin'
        });

      }
  }
};

const loginUserFail = (dispatch, err_message) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: err_message
  });
};

const loginUserSuccess = (dispatch, user) => {
  ls.save('userdata', JSON.stringify(user));
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  dispatch({
    type: FACEBOOK_LOGIN_SUCCESS,
    payload: user
  });
  
};
