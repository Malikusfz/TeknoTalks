import {
  describe, expect, it, vi, beforeEach, afterEach,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { fetchLeaderboards, receiveLeaderboardsAction } from './action';

const mockLeaderboards = [
  {
    user: {
      id: 'user-1',
      name: 'Alice',
      email: 'alice@example.com',
      avatar: 'https://example.com/avatar1.jpg',
    },
    score: 20,
  },
  {
    user: {
      id: 'user-2',
      name: 'Bob',
      email: 'bob@example.com',
      avatar: 'https://example.com/avatar2.jpg',
    },
    score: 15,
  },
];

const mockError = new Error('Network Error');

describe('fetchLeaderboards thunk', () => {
  beforeEach(() => {
    vi.spyOn(api, 'seeLeaderboards');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch correct actions on successful data fetch', async () => {
    api.seeLeaderboards.mockResolvedValue(mockLeaderboards);
    const dispatch = vi.fn();

    await fetchLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsAction(mockLeaderboards));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should log a warning on failed data fetch', async () => {
    api.seeLeaderboards.mockRejectedValue(mockError);
    const dispatch = vi.fn();
    const consoleWarnSpy = vi.spyOn(console, 'warn');

    await fetchLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(consoleWarnSpy).toHaveBeenCalledWith('Failed to load leaderboards:', mockError);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
