/**
 * Test scenarios
 *
 * - asyncSetAuthUser thunk
 *   - should store accessToken in local storage when user login
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action and call console.error correctly when data fetching failed
 *
 * - asyncUnsetAuthUser thunk
 *   - accessToken in local storage should be an empty string when user logout
 *   - should dispatch action correctly when user logout
 */

import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncSetAuthUser, asyncUnsetAuthUser, setAuthUserActionCreator, unsetAuthUserActionCreator,
} from './action';

const fakeAccessTokenResponse = 'fakeAccessToken';

const fakeAuthUserResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Oops, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-underscore-dangle
    api._login = api.login;
    // eslint-disable-next-line no-underscore-dangle
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    // eslint-disable-next-line no-underscore-dangle
    api.login = api._login;
    // eslint-disable-next-line no-underscore-dangle
    api.getOwnProfile = api._getOwnProfile;

    // delete backup data
    // eslint-disable-next-line no-underscore-dangle
    delete api._login;
    // eslint-disable-next-line no-underscore-dangle
    delete api._getOwnProfile;
  });

  it('should store accessToken in local storage when user login', async () => {
    // Arrange
    const email = 'john@example.com';
    const password = 'password';
    // stub implementation
    api.login = () => Promise.resolve(fakeAccessTokenResponse);
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // Action
    await asyncSetAuthUser({ email, password })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(localStorage.getItem('accessToken')).toBe(fakeAccessTokenResponse);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const email = 'john@example.com';
    const password = 'password';
    // stub implementation
    api.login = () => Promise.resolve(fakeAccessTokenResponse);
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // Action
    await asyncSetAuthUser({ email, password })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call console.error correctly when data fetching failed', async () => {
    // Arrange
    const email = 'john@example.com';
    const password = 'password';
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock console.error
    console.error = vi.fn();

    // Action
    await asyncSetAuthUser({ email, password })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(console.error).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  it('accessToken in local storage should be an empty string when user logout', () => {
    // Arrange
    // mock dispatch
    const dispatch = vi.fn();

    // Action
    asyncUnsetAuthUser()(dispatch);

    // Assert
    expect(localStorage.getItem('accessToken')).toBe('');
  });

  it('should dispatch action correctly when user logout', () => {
    // Arrange
    // mock dispatch
    const dispatch = vi.fn();

    // Action
    asyncUnsetAuthUser()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
