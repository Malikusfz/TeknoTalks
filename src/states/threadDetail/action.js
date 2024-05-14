import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';

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
    return await asyncFunc(...params);
  } catch (error) {
    toast.error(`Error: ${error.message}`);
    return null;
  } finally {
    dispatch(hideLoading());
  }
};

// Fungsi pembantu untuk membuat action creator
const makeActionCreator = (type, payload) => ({ type, payload });

const receiveThreadDetailActionCreator = (threadDetail) => makeActionCreator(ActionType.RECEIVE_THREAD_DETAIL, { threadDetail });

const clearThreadDetailActionCreator = () => makeActionCreator(ActionType.CLEAR_THREAD_DETAIL);

const addThreadCommentActionCreator = (detailComment) => makeActionCreator(ActionType.ADD_THREAD_COMMENT, { detailComment });

const toggleVoteActionCreator = (type, { threadId, userId }) => makeActionCreator(type, { threadId, userId });

const toggleCommentVoteActionCreator = (type, { threadId, commentId, userId }) => makeActionCreator(type, { threadId, commentId, userId });

const asyncReceiveThreadDetail = (threadId) => async (dispatch) => {
  dispatch(clearThreadDetailActionCreator());
  const threadDetail = await handleAsyncAction(dispatch, api.seeDetailThread, threadId);
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

export {
  ActionType,
  receiveThreadDetailActionCreator,
  addThreadCommentActionCreator,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncNeutralizeThreadDetailVote,
  asyncReceiveThreadDetail,
  asyncAddThreadComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncNeutralizeVoteComment,
};
