import { createSelector } from '@reduxjs/toolkit';

export const getAllPosts = (state) => state.posts.items;
export const getLoading = (state) => state.posts.isLoading;
export const getErrorMessage = (state) => state.posts.error;

// export const getSortedPosts = createSelector([getAllPosts], (allPosts) => {
//   const sortedPosts = allPosts.sort((a, b) => b.id - a.id);

//   return sortedPosts;
// });

export const getPostsLength = (state) => {
  const allPosts = getAllPosts(state);
  return allPosts.length;
};
