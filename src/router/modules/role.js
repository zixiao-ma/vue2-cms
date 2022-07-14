/**
 * @author MaZiXiao
 * @date 2022-07-07 20:45
 */
export default {
  path: '/system',
  name: 'role-query',
  component: () => import('@/layout/index'),
  redirect: '/system/user',
  meta: {
    title: '系统管理',
    icon: 'setting-outlined'
  },
  children: [
    {
      path: '/system/role',
      name: '/system/role',
      component: () => import('@/views/role'),
      meta: {
        title: '角色管理',
        icon: 'bars-outlined'
      }
    }
  ]
}
