import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());

    const token = await api.login({ email, password }).catch((error) => {
      console.error(error.message);
      dispatch(hideLoading());
    });

    if (token) {
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile().catch((error) => {
        console.error(error.message);
        dispatch(hideLoading());
      });

      if (authUser) {
        dispatch(setAuthUserActionCreator(authUser));
        dispatch(hideLoading());
      }
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(showLoading());
    api.putAccessToken('');
    dispatch(unsetAuthUserActionCreator());
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
