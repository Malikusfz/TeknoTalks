/**
 * Test scenarios
 *
 * - asyncPreloadProcess thunk
 *   - should correctly dispatch actions when API call succeeds
 *   - should handle errors and dispatch appropriate actions when API call fails
 */

import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { setAuthUserActionCreator } from '../authUser/action';

const mockUser = {
  id: 'jane_doe',
  name: 'Jane Doe',
  email: 'jane@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const mockError = new Error('Something went wrong');

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    vi.spyOn(api, 'getOwnProfile');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should correctly dispatch actions when API call succeeds', async () => {
    // Arrange
    api.getOwnProfile.mockResolvedValueOnce(mockUser);
    const dispatch = vi.fn();

    // Act
    await asyncPreloadProcess()(dispatch);

    // Assert
    const dispatchedActions = dispatch.mock.calls.map((call) => call[0]);

    expect(dispatchedActions).toEqual([
      showLoading(),
      setAuthUserActionCreator(mockUser),
      setIsPreloadActionCreator(false),
      hideLoading(),
    ]);
  });

  it('should handle errors and dispatch appropriate actions when API call fails', async () => {
    // Arrange
    api.getOwnProfile.mockRejectedValueOnce(mockError);
    const dispatch = vi.fn();
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

    // Act
    await asyncPreloadProcess()(dispatch);

    // Assert
    const dispatchedActions = dispatch.mock.calls.map((call) => call[0]);

    expect(dispatchedActions).toEqual([
      showLoading(),
      setAuthUserActionCreator(null),
      setIsPreloadActionCreator(false),
      hideLoading(),
    ]);
    expect(consoleErrorSpy).toHaveBeenCalledWith('API call failed:', mockError);
  });
});
