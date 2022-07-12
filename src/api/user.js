/**
 * @author MaZiXiao
 * @date 2022-07-11 12:58
 */
import request from "@/utils/request";

/**
 * 获取图片验证码
 * @return {*}
 */
const getCaptcha = () => {
    return request({
        url: '/sys/captcha',
        method: "get"
    })
}
/**
 *
 * @param data 登录接口
 * @return {AxiosPromise}
 */
const login = (data) => {
    return request({
        url: `/sys/login?username=${data.username}&password=${data.password}&code=${data.code}&token=${data.token}`,
        method: 'post'
    })
}
/**
 * 获取当前用户登录的菜单数据
 * @return {AxiosPromise}
 */
const getNav = () => {
    return request({
        url: '/sys/menu/nav',
        method: 'get'
    })
}
const getUserInfo = () => {
    return request({
        url: '/sys/user/info',
        method: "GET"
    })
}
const getUserList = (data) => {
    return request({
        url: '/sys/user/list',
        method: "get",
        data
    })
}
const addUser = (params) => {

    return request({
        url: '/sys/user/add',
        method: 'post',
        data: params
    })
}
const delUser = (params) => {
    return request({
        url: '/sys/user/del',
        method: "post",
        data: params
    })
}
const editUserInfo = (data) => {
    return request({
        url: '/sys/user/update',
        method: "put",
        data
    })
}
const getRoleList = (data) => {
    return request({
        url: '/sys/role/list',
        method: "get",
        data
    })
}
export default {
    getCaptcha,
    login,
    getNav,
    getUserInfo,
    getUserList,
    addUser,
    delUser,
    editUserInfo,
    getRoleList
}
