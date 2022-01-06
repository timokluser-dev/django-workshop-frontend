import {Module} from 'vuex';
import {actions} from '@/store/auth/actions';
import {mutations} from '@/store/auth/mutations';
import {getters} from '@/store/auth/getters';
import {Me} from '@/store/auth/models';

export interface AuthState {
  me: Me | null;
  error: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authModule: Module<AuthState, any> = {
  state: () => ({
    me: null,
    error: null,
  }),
  actions,
  getters,
  mutations,
  namespaced: true,
};

export default authModule;
