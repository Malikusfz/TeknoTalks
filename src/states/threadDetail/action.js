import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';
<<<<<<< HEAD
import {
  neutralizeThreadVoteActionCreator,
  toggleDownvoteThreadActionCreator,
} from '../threads/action';
=======
>>>>>>> c5b8a6134ea12b86d448c87ba7bd82b0ac4a1d73

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_THREAD_COMMENT: 'ADD_THREAD_COMMENT',
  UPVOTE_THREAD_DETAIL: 'TOGGLE_LIKE_THREAD_DETAIL',
  DOWNVOTE_THREAD_DETAIL: 'TOGGLE_DISLIKE_THREAD_DETAIL',
  NEUTRALIZE_THREAD_DETAIL_VOTE: 'NEUTRALIZE_THREAD_DETAIL_VOTE',
  UPVOTE_COMMENT: 'TOGGLE_LIKE_COMMENT',
  DOWNVOTE_COMMENT: 'TOGGLE_UNLIKE_COMMENT',
  NEUTRALIZE_COMMENT_VOTE: 'NEUTRALIZE_COMMENT_VOTE',
};

// Fungsi pembantu untuk menangani proses asynchronous
const handleAsyncAction = async (dispatch, asyncFunc, ...params) => {
  dispatch(showLoading());
  try {
<<<<<<< HEAD
    const result = await asyncFunc(...params);
    return result; // Return the result from the async function
  } catch (error) {
    console.error(error.message); // Use console.error instead of alert
    return null; // Return null or an appropriate error value
=======
    return await asyncFunc(...params);
  } catch (error) {
    toast.error(`Error: ${error.message}`);
    return null;
>>>>>>> c5b8a6134ea12b86d448c87ba7bd82b0ac4a1d73
  } finally {
    dispatch(hideLoading());
  }
};

// Fungsi pembantu untuk membuat action creator
const makeActionCreator = (type, payload) => ({ type, payload });

<<<<<<< HEAD
function receiveThreadDetailActionCreator(threadDetail) {
  return makeActionCreator(ActionType.RECEIVE_THREAD_DETAIL, { threadDetail });
}

function clearThreadDetailActionCreator() {
  return makeActionCreator(ActionType.CLEAR_THREAD_DETAIL);
}

function addThreadCommentActionCreator(detailComment) {
  return makeActionCreator(ActionType.ADD_THREAD_COMMENT, { detailComment });
}

function toggleUpvoteThreadDetailActionCreator({ threadId, userId }) {
  return makeActionCreator(ActionType.UPVOTE_THREAD_DETAIL, {
    threadId,
    userId,
  });
}

function toggleDownvoteThreadDetailActionCreator({ threadId, userId }) {
  return makeActionCreator(ActionType.DOWNVOTE_THREAD_DETAIL, {
    threadId,
    userId,
  });
}

function neutralizeThreadDetailVoteActionCreator({ threadId, userId }) {
  return makeActionCreator(ActionType.NEUTRALIZE_THREAD_DETAIL_VOTE, {
    threadId,
    userId,
  });
}

function toggleUpvoteCommentActionCreator({ commentId, userId }) {
  return makeActionCreator(ActionType.UPVOTE_COMMENT, { commentId, userId });
}

function toggleDownvoteCommentActionCreator({ commentId, userId }) {
  return makeActionCreator(ActionType.DOWNVOTE_COMMENT, { commentId, userId });
}

function neutralizeVoteCommentActionCreator({ commentId, userId }) {
  return makeActionCreator(ActionType.NEUTRALIZE_COMMENT_VOTE, {
    commentId,
    userId,
  });
}

const asyncReceiveThreadDetail = (threadId) => async (dispatch) => {
  dispatch(clearThreadDetailActionCreator());
  const threadDetail = await handleAsyncAction(
    dispatch,
    api.seeDetailThread,
    threadId,
  );
=======
const receiveThreadDetailActionCreator = (threadDetail) => makeActionCreator(ActionType.RECEIVE_THREAD_DETAIL, { threadDetail });

const clearThreadDetailActionCreator = () => makeActionCreator(ActionType.CLEAR_THREAD_DETAIL);

const addThreadCommentActionCreator = (detailComment) => makeActionCreator(ActionType.ADD_THREAD_COMMENT, { detailComment });

const toggleVoteActionCreator = (type, { threadId, userId }) => makeActionCreator(type, { threadId, userId });

const toggleCommentVoteActionCreator = (type, { threadId, commentId, userId }) => makeActionCreator(type, { threadId, commentId, userId });

const asyncReceiveThreadDetail = (threadId) => async (dispatch) => {
  dispatch(clearThreadDetailActionCreator());
  const threadDetail = await handleAsyncAction(dispatch, api.seeDetailThread, threadId);
>>>>>>> c5b8a6134ea12b86d448c87ba7bd82b0ac4a1d73
  if (threadDetail) {
    dispatch(receiveThreadDetailActionCreator(threadDetail));
  }
};

const asyncAddThreadComment = ({ threadId, commentValue }) => async (dispatch) => {
  const detailComment = await handleAsyncAction(dispatch, api.createComment, {
    threadId,
    content: commentValue,
  });
  if (detailComment) {
    dispatch(addThreadCommentActionCreator(detailComment));
  }
};

<<<<<<< HEAD
const asyncToggleUpVoteThreadDetail = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  dispatch(
    makeActionCreator(ActionType.UPVOTE_THREAD_DETAIL, {
      threadId,
      userId: authUser.id,
    }),
  );
  const success = await handleAsyncAction(
    dispatch,
    api.upVoteThread,
    threadId,
  );
  if (!success) {
    dispatch(
      makeActionCreator(ActionType.UPVOTE_THREAD_DETAIL, {
        threadId,
        userId: authUser.id,
      }),
    );
  }
}; // Import toast if using React-Toastify

function asyncToggleDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(
      toggleDownvoteThreadDetailActionCreator({ threadId, userId: authUser.id }),
    );
    dispatch(
      toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id }),
    );

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      toast.error(`Error: ${error.message}`); // Replace alert with toast.error
      dispatch(
        toggleDownvoteThreadDetailActionCreator({
          threadId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeThreadDetailVote(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(
      neutralizeThreadDetailVoteActionCreator({ threadId, userId: authUser.id }),
    );
    dispatch(
      neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id }),
    );

    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      toast.alert(error.message);
      dispatch(
        neutralizeThreadDetailVoteActionCreator({
          threadId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(
      toggleUpvoteCommentActionCreator({
        threadId,
        commentId,
        userId: authUser.id,
      }),
    );

    try {
      await api.upVoteComment({ threadId, commentId });
    } catch (error) {
      toast.alert(error.message);
      dispatch(
        toggleUpvoteCommentActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(
      toggleDownvoteCommentActionCreator({
        threadId,
        commentId,
        userId: authUser.id,
      }),
    );

    try {
      await api.downVoteComment({ threadId, commentId });
    } catch (error) {
      toast.alert(error.message);
      dispatch(
        toggleDownvoteCommentActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(
      neutralizeVoteCommentActionCreator({
        threadId,
        commentId,
        userId: authUser.id,
      }),
    );

    try {
      await api.neutralizeVoteComment({ threadId, commentId });
    } catch (error) {
      toast.alert(error.message);
      dispatch(
        neutralizeVoteCommentActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}
=======
const asyncToggleVoteThreadDetail = (type, apiFunc) => (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  dispatch(toggleVoteActionCreator(type, { threadId, userId: authUser.id }));
  const success = await handleAsyncAction(dispatch, apiFunc, threadId);
  if (!success) {
    dispatch(toggleVoteActionCreator(type, { threadId, userId: authUser.id }));
  }
};

const asyncToggleVoteComment = (type, apiFunc) => ({ threadId, commentId }) => async (dispatch, getState) => {
  const { authUser } = getState();
  dispatch(toggleCommentVoteActionCreator(type, { threadId, commentId, userId: authUser.id }));
  const success = await handleAsyncAction(dispatch, apiFunc, { threadId, commentId });
  if (!success) {
    dispatch(toggleCommentVoteActionCreator(type, { threadId, commentId, userId: authUser.id }));
  }
};

const asyncToggleUpVoteThreadDetail = asyncToggleVoteThreadDetail(ActionType.UPVOTE_THREAD_DETAIL, api.upVoteThread);
const asyncToggleDownVoteThreadDetail = asyncToggleVoteThreadDetail(ActionType.DOWNVOTE_THREAD_DETAIL, api.downVoteThread);
const asyncNeutralizeThreadDetailVote = asyncToggleVoteThreadDetail(ActionType.NEUTRALIZE_THREAD_DETAIL_VOTE, api.neutralizeVoteThread);

const asyncToggleUpVoteComment = asyncToggleVoteComment(ActionType.UPVOTE_COMMENT, api.upVoteComment);
const asyncToggleDownVoteComment = asyncToggleVoteComment(ActionType.DOWNVOTE_COMMENT, api.downVoteComment);
const asyncNeutralizeVoteComment = asyncToggleVoteComment(ActionType.NEUTRALIZE_COMMENT_VOTE, api.neutralizeVoteComment);
>>>>>>> c5b8a6134ea12b86d448c87ba7bd82b0ac4a1d73

export {
  ActionType,
  receiveThreadDetailActionCreator,
  addThreadCommentActionCreator,
<<<<<<< HEAD
  toggleUpvoteThreadDetailActionCreator,
  toggleDownvoteThreadDetailActionCreator,
  neutralizeThreadDetailVoteActionCreator,
  toggleUpvoteCommentActionCreator,
  toggleDownvoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
=======
>>>>>>> c5b8a6134ea12b86d448c87ba7bd82b0ac4a1d73
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncNeutralizeThreadDetailVote,
  asyncReceiveThreadDetail,
  asyncAddThreadComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncNeutralizeVoteComment,
};
