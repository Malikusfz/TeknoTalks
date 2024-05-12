import { ActionType } from './action';

// Fungsi pembantu untuk mengupdate state leaderboards
const updateLeaderboards = (state, leaderboards) => [...leaderboards];

// Fungsi pembantu untuk menangani aksi RECEIVE_LEADERBOARDS
const handleReceiveLeaderboards = (state, action) => {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARDS:
      return updateLeaderboards(state, action.payload.leaderboards);
    default:
      return state;
  }
};

// Reducer utama yang menggunakan fungsi pembantu
function leaderboardsReducer(leaderboards = [], action = {}) {
  return handleReceiveLeaderboards(leaderboards, action);
}

export default leaderboardsReducer;
