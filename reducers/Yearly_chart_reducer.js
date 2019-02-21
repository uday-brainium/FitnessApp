import {
    GET_CHART_DATA
   } from '../actions/types';
  export default function(state = {}, action) {
    switch (action.type) {
      case GET_CHART_DATA:
        return { chart_data: action.payload };
      default:
        return state;
    }
  }
  