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
        title: '角色',
        key: 'name',
        width: 140
    },

    {
        title: '编码',
        key: 'code',
        width: 100
    },
    {
        title: '描述',
        key: 'remark'
    },
    {
        title: '创建时间',
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
