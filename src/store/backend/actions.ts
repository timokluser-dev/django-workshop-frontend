import {ActionTree} from 'vuex';
import {BackendState} from '@/store/backend/index';
import {createApolloClient} from '@/api/client';
import PostsQuery from '@/api/queries/PostsQuery.graphql';
import PostQuery from '@/api/queries/PostQuery.graphql';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const actions: ActionTree<BackendState, any> = {
  async fetchPosts({commit}): Promise<void> {
    commit('setPostsLoading');

    try {
      const result = await createApolloClient().query({query: PostsQuery});
      if (result.data && !result.errors) {
        commit('updatePosts', result.data.postList);
      } else {
        commit('setPostsFailed');
      }
    } catch (e) {
      commit('setPostsFailed', e);
    }
  },
  async fetchPost({commit}, id: string): Promise<void> {
    commit('setPostLoading');

    try {
      const result = await createApolloClient().query({query: PostQuery, variables: {id: id}});
      if (result.data && !result.errors) {
        commit('updatePost', result.data.postDetail);
      } else {
        commit('setPostFailed');
      }
    } catch (e) {
      commit('setPostFailed', e);
    }
  },
};
