import {
  describe, expect, it, vi, beforeEach, afterEach,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import {
  fetchThreadsAndUsers,
  fetchThreadsAndUsersBegin,
  fetchThreadsAndUsersSuccess,
  fetchThreadsAndUsersError,
} from './action';
import { receiveThreadActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'First Thread',
    body: 'This is the first thread',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Second Thread',
    body: 'This is the second thread',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-2',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeUsersResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  {
    id: 'jane_doe',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Oops, something went wrong');

describe('fetchThreadsAndUsers thunk', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-underscore-dangle
    api._getAllUsers = api.getAllUsers;
    // eslint-disable-next-line no-underscore-dangle
    api._seeAllThreads = api.seeAllThreads;
    vi.spyOn(toast, 'error');
  });

  afterEach(() => {
    // eslint-disable-next-line no-underscore-dangle
    api.getAllUsers = api._getAllUsers;
    // eslint-disable-next-line no-underscore-dangle
    api.seeAllThreads = api._seeAllThreads;
    vi.restoreAllMocks();

    // delete backup data
    // eslint-disable-next-line no-underscore-dangle
    delete api._getAllUsers;
    // eslint-disable-next-line no-underscore-dangle
    delete api._seeAllThreads;
  });

  it('should dispatch actions correctly when data fetching succeeds', async () => {
    // Arrange
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.seeAllThreads = () => Promise.resolve(fakeThreadsResponse);
    const dispatch = vi.fn();

    // Act
    await fetchThreadsAndUsers()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(fetchThreadsAndUsersBegin());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(fetchThreadsAndUsersSuccess(fakeThreadsResponse, fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions and show error toast when data fetching fails', async () => {
    // Arrange
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.seeAllThreads = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();

    // Act
    await fetchThreadsAndUsers()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(fetchThreadsAndUsersBegin());
    expect(dispatch).toHaveBeenCalledWith(fetchThreadsAndUsersError(fakeErrorResponse.message));
    expect(toast.error).toHaveBeenCalledWith(`Error fetching data: ${fakeErrorResponse.message}`);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
