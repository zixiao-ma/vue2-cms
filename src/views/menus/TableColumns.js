/**
 * @author MaZiXiao
 * @date 2022-07-12 14:14
 */
/*component: "sys/Home"
createTime: "2022-06-02 01:03:50"
deleted: 0
icon: "s-home"
id: 1
label: "控制台"
name: "home"
orderNum: 1
parentId: 0
path: "/"
perms: "sys:home"
status: 2
type: 0
updateTime: "2022-07-12 15:24:35"*/

export const columns = [

    {
        title: '序号',
        key: 'id',
        width: 80,
        type: 'expand'
    },
    {
        title: '展示名称',
        key: 'label',
        width: 140
    },

    {
        title: '文件名称',
        key: 'name',
        width: 100
    },
    {
        title: '路径',
        key: 'path',
        width: 100
    },
    {
        title: '组件',
        key: 'perms',
        width: 180
    },
    {
        title: '唯一标识',
        key: 'icon',
        width: 100
    },
    {
        title: '类型',
        slot: 'type',
        width: 100
    },
    {
        title: '创建时间',
        key: 'createTime',
        width: 100
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
