import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'tray-page',
      component: () => import(/* webpackChunkName: "tray" */ '@/pages/TrayPage.vue')
    },
    {
      path: '/rename-page',
      name: 'rename-page',
      component: () => import(/* webpackChunkName: "RenamePage" */ '@/pages/RenamePage.vue')
    },
    {
      path: '/mini-page',
      name: 'mini-page',
      component: () => import(/* webpackChunkName: "MiniPage" */ '@/pages/MiniPage.vue')
    },
    {
      path: '/main-page',
      name: 'main-page',
      component: () => import(/* webpackChunkName: "SettingPage" */ '@/layouts/Main.vue'),
      children: [
        {
          path: 'others/:type',
          component: () => import(/* webpackChunkName: "Other" */ '@/pages/picbeds/Others.vue'),
          name: 'others'
        },
        {
          path: 'shortKey',
          component: () => import(/* webpackChunkName: "ShortkeyPage" */ '@/pages/ShortKey.vue'),
          name: 'shortKey'
        },{
          path: 'help',
          component: () => import(/* webpackChunkName: "Help" */ '@/pages/Help.vue'),
          name: 'help'
        },
        {
          path: 'crawler',
          component: () => import(/* webpackChunkName: "Crawler" */ '@/pages/Crawler.vue'),
          name: 'crawler'
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
