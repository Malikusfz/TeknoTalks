import { describe, expect, it } from 'vitest';
import { ActionType } from './action';
import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given a RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'First Thread',
            body: 'This is the first thread',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given an ADD_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'First Thread',
        body: 'This is the first thread',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Second Thread',
          body: 'This is the second thread',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'user-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with the toggled upvote thread when given an UPVOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'First Thread',
        body: 'This is the first thread',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: ['user-2'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.UPVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-3',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: ['user-2', 'user-3'],
      },
    ]);

    const nextState2 = threadsReducer(nextState, action);

    expect(nextState2).toEqual([
      {
        ...initialState[0],
        upVotesBy: ['user-2'],
      },
    ]);
  });

  it('should return the threads with the toggled downvote thread when given a DOWNVOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'First Thread',
        body: 'This is the first thread',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: ['user-2'],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.DOWNVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-3',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: ['user-2', 'user-3'],
      },
    ]);

    const nextState2 = threadsReducer(nextState, action);

    expect(nextState2).toEqual([
      {
        ...initialState[0],
        downVotesBy: ['user-2'],
      },
    ]);
  });

  it('should return the threads with the clear upvote and downvote thread when given a NEUTRALIZE_THREAD_VOTE action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'First Thread',
        body: 'This is the first thread',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: ['user-3'],
        downVotesBy: ['user-3'],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.NEUTRALIZE_THREAD_VOTE,
      payload: {
        threadId: 'thread-1',
        userId: 'user-3',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });
});
