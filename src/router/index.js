import Vue from 'vue'
import Router from 'vue-router'
import msite from '@/components/msite'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'msite',
      component: msite
    },
    {
      path: '/msite',
      name: 'msite',
      component: msite
    }
  ],
  linkActiveClass: 'active'
})
