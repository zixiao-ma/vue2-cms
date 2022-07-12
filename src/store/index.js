import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user";
import tagsView from "@/store/modules/tagsView";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {
        token: state => state.user.token,
        menus: state => state.user.menus,
        tags: state => state.tagsView.tags,
        userInfo: state => state.user.userInfo
    },
    mutations: {},
    actions: {},
    modules: {
        user,
        tagsView
    }
})
