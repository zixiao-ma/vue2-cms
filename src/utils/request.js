/**
 * @author MaZiXiao
 * @date 2022-07-11 12:46
 */
import axios from 'axios'
import loading from '@/utils/loading'
import {Message} from "view-design";
import {_showErrorMsg} from "@/utils/ErrorMessage";
import store from "@/store";

let showMessage = false
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 6000
})
// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // TODO 添加token
        loading.nprogress.start()
        const token = store.getters.token
        if (token) config.headers.token = token
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)
// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        // loading.elLoading.done()
        loading.nprogress.done()
        const {data: {code, data, msg}} = response
        if (code === 200) {
            showMessage && Message.success(msg)
            return data
        } else {
            _showErrorMsg(msg, code)
            return Promise.reject(msg)
        }

    },
    function (error) {
        // 对响应错误做点什么
        const msg = error.toString()
        if (msg.includes('NetWork')) {
            Message.error('网络错误，请检查您的网络！')
        }
        if (msg.includes('Timeout')) {
            Message.error('请求超时，请检查您的网络！')
        }
        const {status} = error.response
        switch (status) {
            case 401:
                Message.error('Token超时,请重新登录！')
                // TODO token过期处理
                /* store.commit('user/loginOut')
                 router.push({name: 'login'})*/
                break;
            case 404:
                Message.error('访问接口地址不正确！')
                break
            case 500:
                Message.error('服务器发生错误！')
                break
            case 503:
                Message.error('服务暂时不可用！')
                break
            case 408:
                Message.error('客户端请求超时!')
                break;
        }
        return Promise.reject(error)
    }
)

function request(optios, showMsg = false) {
    showMessage = showMsg
    if (optios.method.toLowerCase() === 'get') {
        optios.params = optios.data || {}
    }
    return instance(optios)
}

export default request
