import {
    SAVE_ACTIVITY,
    SAVE_ACTIVITY_TODAY,
   } from '../actions/types';
  export default function(state = {}, action) {
    switch (action.type) {
      case SAVE_ACTIVITY:
        return { activity_result: action.payload };
      case SAVE_ACTIVITY_TODAY:
        return { activity_result: action.payload };
      default:
        return state;
    }
  }
  