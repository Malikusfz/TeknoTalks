import { asyncAddThread } from '../states/threads/action';

class ThreadCategory {
  constructor(category) {
    this.category = category;
  }

  createThread(dispatch, navigate, data) {
    dispatch(
      asyncAddThread({
        ...data,
        category: this.category,
        successCallback: () => navigate('/'),
      }),
    );
  }
}

export default ThreadCategory;
