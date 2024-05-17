import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({
  name, email, password, successCallback,
}) {
  return async (dispatch) => {
    dispatch(showLoading());
    const registerPromise = api.register({ name, email, password });

    registerPromise
      .then(() => {
        successCallback();
        dispatch(hideLoading());
      })
      .catch((error) => {
        toast.alert(error.message);
        dispatch(hideLoading());
      });
  };
}

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
