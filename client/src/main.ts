import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import textToHtml from './directives/text-to-html'
import vuetify from './plugins/vuetify'
import AOS from 'aos'
import 'aos/dist/aos.css'

import './scss/styles.scss'

Vue.config.productionTip = false

Vue.directive('textToHtml', textToHtml) // used as text-to-html attribute

new Vue({
  created () {
    console.log('setup AOS')
    AOS.init()
  },
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
