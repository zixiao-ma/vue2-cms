/**
 * @author MaZiXiao
 * @date 2022-07-12 14:14
 */
export const columns = [
    {
        title: '序号',
        key: 'id',
        align: 'center',
        width: 80
    },
    {
        title: '用户名',
        key: 'username',
        width: 100
    },
    {
        title: '头像',
        slot: 'avatar',
        align: 'center',
        width: 100
    },
    {
        title: '角色',
        slot: 'roles',
        align: 'center',
        width: 150
    },
    {
        title: '邮箱',
        key: 'email'
    },
    {
        title: '注册时间',
        key: 'createTime',
        width: 180
    },
    {
        title: '状态',
        slot: 'status',
        width: 100
    },
    {
        title: '操作',
        slot: 'operating',
        align: 'center'
    }
]
