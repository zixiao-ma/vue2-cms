/*
* @配置nprogress进度条loading
*  */
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
// Nprogress 关闭小圆圈
Nprogress.configure({showSpinner: false});
const nprogress = Nprogress
export default {
    nprogress
}
