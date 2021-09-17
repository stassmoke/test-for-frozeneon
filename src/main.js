import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import InstantSearch from 'vue-instantsearch';

Vue.prototype.$axios = axios;

Vue.config.productionTip = false

Vue.use(InstantSearch);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
