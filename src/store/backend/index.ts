import {Module} from 'vuex';
import {PostType} from '@/api/types/backend';
import {actions} from '@/store/backend/actions';
import {mutations} from '@/store/backend/mutations';
import {getters} from '@/store/backend/getters';

export interface BackendState {
  post: PostType | null;
  postLoading: boolean;
  postFailed: boolean;
  postError: Error | null;
  posts: PostType[] | null;
  postsLoading: boolean;
  postsFailed: boolean;
  postsError: Error | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const backendModule: Module<BackendState, any> = {
  state: () => ({
    post: null,
    postLoading: false,
    postFailed: false,
    postError: null,
    posts: null,
    postsLoading: false,
    postsFailed: false,
    postsError: null,
  }),
  actions,
  getters,
  mutations,
  namespaced: true,
};

export default backendModule;
