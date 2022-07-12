/**
 * @author MaZiXiao
 * @date 2022-07-11 18:23
 */
let id;

function recursion(data, path) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].path === path) {
            id = data[i].id
            return false
        } else {
            recursion(data[i].children, path)
        }
    }
}

export const findMenuIndex = (menus, path) => {
    path === '/welcome' ? id = 1 : recursion(menus, path)
    return id
}
