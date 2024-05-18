/**
 * Test scenario for leaderboardsReducer
 *
 * - leaderboardsReducer function
 *   - should return the initial state when given an unknown action
 *   - should update the state correctly when given a RECEIVE_LEADERBOARDS action
 */

import { describe, expect, it } from 'vitest';
import leaderboardsReducer from './reducer';
import { ActionType } from './action';

describe('leaderboardsReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };

    // Act
    const newState = leaderboardsReducer(initialState, action);

    // Assert
    expect(newState).toEqual(initialState);
  });

  it('should update the state correctly when given a RECEIVE_LEADERBOARDS action', () => {
    // Arrange
    const initialState = [];
    const leaderboardsData = [
      {
        user: {
          id: 'user-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://example.com/avatar1.jpg',
        },
        score: 10,
      },
      {
        user: {
          id: 'user-2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://example.com/avatar2.jpg',
        },
        score: 15,
      },
    ];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards: leaderboardsData,
      },
    };

    // Act
    const newState = leaderboardsReducer(initialState, action);

    // Assert
    expect(newState).toEqual(
      leaderboardsData.map((item) => ({
        ...item,
        user: {
          ...item.user,
          displayName: `${item.user.name} (${item.user.email})`,
        },
      })),
    );
  });
});
