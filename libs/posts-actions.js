import { createAction } from '@reduxjs/toolkit';
import types from './posts-constants';

export const fetchPostsRequest = createAction(types.fetchRequest);
export const fetchPostsSuccess = createAction(types.fetchSuccess);
export const fetchPostsError = createAction(types.fetchError);

export const fetchPostByIdRequest = createAction(types.fetchByIdRequest);
export const fetchPostByIdSuccess = createAction(types.fetchByIdSuccess);
export const fetchPostByIdError = createAction(types.fetchByIdError);

export const addPostRequest = createAction(types.addRequest);
export const addPostSuccess = createAction(types.addSuccess);
export const addPostError = createAction(types.addError);

export const addCommentRequest = createAction(types.addCommentRequest);
export const addCommentSuccess = createAction(types.addCommentSuccess);
export const addCommentError = createAction(types.addCommentError);

export const updatePostRequest = createAction(types.updateRequest);
export const updatePostSuccess = createAction(types.updateSuccess);
export const updatePostError = createAction(types.updateError);

export const deletePostRequest = createAction(types.deleteRequest);
export const deletePostSuccess = createAction(types.deleteSuccess);
export const deletePostError = createAction(types.deleteError);

export const errorRemover = createAction(types.errorRemove);
