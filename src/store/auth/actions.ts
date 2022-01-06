import {ActionTree} from 'vuex';
import {AuthState} from '@/store/auth/index';
import {createApolloClient} from '@/api/client';
import LoginMutation from '@/api/mutations/LoginMutation.graphql';
import LogoutMutation from '@/api/mutations/LogoutMutation.graphql';
import {LoginInput} from '@/api/types/mutations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const actions: ActionTree<AuthState, any> = {
  async loginUser({commit}, login: LoginInput): Promise<void> {
    commit('setError', null);
    try {
      const result = await createApolloClient().mutate({
        mutation: LoginMutation,
        variables: {...login},
      });
      if (!result.errors) {
        commit('setMe', result.data.tokenAuth.payload);
        return Promise.resolve();
      }
    } catch (e) {
      commit('setError', 'Unfortunately, no valid user was found. Please try again.');
      return Promise.reject();
    }

    return Promise.reject();
  },
  async logout({commit}): Promise<void> {
    commit('setError', null);
    try {
      const result = await createApolloClient().mutate({
        mutation: LogoutMutation,
      });
      if (!result.errors && result.data.deleteToken.deleted) {
        commit('setMe', null);
        return Promise.resolve();
      }
    } catch (e) {
      commit('setError', 'Could not logout');
      return Promise.reject();
    }

    return Promise.reject();
  },
};
