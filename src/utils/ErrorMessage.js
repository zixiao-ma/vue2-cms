import {Message} from "view-design";

/**
 * @author MaZiXiao
 * @date 2022-07-11 16:27
 */
export function _showErrorMsg(msg, code) {
    let customErrorMessage = {
        1: '请求错误'
    }
    const message = customErrorMessage[code] || msg || '未知错误！'
    Message.error(message)
}
