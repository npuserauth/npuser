import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Do not want a service worker until the app is super stable and released.
// import './registerServiceWorker'
import textToHtml from './directives/text-to-html'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.directive('textToHtml', textToHtml) // used as text-to-html attribute

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
