import {ActionTree} from 'vuex';
import {BackendState} from '@/store/backend/index';
import {createApolloClient} from '@/api/client';
import PostsQuery from '@/api/queries/PostsQuery.graphql';
import PostQuery from '@/api/queries/PostQuery.graphql';
import CategoriesQuery from '@/api/queries/CategoriesQuery.graphql';
import KeywordsQuery from '@/api/queries/KeywordsQuery.graphql';
import PostMutation from '@/api/mutations/PostMutation.graphql';
import {PostInput} from "@/api/types/backend";

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
  async fetchCategories({commit}): Promise<void> {
    try {
      const result = await createApolloClient().query({query: CategoriesQuery});
      if (result.data && !result.errors) {
        commit('setCategories', result.data.categoryList);
      }
    } catch (e) {
      console.error(e);
    }
  },
  async fetchKeywords({commit}): Promise<void> {
    try {
      const result = await createApolloClient().query({query: KeywordsQuery});
      if (result.data && !result.errors) {
        commit('setKeywords', result.data.keywordList);
      }
    } catch (e) {
      console.error(e);
    }
  },
  async createPost({dispatch}, post: PostInput): Promise<{success: boolean}> {
    try {
      const result = await createApolloClient().mutate({
        mutation: PostMutation,
        variables: {post},
      });
      if (!result.errors && result.data.createPost.success) {
        dispatch('fetchPosts');
        return Promise.resolve({success: true});
      }
    } catch (e) {
      console.error(e);
    }

    return Promise.resolve({success: false});
  },
};
