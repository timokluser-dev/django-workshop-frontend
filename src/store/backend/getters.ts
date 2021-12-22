import {GetterTree} from 'vuex';
import {BackendState} from '@/store/backend/index';
import {PostType} from '@/api/types/backend';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getters: GetterTree<BackendState, any> = {
  post: (state): PostType | null => {
    return state.post;
  },
  postLoading: (state): boolean => {
    return state.postLoading;
  },
  posts: (state): PostType[] | null => {
    return state.posts;
  },
  postsLoading: (state): boolean => {
    return state.postsLoading;
  },
};
