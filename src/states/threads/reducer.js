import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  const updateThreadVotes = (thread, userId, actionType) => {
    let newUpVotes = thread.upVotesBy.filter((id) => id !== userId);
    let newDownVotes = thread.downVotesBy.filter((id) => id !== userId);

    if (actionType === ActionType.UPVOTE_THREAD) {
      newUpVotes = thread.upVotesBy.includes(userId)
        ? newUpVotes
        : [...newUpVotes, userId];
    } else if (actionType === ActionType.DOWNVOTE_THREAD) {
      newDownVotes = thread.downVotesBy.includes(userId)
        ? newDownVotes
        : [...newDownVotes, userId];
    }

    return {
      ...thread,
      upVotesBy: newUpVotes,
      downVotesBy: newDownVotes,
    };
  };

  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.UPVOTE_THREAD:
    case ActionType.DOWNVOTE_THREAD:
      return threads.map((thread) => (thread.id === action.payload.threadId
        ? updateThreadVotes(thread, action.payload.userId, action.type)
        : thread));
    case ActionType.NEUTRALIZE_THREAD_VOTE:
      return threads.map((thread) => (thread.id === action.payload.threadId
        ? {
          ...thread,
          upVotesBy: thread.upVotesBy.filter(
            (id) => id !== action.payload.userId,
          ),
          downVotesBy: thread.downVotesBy.filter(
            (id) => id !== action.payload.userId,
          ),
        }
        : thread));
    default:
      return threads;
  }
}

export default threadsReducer;
