import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: { isPreload },
  };
}

// Utility function to handle API response
const handleApiResponse = async (apiCall, onSuccess, onFailure) => {
  try {
    const response = await apiCall();
    onSuccess(response);
  } catch (error) {
    console.error('API call failed:', error);
    onFailure(error);
  }
};

// Asynchronous preload process using utility function
function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());

    const apiCall = () => api.getOwnProfile();
    const onSuccess = (authUser) => {
      dispatch(setAuthUserActionCreator(authUser));
    };
    const onFailure = (error) => {
      dispatch(setAuthUserActionCreator(null));
      console.error('Error in asyncPreloadProcess:', error);
    };

    await handleApiResponse(apiCall, onSuccess, onFailure);

    dispatch(setIsPreloadActionCreator(false));
    dispatch(hideLoading());
  };
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
