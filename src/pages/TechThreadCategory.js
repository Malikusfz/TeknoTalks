import ThreadCategory from './ThreadCategory';

class TechThreadCategory extends ThreadCategory {
  createThread(dispatch, navigate, data) {
    console.log('Creating a tech thread');
    super.createThread(dispatch, navigate, data);
  }
}

export default TechThreadCategory;
