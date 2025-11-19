import { get } from 'lodash';
import API from '../../helpers/api';
import * as auth from '../../helpers/auth';
import {toast} from 'react-toastify';
import {
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_FAILED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    AUTH_COMMON_ERROR,
    REQUESET_RESET_PASS_SUCCESS,
    REQUESET_RESET_PASS_FAILED,
    RESET_PASSWORD_SUCCESS , 
    RESET_PASSWORD_FAILED,
    RESEND_VERIFICATION_LINK_SUCCESS,
    RESEND_VERIFICATION_LINK_FAILED,
    OTP_REQUEST_SUCCESS,
    OTP_REQUEST_FAILED,
    OTP_VERIFY_FAILED,
    OTP_VERIFY_SUCCESS,
    CLEAR_SIGN_UP , 
} from "./types";
 

import { errorActionCreator } from './error.action';

  const config = {
    headers: {
      'Content-Type': "application/json; charset=utf-8"
    }
  }

function errorRequest(err, dispatch, type) {
  let data = get(err, 'response.data', null);
  data = data || get(err, 'response');
  data = data || err;
  if (data.error) {
    dispatch({
      type: type ? type: AUTH_COMMON_ERROR,
      payload: data.error.message,
    });
  } else if (data.status === 401) {   
    auth.logout()
  } else {
    dispatch({
      type: type ? type: AUTH_COMMON_ERROR,
      payload: data.message,
    });
  }
}


export const login = (payload) => {
  return async (dispatch) => {
      try {
        const response = await API.apiPostUrl('auth', '/sign_in' ,  payload);
        console.log("response" , response)
        if (response.data && response.data.success) {
            if (response.data.accessToken) {
                auth.login(response.data.accessToken);
                await dispatch({ type: LOGIN_SUCCESS, payload: response.data });
            } else {
                await dispatch({ type: LOGIN_FAILED, payload: response.data.message });
            }
        } else {
            await dispatch({ type: LOGIN_FAILED, payload: response.data.message });
        }    
      } catch (err) {
        console.log("error" , err)
        errorRequest(err, dispatch , LOGIN_FAILED)
      }
  };
}

/**
 * 
 * @param {*} payload firstName , lastName , userName , password 
 * @returns 
 */
export const createAccount = (payload) => {
  return async (dispatch) => {
    try {
      const response = await API.apiPostUrl('auth' , '/sign_up', payload);
      if (response.data && response.data.success) {
        await dispatch({ type: CREATE_ACCOUNT_SUCCESS, payload: response.data });
      } else {
        await dispatch({ type: CREATE_ACCOUNT_FAILED, payload: response.data.message });
      }
    } catch (error) {
      errorRequest(error, dispatch, CREATE_ACCOUNT_FAILED);
    }
  }
}


export const requestResetPassword = (payload) =>{
  return async (dispatch) => {
    try {
      const response = await API.apiPostUrl('auth' , '/reset-requset', payload);
      if (response.data && response.data.success) {
        await dispatch({ type: REQUESET_RESET_PASS_SUCCESS, payload: response.data });
      } else {
        await dispatch({ type: REQUESET_RESET_PASS_FAILED, payload: response.data.message });
      }
    } catch (error) {
      errorRequest(error, dispatch, REQUESET_RESET_PASS_FAILED);
    }
  }
}

export const resetPassword = (payload) =>{
  return async (dispatch) => {
    try {
      const response = await API.apiPostUrl('auth' , '/reset-password', payload);
      if (response.data && response.data.success) {
        await dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data });
      } else {
        await dispatch({ type: RESET_PASSWORD_FAILED, payload: response.data.message });
      }
    } catch (error) {
      errorRequest(error, dispatch , RESET_PASSWORD_FAILED);
    }
  }
}

export const requestVerificationLink = (payload) =>{
  return async (dispatch) => {
    try {
      const response = await API.apiPostUrl('auth' , '/resend-verification-link', payload);
      if (response.data && response.data.success) {
        await dispatch({ type: RESEND_VERIFICATION_LINK_SUCCESS, payload: response.data });
      } else {
        await dispatch({ type: RESEND_VERIFICATION_LINK_FAILED, payload: response.data });
      }
    } catch (error) {
      errorRequest(error, dispatch , RESEND_VERIFICATION_LINK_FAILED);
    }
  }

}

/** ----- Request OTP ----- */
export const requestOtp = (payload) => {
  return async (dispatch) => {
    try {
      const response = await API.apiPostUrl("auth", "/request-otp", payload);
      if( response.data && response.data.success){
        await dispatch({ type: OTP_REQUEST_SUCCESS, payload: response.data });
      }else{
        await dispatch({ type: OTP_REQUEST_FAILED, payload: response.data.message });
      }
    } catch (error) {
      errorRequest(error, dispatch, OTP_REQUEST_FAILED);
    }
  }
}

/** ----- Verify OTP ----- */
export const verifyOtp = (payload) => {
  return async (dispatch) => {
    try {
      const response = await API.apiPostUrl("auth", "/verify-otp", payload);
      if(response.data && response.data.success){
        await dispatch({ type: OTP_VERIFY_SUCCESS, payload: response.data });
      }else{
        await dispatch({ type: OTP_VERIFY_FAILED, payload: response.data.message });
      }
    } catch (error) {
      errorRequest(error, dispatch, OTP_VERIFY_FAILED)
    }
  }
}

export const clearSignUpState = () =>{
  return async (dispatch) => {
    await dispatch({ type: CLEAR_SIGN_UP});
  }

}