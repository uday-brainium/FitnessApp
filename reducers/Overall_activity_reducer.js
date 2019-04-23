import {
    GET_OVERALL_ACTIVITY
   } from '../actions/types';
  export default function(state = {}, action) {
    switch (action.type) {
      case GET_OVERALL_ACTIVITY:
        return { overall_activity: action.payload };
      default:
        return state;
    }
  }
  