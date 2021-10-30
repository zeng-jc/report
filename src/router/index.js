import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/Home.vue'
import Report from 'views/Report.vue'
import RepQuery from 'views/RepQuery.vue'
import Success from 'views/Success.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/report',
    component: Report
  },
  {
    path: '/repquery',
    component: RepQuery
  },
  {
    name: 'success',
    path: '/success',
    component: Success
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.path === '/success') {
    if (to.params.message === '提交成功') return next()
    return next('/')
  }
  next()
})

export default router
