/**
 * @author MaZiXiao
 * @date 2022-07-07 20:43
 */
export default {
  path: '/system',
  name: 'menu_query',
  component: () => import('@/layout/index'),
  redirect: '/system/user',
  meta: {
    title: '系统管理',
    icon: 'setting-outlined'
  },
  children: [
    {
      path: '/system/menu',
      name: '/system/menu',
      component: () => import('@/views/menu'),
      meta: {
        title: '菜单管理',
        icon: 'file-search-outlined'
      }
    }
  ]
}
