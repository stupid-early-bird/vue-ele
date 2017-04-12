import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import msite from '@/components/main/msite'
import order from '@/components/main/order'
import profile from '@/components/main/profile'
import discover from '@/components/main/discover'
import shop from '@/components/shop'
import goods from '@/components/goods/goods'
import seller from '@/components/seller/seller'
import ratings from '@/components/ratings/ratings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
      children: [
        {
          path: '',
          name: 'msite',
          component: msite
        },
        {
          path: '/msite',
          name: 'msite',
          component: msite
        },
        {
          path: '/discover',
          name: 'discover',
          component: discover
        },
        {
          path: '/order',
          name: 'order',
          component: order
        },
        {
          path: '/profile',
          name: 'profile',
          component: profile
        }
       ]
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop,
      children: [
        {
          path: '/',
          name: 'main',
          component: goods
        },
        {
          path: '/shop/goods',
          name: 'goods',
          component: goods
        },
        {
          path: '/shop/seller',
          name: 'seller',
          component: seller
        },
        {
          path: '/shop/ratings',
          name: 'ratings',
          component: ratings
        }
       ]
    }
  ],
  linkActiveClass: 'active'
})
