import { createAsyncThunk } from '@reduxjs/toolkit';
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

const asyncRegisterUser = createAsyncThunk(
  'users/register',
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await api.register({ name, email, password });
      dispatch(hideLoading());
      return response;
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error.message);
      return rejectWithValue(error.response.data);
    }
  },
);

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
