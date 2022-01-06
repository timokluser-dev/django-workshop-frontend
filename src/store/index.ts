import Vue from 'vue';
import Vuex from 'vuex';
import backend from './backend';
import auth from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    backend,
    auth
  },
});
