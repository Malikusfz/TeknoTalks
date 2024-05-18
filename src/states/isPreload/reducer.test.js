/**
 * Test scenario for isPreloadReducer
 *
 * - isPreloadReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the new state when given a SET_IS_PRELOAD action
 */

import { describe, expect, it } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

describe('isPreloadReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = true;
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    // Act
    const nextState = isPreloadReducer(initialState, unknownAction);

    // Assert
    expect(nextState).toBe(initialState);
  });

  it('should return the new state when given a SET_IS_PRELOAD action', () => {
    // Arrange
    const initialState = true;
    const preloadState = false;
    const setIsPreloadAction = {
      type: ActionType.SET_IS_PRELOAD,
      payload: { isPreload: preloadState },
    };

    // Act
    const nextState = isPreloadReducer(initialState, setIsPreloadAction);

    // Assert
    expect(nextState).toBe(preloadState);
  });
});
