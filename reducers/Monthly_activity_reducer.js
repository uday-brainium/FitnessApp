import {
    GET_MONTHLY_ACTIVITY
   } from '../actions/types';
  export default function(state = {}, action) {
    switch (action.type) {
      case GET_MONTHLY_ACTIVITY:
        return { monthly_activity: action.payload };
      default:
        return state;
    }
  }
  