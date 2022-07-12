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
const getMenuList = (data) => {
    return request({
        url: '/sys/menu/list',
        method: "get",
        data
    })
}
const userAssign = (id, data) => {
    return request({
        url: '/sys/user/assign/' + id,
        method: "post",
        data
    })
}
const roleAdd = (data) => {
    return request({
        url: '/sys/role/add',
        method: 'post',
        data
    })
}
const editRoleInfo = (data) => {
    return request({
        url: '/sys/role/update',
        method: "put",
        data
    })
}
const deleteRole = (params) => {
    return request({
        url: '/sys/role/del',
        method: "DELETE",
        data: params
    })
}
const AssignPermissions = (roleId, integers) => {
    return request({
        url: `/sys/role/perm/${roleId}`,
        method: 'post',
        data: integers
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
    getRoleList,
    userAssign,
    roleAdd,
    editRoleInfo,
    deleteRole,
    AssignPermissions,
    getMenuList
}
