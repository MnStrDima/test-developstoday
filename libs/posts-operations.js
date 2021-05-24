import axios from 'axios';
import {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsError,
  fetchPostByIdRequest,
  fetchPostByIdSuccess,
  fetchPostByIdError,
  addPostRequest,
  addPostSuccess,
  addPostError,
  updatePostRequest,
  updatePostSuccess,
  updatePostError,
  addCommentRequest,
  addCommentSuccess,
  addCommentError,
  deletePostRequest,
  deletePostSuccess,
  deletePostError,
  errorRemover,
} from './posts-actions';

const resetError = (dispatch) => setTimeout(() => dispatch(errorRemover(null)), 3000);

axios.defaults.baseURL = 'https://simple-blog-api.crew.red';

const getPosts = () => async (dispatch) => {
  dispatch(fetchPostsRequest());

  try {
    const { data } = await axios.get('/posts');
    return dispatch(fetchPostsSuccess(data));
  } catch (error) {
    dispatch(fetchPostsError(error.message));
    resetError(dispatch);
  }
};

const getPostById = (id) => async (dispatch) => {
  dispatch(fetchPostByIdRequest());

  try {
    const { data } = await axios.get(`/posts/${id}?_embed=comments`);
    return dispatch(fetchPostByIdSuccess(data));
  } catch (error) {
    dispatch(fetchPostByIdError(error.message));
    resetError(dispatch);
  }
};

const addPost = (postObj) => async (dispatch) => {
  dispatch(addPostRequest());

  try {
    const { data } = await axios.post('/posts', postObj);
    return dispatch(addPostSuccess(data));
  } catch (error) {
    dispatch(addPostError(error.message));
    resetError(dispatch);
  }
};

const updatePost = (postObj) => async (dispatch) => {
  dispatch(updatePostRequest());
  const { id, title, body } = postObj;
  try {
    const { data } = await axios.patch(`/posts/${id}`, { title, body });
    return dispatch(updatePostSuccess(data));
  } catch (error) {
    dispatch(updatePostError(error.message));
    resetError(dispatch);
  }
};

const addComment = (commentObj) => async (dispatch) => {
  dispatch(addCommentRequest());

  try {
    const { data } = await axios.post('/comments', commentObj);
    return dispatch(addCommentSuccess(data));
  } catch (error) {
    dispatch(addCommentError(error.message));
    resetError(dispatch);
  }
};

const deletePost = (postId) => async (dispatch) => {
  dispatch(deletePostRequest());

  try {
    await axios.delete(`/posts/${postId}`);
    return dispatch(deletePostSuccess(postId));
  } catch (error) {
    dispatch(deletePostError(error.message));
    resetError(dispatch);
  }
};

export default { addPost, updatePost, addComment, getPosts, getPostById, deletePost };
