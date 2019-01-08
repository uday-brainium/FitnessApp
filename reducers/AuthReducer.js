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
  RESET_USER,
  RESET_ONLY_LOGIN_DATA,
  LOADING_SPINNER_STATE
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  emailReset: '',
  password: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  phone: '',
  firstname: '',
  lastname: '',
  gender: '',
  dob: '',
  height: '',
  weight: '',
  user: null,
  loadingSpinnerState: false,
  error: '',
  fontLoaded: false,
  loginStatus: 'initial',
  loadWelcome: false
};

const RESET_STATE = {
  email: '',
  emailReset: '',
  password: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  phone: '',
  firstname: '',
  lastname: '',
  gender: '',
  dob: '',
  height: '',
  weight: '',
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case EMAIL_RESET_CHANGED:
      return { ...state, emailReset: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case OLD_PASSWORD_CHANGED:
    return { ...state, oldPassword: action.payload };
    case NEW_PASSWORD_CHANGED:
    return { ...state, newPassword: action.payload };
    case CONFIRM_PASSWORD_CHANGED:
    return { ...state, confirmPassword: action.payload };
    case PHONE_CHANGED:
      return { ...state, phone: action.payload };
    case FIRSTNAME_CHANGED:
      return { ...state, firstname: action.payload };
    case LASTNAME_CHANGED:
      return { ...state, lastname: action.payload };
    case GENDER_CHANGED:
    return { ...state, gender: action.payload };
    case DOB_CHANGED:
    return { ...state, dob: action.payload };
    case HEIGHT_CHANGED:
    return { ...state, height: action.payload };
    case WEIGHT_CHANGED:
    return { ...state, weight: action.payload };
    case FONT_LOADED_CHANGED:
      return { ...state, fontLoaded: true };
    case ERROR_SET:
      return { ...state, error: action.payload };
    case LOGIN_USER:
      return { ...state, error: '' };
    case LOGIN_STATUS_CHANGED:
      if (action.payload == 'notloggedin') {
        return { ...state, loginStatus: action.payload, email: '', password: '', phone:'', firstname: '', lastname: '', error:'', user: null };
      } else {
        return { ...state, loginStatus: action.payload};
      }
    case LOAD_WELCOME_CHANGED:
      return { ...state, loadWelcome: action.payload };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...RESET_STATE, user: action.payload, loginStatus: 'loggedin', email: '', password: ''};
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload, password: '', loginStatus: 'loginfailed'  };

    case RESET_ONLY_LOGIN_DATA:
      return { ...state, ...RESET_STATE  };

    case RESET_USER:
      return { ...state, ...RESET_STATE , loginStatus:'notloggedin', user: null };

    case LOADING_SPINNER_STATE:  // applicable to whole app
        return { ...state, loadingSpinnerState: action.payload };
    default:
      return state;
  }
};
