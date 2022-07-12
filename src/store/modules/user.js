/**
 * @author MaZiXiao
 * @date 2022-07-11 15:55
 */
import userApi from '@/api/user'
import {getItem, setItem} from "@/utils/storage";
import router from "@/router";

export default {
    namespaced: true, state: {
        token: getItem('CMS_TOKEN') || '',
        menus: [],
        authoritys: [],
        userInfo: {}
    }, mutations: {
        setToken(state, token) {
            state.token = token
            setItem('CMS_TOKEN', state.token)
        }, setMenus(state, menus) {
            state.menus = menus
        }, setAuthoritys(state, authoritys) {
            state.authoritys = authoritys
        }, setUserInfo(state, info) {
            state.userInfo = info
        }, logout(state) {
            state.token = '';
            setItem('CMS_TOKEN', '');
            state.menus = [];
            state.userInfo = {};
            state.authoritys = [];
            router.push('/login')
        }
    }, actions: {
        async login({commit}, formData) {
            try {
                const res = await userApi.login(formData)
                commit('setToken', res)
                return res
            } catch (error) {

            }
        }, async getNav({commit}) {

            try {
                const res = await userApi.getNav()
                const userInfo = await userApi.getUserInfo()
                commit('setUserInfo', userInfo)
                commit('setMenus', res.menus)
                commit('setAuthoritys', res.authoritys)
                return res
            } catch (error) {

            }
        }
    }

}
