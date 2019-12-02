import router from '../router'
import { getToken } from './auth'

router.beforeEach((to, from, next) => {
  console.log(to)
  if (getToken() || to.path === '/login') {
    next()
  } else {
    next('/login')
  }
})
router.afterEach(() => {
  console.log('after router')
  // NProgress.done() // finish progress bar
})
