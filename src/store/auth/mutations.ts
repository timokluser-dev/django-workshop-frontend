import {MutationTree} from 'vuex';
import {AuthState} from '@/store/auth/index';
import {Me} from '@/store/auth/models';

export const mutations: MutationTree<AuthState> = {
  setMe: (state, me: Me | null) => {
    state.me = me;
  },
  setError: (state, error: string | null) => {
    state.error = error;
  },
};
