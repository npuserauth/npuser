import Vue from 'vue'
import Router from 'vue-router'
import Home2 from './views/Home2.vue'
import NPUserHome from './views/NP-User-Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: NPUserHome,
      },
      {
        path: '/npuser',
        name: 'npuser',
        component: NPUserHome,
      },
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      },
    ],
    /*
      Support scroll to # hash for the home page. See NP-User-Home.vue
     */
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return {
          selector: to.hash,
          offset: { x: 0, y: 40 }
        }
      }
    }
  }
)
