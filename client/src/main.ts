import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import textToHtml from './directives/text-to-html'

Vue.config.productionTip = false
Vue.directive('textToHtml', textToHtml) // used as text-to-html attribute

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
