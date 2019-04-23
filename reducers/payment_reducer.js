import {
    IS_SUBSCRIBED
   } from '../actions/types';

  export default function(state = {}, action) {
    switch (action.type) {
      case IS_SUBSCRIBED:
        return { is_subscribed: action.payload };
      default:
        return state;
    }
  }
  