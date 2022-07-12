<template>
  <div>
    <div class="search">
      <Input v-model="pageModel.name" enter-button="查询" inline placeholder="请输入用户名" search
             @on-search="getUserList"/>
      <Button type="primary">新增</Button>

    </div>
    <div class="table">
      <Table :columns="columns" :data="userList" :loading="loading" border row-key="id">
        <template slot="type" slot-scope="{ row }">
          <Tag v-if="row.type===0" color="primary">目录</Tag>
          <Tag v-if="row.type===1" color="success">菜单</Tag>
          <Tag v-if="row.type===2" color="error">按钮</Tag>
        </template>
        <template slot="status" slot-scope="{ row }">
          <i-switch :value="row.status===1"/>
        </template>
        <template slot="operating" slot-scope="{ row }">
          <Button size="small" type="success">编辑</Button>
          <Button size="small" type="error">删除</Button>
        </template>
      </Table>

    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
import {columns} from './TableColumns'

export default {
  data() {
    return {
      loading: false,
      userList: [],
      pageModel: {
        current: 1,
        size: 20,
        name: ''
      },
      columns,
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      try {
        this.loading = true
        const res = await userApi.getMenuList(this.pageModel)
      
        this.userList = res
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
  },
}
</script>

<style lang='scss' scoped>
.search {
  width: 350px;
  display: flex;


}

.ivu-btn {
  margin-left: 10px;
}

.page {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.table {
  margin-top: 10px;
}
</style>
