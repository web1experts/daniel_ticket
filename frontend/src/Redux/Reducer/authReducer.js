import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILED,
  AUTH_COMMON_ERROR,
  REQUESET_RESET_PASS_SUCCESS,
  REQUESET_RESET_PASS_FAILED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESEND_VERIFICATION_LINK_SUCCESS,
  RESEND_VERIFICATION_LINK_FAILED,
  OTP_REQUEST_SUCCESS,
  OTP_REQUEST_FAILED,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_FAILED,
  CLEAR_SIGN_UP,
} from './types';

const initialState = {
  user: null,
  error: null,
  message: '',
  success: false,
  loading: false,
  isRegistered: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user || action.payload,
        error: null,
        success: true,
        loading: false,
      };

    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        isRegistered: true,
        success: true,
        error: null,
      };

    case RESET_PASSWORD_SUCCESS:
    return{
      message: action.payload.message,
      success:true,
      error:null,
      token:action.payload.token
    };
    case REQUESET_RESET_PASS_SUCCESS:
    case RESEND_VERIFICATION_LINK_SUCCESS:
    case OTP_REQUEST_SUCCESS:
    case OTP_VERIFY_SUCCESS:
      return {
        ...state,
        success: true,
        message: action.payload.message,
        error: null,
        otpToken:action.payload
      };

    case LOGIN_FAILED:
    case CREATE_ACCOUNT_FAILED:
    case RESET_PASSWORD_FAILED:
    case REQUESET_RESET_PASS_FAILED:
    case RESEND_VERIFICATION_LINK_FAILED:
    case OTP_REQUEST_FAILED:
    case OTP_VERIFY_FAILED:
    case AUTH_COMMON_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false,
      };

    case CLEAR_SIGN_UP:
      return {
        ...state,
        isRegistered: false,
        message: '',
        error: null,
        success: false,
      };
    default:
      return state;
  }
};

export default authReducer;
