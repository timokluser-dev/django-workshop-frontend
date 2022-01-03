import {MutationTree} from 'vuex';
import {BackendState} from '@/store/backend/index';
import {PostType} from '@/api/types/backend';

export const mutations: MutationTree<BackendState> = {
  updatePosts: (state, posts: PostType[]) => {
    state.posts = posts;
    state.postsLoading = false;
  },
  setPostsLoading: state => {
    state.postsLoading = true;
    state.postsFailed = false;
  },
  setPostsFailed: (state, error: Error | null = null) => {
    state.postsFailed = true;
    state.postsError = error;
    state.postsLoading = false;
  },
  updatePost: (state, post: PostType) => {
    state.post = post;
    state.postLoading = false;
  },
  setPostLoading: state => {
    state.postLoading = true;
    state.postFailed = false;
  },
  setPostFailed: (state, error: Error | null = null) => {
    state.postFailed = true;
    state.postError = error;
    state.postLoading = false;
  },
};
