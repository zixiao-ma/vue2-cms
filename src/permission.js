import router from '@/router'
import store from '@/store'

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  const userInfo = store.getters.actionList.length > 0

  if (to.path === '/login' && token) {
    next(from.path)
  }

  if (to.path !== '/login' && !token) {
    next('/login')
  }
  if (to.path !== '/login' && token) {
    console.log(!userInfo)
    if (!userInfo) {
      const res = await store.dispatch('user/getUserInfo')
      const data = await store.dispatch('menu/filterRouter', res.actionList.reverse())
      await data.forEach(item => {
        router.addRoute(item)
      })
      return next(to.path)
    }
  }
  next()
})
