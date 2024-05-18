import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

export const receiveLeaderboardsAction = (leaderboards) => ({
  type: ActionType.RECEIVE_LEADERBOARDS,
  payload: { leaderboards },
});

export const fetchLeaderboards = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const leaderboards = await api.seeLeaderboards();
    dispatch(receiveLeaderboardsAction(leaderboards));
  } catch (error) {
    console.warn('Failed to load leaderboards:', error);
  } finally {
    dispatch(hideLoading());
  }
};
