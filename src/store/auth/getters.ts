import {GetterTree} from 'vuex';
import {AuthState} from '@/store/auth/index';
import {Me} from '@/store/auth/models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getters: GetterTree<AuthState, any> = {
  me: (state): Me | null => {
    return state.me;
  },
  isAuthenticated: (state): boolean => {
    return state.me !== null;
  },
  error: (state): string | null => {
    return state.error
  },
};
