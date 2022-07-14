/**
 * @author MaZiXiao
 * @date 2022-07-07 20:36
 */
export default {
  path: '/system',
  name: 'user-query',
  component: () => import('@/layout/index'),
  redirect: '/system/user',
  meta: {
    title: '系统管理',
    icon: 'setting-outlined'
  },
  children: [
    {
      path: '/system/user',
      name: '/system/user',
      component: () => import('@/views/user'),
      meta: {
        title: '用户管理',
        icon: 'user-outlined'
      }
    }
  ]
}
