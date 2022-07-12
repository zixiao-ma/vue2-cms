import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import HomeLayout from '@/layout'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'Home',
        redirect: '/welcome',
        component: HomeLayout,
        children: [
            {
                path: '/welcome',
                name: 'welcome',
                component: () => import('@/views/welcome'),
                meta: {
                    title: '控制台'
                }
            }
        ]
    },
    {
        path: '/sys',
        name: 'sys',
        redirect: '/sys/users',
        component: HomeLayout,
        meta: {
            title: '系统管理'
        },
        children: [
            {
                path: '/sys/users',
                name: 'users',
                component: () => import('@/views/users'),
                meta: {
                    title: '用户管理'
                }
            },
            {
                path: '/sys/roles',
                name: 'roles',
                component: () => import('@/views/roles'),
                meta: {
                    title: '角色管理'
                }
            },
            {
                path: '/sys/menus',
                name: 'menus',
                component: () => import('@/views/menus'),
                meta: {
                    title: '菜单管理'
                }
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
