import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

// Action creator untuk mengatur status preload
function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: { isPreload },
  };
}

// Proses asinkron untuk preload
function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading()); // Menampilkan loading bar

    const authUser = await api
      .getOwnProfile()
      .then((data) => data)
      .catch(() => null);

    // Mengatur user autentikasi
    dispatch(setAuthUserActionCreator(authUser));
    dispatch(setIsPreloadActionCreator(false)); // Mengatur status preload menjadi false
    dispatch(hideLoading()); // Menyembunyikan loading bar
  };
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
