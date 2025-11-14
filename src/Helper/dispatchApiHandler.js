import { toast } from 'react-toastify';
import * as auth from './authHelper';



export const dispatchApiHandler = async ({
  apiCall,
  dispatch,
  types: { start , success, failure },
  withToast = true,
}) => {
    try {
        if (start) {
            dispatch({ type: start });
        }
        const response = await apiCall();
        if (response?.data?.success) {
            dispatch({ type: success, payload: response.data });
            return response.data;
        } else {
            dispatch({ type: failure, payload: response.data.message });
            if (withToast) toast.error(response.data.message);
        }
    } catch (error) {
        const message =
            error?.response?.data?.error?.message ||
            error?.response?.data?.message ||
            error?.message ||
            'An error occurred';
        dispatch({ type: failure, payload: message });
        if (error?.response?.status === 401) {
            console.log("error ----36 " , error )
            // auth.logout();
        }
        if (withToast) toast.error(message);
    }
};




