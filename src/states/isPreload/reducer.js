import { ActionType } from './action';

// Membuat fungsi handler secara terpisah
const setIsPreload = (state, action) => action.payload.isPreload;

// Menggunakan Map untuk memetakan ActionType ke handler yang sesuai
const stateMachine = new Map([[ActionType.SET_IS_PRELOAD, setIsPreload]]);

// Fungsi reducer yang memanfaatkan Map
function isPreloadReducer(isPreload = true, action = {}) {
  // Mendapatkan handler berdasarkan action.type, atau menggunakan fungsi default
  const handler = stateMachine.get(action.type) || ((state) => state);
  return handler(isPreload, action);
}

export default isPreloadReducer;
