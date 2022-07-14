/**
 * @author MaZiXiao
 * @date 2022-07-07 21:00
 */
import { privateRoutes, publicRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    router: []
  },
  mutations: {
    setRouter (state, newRouter) {
      state.router = [...publicRoutes, ...newRouter]
    }
  },
  actions: {
    filterRouter ({ commit }, menus) {
      const result = []
      menus.forEach(name => {
        result.push(...privateRoutes.filter(item => item.name === name))
      })
      result.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      commit('setRouter', result)
      return result
    }
  }
}
