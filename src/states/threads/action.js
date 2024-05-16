import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UPVOTE_THREAD: 'TOGGLE_LIKE_THREAD',
  DOWNVOTE_THREAD: 'TOGGLE_UNLIKE_THREAD',
  NEUTRALIZE_THREAD_VOTE: 'NEUTRALIZE_THREAD_VOTE',
};

// Fungsi pembantu untuk membuat action creator
const makeActionCreator = (type, payload) => ({ type, payload });

function receiveThreadActionCreator(threads) {
  return makeActionCreator(ActionType.RECEIVE_THREADS, { threads });
}

function addThreadActionCreator(thread) {
  return makeActionCreator(ActionType.ADD_THREAD, { thread });
}

function toggleUpvoteThreadActionCreator({ threadId, userId }) {
  return makeActionCreator(ActionType.UPVOTE_THREAD, { threadId, userId });
}

function toggleDownvoteThreadActionCreator({ threadId, userId }) {
  return makeActionCreator(ActionType.DOWNVOTE_THREAD, { threadId, userId });
}

function neutralizeThreadVoteActionCreator({ threadId, userId }) {
  return makeActionCreator(ActionType.NEUTRALIZE_THREAD_VOTE, {
    threadId,
    userId,
  });
}

const asyncActionHandler = async (dispatch, asyncFunc, ...params) => {
  dispatch(showLoading());
  try {
    const result = await asyncFunc(...params);
    return result;
  } catch (error) {
    toast.alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
  return null; // Add a return statement at the end of the function
};

function asyncAddThread({
  title, body, category, successCallback,
}) {
  return async (dispatch) => {
    const thread = await asyncActionHandler(dispatch, api.createThread, {
      title,
      body,
      category,
    });
    if (thread) {
      dispatch(addThreadActionCreator(thread));
      successCallback();
    }
  };
}

function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleUpvoteThreadActionCreator({ threadId, userId: authUser.id }),
    );
    const success = await asyncActionHandler(
      dispatch,
      api.upVoteThread,
      threadId,
    );
    if (!success) {
      dispatch(
        toggleUpvoteThreadActionCreator({ threadId, userId: authUser.id }),
      );
    }
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id }),
    );
    const success = await asyncActionHandler(
      dispatch,
      api.downVoteThread,
      threadId,
    );
    if (!success) {
      dispatch(
        toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id }),
      );
    }
  };
}

function asyncNeutralizeThreadVote(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id }),
    );
    const success = await asyncActionHandler(
      dispatch,
      api.neutralizeVoteThread,
      threadId,
    );
    if (!success) {
      dispatch(
        neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id }),
      );
    }
  };
}

export {
  ActionType,
  receiveThreadActionCreator,
  addThreadActionCreator,
  toggleUpvoteThreadActionCreator,
  toggleDownvoteThreadActionCreator,
  neutralizeThreadVoteActionCreator,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncNeutralizeThreadVote,
};
