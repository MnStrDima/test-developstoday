import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
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
  addCommentRequest,
  addCommentSuccess,
  addCommentError,
  updatePostRequest,
  updatePostSuccess,
  updatePostError,
  deletePostRequest,
  deletePostSuccess,
  deletePostError,
  errorRemover,
} from './posts-actions';

const initialState = {
  posts: {
    items: [],
    isLoading: false,
    error: '',
  },
};

const items = createReducer(initialState.posts.items, {
  [fetchPostsSuccess]: (_, { payload }) => payload,
  [addPostSuccess]: (state, { payload }) => [...state, payload],
  [updatePostSuccess]: (state, { payload }) => state.forEach((post) => (post.id === payload.id ? payload : post)),
  [addCommentSuccess]: (state, { payload }) => state.forEach((post) => (post.id === payload.postId ? payload : post)),
  [deletePostSuccess]: (state, { payload }) => state.filter((id) => id !== payload),
});

const isLoading = createReducer(initialState.posts.isLoading, {
  [updatePostRequest]: () => true,
  [updatePostSuccess]: () => false,
  [updatePostError]: () => false,
  [fetchPostByIdRequest]: () => true,
  [fetchPostByIdSuccess]: () => false,
  [fetchPostByIdError]: () => false,
  [fetchPostsRequest]: () => true,
  [fetchPostsSuccess]: () => false,
  [fetchPostsError]: () => false,
  [addPostRequest]: () => true,
  [addPostSuccess]: () => false,
  [addPostError]: () => false,
  [addCommentRequest]: () => true,
  [addCommentSuccess]: () => false,
  [addCommentError]: () => false,
  [deletePostRequest]: () => true,
  [deletePostSuccess]: () => false,
  [deletePostError]: () => false,
});

const error = createReducer(initialState.posts.error, {
  [fetchPostsError]: (_, { payload }) => payload,
  [fetchPostByIdError]: (_, { payload }) => payload,
  [addPostError]: (_, { payload }) => payload,
  [addCommentError]: (_, { payload }) => payload,
  [updatePostError]: (_, { payload }) => payload,
  [deletePostError]: (_, { payload }) => payload,
  [errorRemover]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  isLoading,
  error,
});
