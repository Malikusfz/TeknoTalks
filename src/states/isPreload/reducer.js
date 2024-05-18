import { ActionType } from './action';

// Initial state
const initialState = true;

// Define a function to handle actions
const actionHandlers = {
  [ActionType.SET_IS_PRELOAD]: (state, action) => action.payload.isPreload,
};

const handleAction = (state, action) => {
  // If an action handler exists for the given action type, use it
  if (Object.prototype.hasOwnProperty.call(actionHandlers, action.type)) {
    return actionHandlers[action.type](state, action);
  }
  // Otherwise, return the current state
  return state;
};

// Reducer function that delegates action handling
function isPreloadReducer(state = initialState, action = {}) {
  return handleAction(state, action);
}

export default isPreloadReducer;
