import {Module} from 'vuex';
import {PostType} from '@/api/types/backend';
import {actions} from '@/store/backend/actions';
import {mutations} from '@/store/backend/mutations';
import {getters} from '@/store/backend/getters';

export interface BackendState {
  post: PostType | null;
  postLoading: boolean;
  posts: PostType[] | null;
  postsLoading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const backendModule: Module<BackendState, any> = {
  state: () => ({
    post: null,
    postLoading: false,
    posts: null,
    postsLoading: false,
  }),
  actions,
  getters,
  mutations,
  namespaced: true,
};

export default backendModule;
