import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { receiveThreadActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateThreadAndUsers() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const [threads, users] = await Promise.all([
        api.seeAllThreads(),
        api.getAllUsers(),
      ]);

      dispatch(receiveThreadActionCreator(threads));
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export default asyncPopulateThreadAndUsers;
