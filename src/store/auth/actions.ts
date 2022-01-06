import {ActionTree} from 'vuex';
import {AuthState} from '@/store/auth/index';
import {createApolloClient} from '@/api/client';
import ProfileQuery from '@/api/queries/ProfileQuery.graphql';
import LoginMutation from '@/api/mutations/LoginMutation.graphql';
import LogoutMutation from '@/api/mutations/LogoutMutation.graphql';
import {LoginInput} from '@/api/types/mutations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const actions: ActionTree<AuthState, any> = {
  async loginUser({commit, dispatch}, login: LoginInput): Promise<void> {
    commit('setError', null);
    try {
      const result = await createApolloClient().mutate({
        mutation: LoginMutation,
        variables: {...login},
      });
      if (!result.errors) {
        await dispatch('fetchProfile');
      }
    } catch (e) {
      commit('setError', 'Unfortunately, no valid user was found. Please try again.');
    }
  },
  async logout({commit}): Promise<void> {
    commit('setError', null);
    try {
      const result = await createApolloClient().mutate({
        mutation: LogoutMutation,
      });
      if (!result.errors && result.data.deleteToken.deleted) {
        commit('setMe', null);
      }
    } catch (e) {
      commit('setError', 'Could not logout');
      return Promise.reject();
    }
  },
  async fetchProfile({commit, dispatch}): Promise<any> {
    commit('setError', null);
    try {
      const result = await createApolloClient().query({
        query: ProfileQuery,
      });
      if (result.data && !result.errors) {
        commit('setMe', result.data.me);
      }
    } catch (e) {
      // delete token
      dispatch('logout');
    }
  },
};
