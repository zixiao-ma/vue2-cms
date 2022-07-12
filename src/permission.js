/**
 * @author MaZiXiao
 * @date 2022-07-11 16:57
 */
import router from '@/router/index'
import store from "@/store";

router.beforeEach(async (to, from, next) => {
    if (to.path !== '/login' && to.path !== '/welcome') {
        if (to.meta.title) {
            const obj = {
                title: to.meta.title,
                path: to.path
            }
            store.commit('tagsView/addTag', obj)
        }
    }
    const token = store.getters.token;
    const hasMenus = store.getters.menus.length <= 0
    if (to.path === '/login' && token) {
        console.log('1')
        return next('/')
    }
    if (to.path !== '/login' && !token) {
        console.log(token, '2')
        return next('/login')
    }
    if (to.path !== '/login' && token) {
        if (hasMenus) {
            const res = await store.dispatch('user/getNav')
        }
        return next()
    }
    next()
})
