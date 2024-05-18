import { ActionType } from './action';

// Function to handle state transitions
const stateTransitionHandlers = {
  [ActionType.RECEIVE_LEADERBOARDS]: (state, action) => action.payload.leaderboards.map((item) => ({
    ...item,
    user: {
      ...item.user,
      displayName: `${item.user.name} (${item.user.email})`,
    },
  })),
};

// The main reducer function
const leaderboardsReducer = (state = [], action = {}) => {
  const handler = stateTransitionHandlers[action.type];
  return handler ? handler(state, action) : state;
};

export default leaderboardsReducer;
