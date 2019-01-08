 import { AsyncStorage } from 'react-native';
//import { Facebook } from 'expo';
import { fbappid } from './../config/auth';
import { NetworkConstants } from './../config/appConstants'
import NavigatorService from './../utils/navigator';


import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  LOGIN_STATUS_CHANGED,
  ERROR_SET,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from './types';
//import { getMaxListeners } from 'cluster';


export const facebookSignin = () => {

    return async (dispatch) => {
      try {

        dispatch({
          type: LOGIN_STATUS_CHANGED,
          payload: 'fbchecking'
        });

        // let { type, token } = await Facebook.logInWithReadPermissionsAsync(fbappid, {
        //   permissions: ['public_profile', 'email']
        // });

        let type='cancle'
        let token = '123123123123d'

        if (type === 'cancel') {
          dispatch({
            type: LOGIN_STATUS_CHANGED,
            payload: 'fbloginfailed'
          });
          return (dispatch({ type: FACEBOOK_LOGIN_FAIL }));
        }else if(token) {
               let graphResponse,FBresponseJson;
              // Get the user's name using Facebook's Graph API
              try {
                graphResponse = await fetch('https://graph.facebook.com/me?access_token='+token);
                if(graphResponse.ok)
                {
                   FBresponseJson = await graphResponse.json();
                }

              } catch (error) {

              }

              if(FBresponseJson && FBresponseJson.id)
              {
                try{
                    const reqUrl=NetworkConstants.RequestUrl('socialSignup');
                    const reqData=NetworkConstants.RequestConfig({
                    "email":"socialemail@gmail.com",
                    "name":FBresponseJson.name,
                    "social_id":FBresponseJson.id,
                    "apptype":"Android",
                    });

                    let response = await fetch(reqUrl,reqData);

                if(response)
                {
                          
                    if (response.ok) // network 200 ok
                    {

                           let responseJson = await response.json(); // My Server Raw Response
                           console.log('start loginUser my server Response ==>');
                           console.log(responseJson);
                           console.log('end loginUser my server Response ==>');

                            if (responseJson.response_code !='2000' ) {  // My Server Error Response
                              console.log('Authentication : login user : inside response ');

                              const err_message = responseJson.response_message;
                              dispatch({ type: LOGIN_USER_FAIL, payload: err_message });

                              dispatch({
                                type: ERROR_SET,
                                payload: err_message
                              });
                          }
                          else {  // My Server 2000 Response

                              dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
                              dispatch({ type: LOGIN_USER_SUCCESS, payload: responseJson.response_data });

                              currentNavState = NavigatorService.getCurrentRoute();
                              if (currentNavState.routeName != 'orders_Screen') {
                                NavigatorService.reset('orders_Screen');
                              }

                           }
                      }  else if (!response.ok) {  // Network Error
                          console.log('Authentication : Login user: inside response ');
                          const err_message = response.message;
                          dispatch({ type: LOGIN_USER_FAIL, payload: err_message });
                          dispatch({ type: ERROR_SET, payload: err_message });
                    }
                }else {
                        const err_message ='Something went wrong !';
                        dispatch({ type: LOGIN_USER_FAIL, payload: err_message });
                        dispatch({ type: ERROR_SET, payload: err_message });
                    }
                  }
                  catch (error) {
                  console.log(error);
                      const err_message = error.message;
                      dispatch({ type: LOGIN_USER_FAIL, payload: err_message });
                      dispatch({ type: ERROR_SET, payload: err_message });
                  }

              }else  // Facebook user id issue
              {
                const err_message ="There is issue with Facebook profile data, please try later.";
                dispatch({ type: LOGIN_USER_FAIL, payload: err_message });
                dispatch({ type: ERROR_SET, payload: err_message });

              }

        }else { // token fail to fetch from FB sdk

          const err_message ="There is issue with Facebook login, please try later.";
          dispatch({ type: LOGIN_USER_FAIL, payload: err_message });
          dispatch({ type: ERROR_SET, payload: err_message });

        }
      } catch (error) {
        console.log('fb_actions.js:error');
        console.log(error);
        let err_message = error.message;
        dispatch({ type: LOGIN_USER_FAIL, payload: err_message });
        dispatch({ type: ERROR_SET, payload: err_message });
      }
        // await AsyncStorage.setItem('fb_token', token);
        // case where the user has signed in without signing up.
        // dispatch({ type: ERROR_SET, payload: 'Please Register first ...'});
  };
};
