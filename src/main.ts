import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueApollo from 'vue-apollo'

Vue.config.productionTip = false

Vue.use(VueApollo);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
