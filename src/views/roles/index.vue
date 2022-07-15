<template>
  <div>
    <div class="search">
      <Input
        v-model="pageModel.name"
        enter-button="查询"
        inline
        placeholder="请输入用户名"
        search
        @on-search="getUserList"
      />
      <Button type="primary" @click="addUserBtn" v-permission="'sys:role:add'"
        >新增</Button
      >
    </div>
    <div class="table">
      <Table :columns="columns" :data="userList" :loading="loading" border>
        <template slot="avatar" slot-scope="{ row }">
          <Avatar :src="row.avatar" />
        </template>
        <template slot="roles" slot-scope="{ row }">
          <Tag
            v-for="(item, i) in row.roles"
            :key="item.id"
            :color="color[i]"
            >{{ item.name }}</Tag
          >
        </template>
        <template slot="status" slot-scope="{ row }">
          <i-switch :value="row.status === 1" />
        </template>
        <template slot="operating" slot-scope="{ row }">
          <Button
            size="small"
            type="success"
            @click="editUserBtn(row)"
            v-permission="'sys:role:update'"
            >编辑</Button
          >
          <Button
            size="small"
            type="warning"
            @click="btnPermission(row)"
            v-permission="'sys:role:perm'"
            >分配权限</Button
          >
          <Button
            size="small"
            type="error"
            @click="delUser(row)"
            v-permission="'sys:role:del'"
            >删除</Button
          >
        </template>
      </Table>
    </div>
    <div class="page">
      <Page
        :total="pageModel.total"
        show-sizer
        show-total
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </div>
    <Modal
      v-model="modal1"
      :title="modalStatus === 'add' ? '添加用户' : '修改用户'"
      @on-ok="handleSubmit('formInline')"
    >
      {{ modalStatus }}
      <Form
        ref="formInline"
        :label-width="80"
        :model="formInline"
        :rules="ruleInline"
      >
        <FormItem label="用户名" prop="name">
          <Input
            v-model="formInline.name"
            placeholder="name"
            type="text"
          ></Input>
        </FormItem>
        <FormItem label="编码" prop="code">
          <Input v-model="formInline.code" placeholder="code" type="password">
          </Input>
        </FormItem>
        <FormItem label="描述" prop="remark">
          <Input v-model="formInline.remark" placeholder="remark"> </Input>
        </FormItem>
        <FormItem label="状态">
          <RadioGroup v-model="formInline.status">
            <Radio :value="1" label="1">启用</Radio>
            <Radio :value="0" label="0">禁用</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modal2" title="分配权限" @on-ok="handleAssignPermissions">
      <Tree
        :data="treeData"
        show-checkbox
        @on-check-change="getSelectedNodes"
      ></Tree>
    </Modal>
  </div>
</template>

<script>
import userApi from '@/api/user'
import ruleInline from "@/utils/ruleInline"
import { DeepCopy } from "@/utils/DeepCopy"
import { columns } from "./TableColumns"
import { filterTreeData } from "@/views/roles/utils/FilterTreeData"

export default {
  data () {
    return {
      treeData: [],
      ruleInline,
      modal2: false,
      formInline: {
        name: '',
        code: '',
        remark: '',
        status: 0
      },
      modalStatus: 'add',
      modal1: false,
      total: 10,
      PermissionsID: null,
      loading: false,
      color: ['primary', 'success', 'error', 'warning', 'magenta', 'volcano', 'orange', 'gold'],
      userList: [],
      columns,
      pageModel: {
        current: 1,
        size: 10,
        name: '',
        total: 0

      }
    }
  },
  created () {
    this.getUserList()

  },
  methods: {
    async getUserList () {
      try {
        this.loading = true
        const res = await userApi.getRoleList(this.pageModel)

        this.userList = res.records
        this.pageModel.total = res.total
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    changePage (val) {
      this.pageModel.current = val
      this.getUserList()
    },
    addUserBtn () {
      this.$refs.formInline.resetFields()
      this.modal1 = true
      this.modalStatus = 'add'
    },
    changePageSize (val) {
      this.pageModel.size = val
      this.getUserList()
    },
    handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.modalStatus === 'add' ? await this.addNewUser() : await this.editUserInfo()
          this.$Message.success(`${this.modalStatus === 'add' ? '添加' : '修改'}成功！`)
        } else {
          this.$Message.error('请填写正确添加用户信息!')
        }
      })
    },
    delUser (row) {
      console.log([row.id])
      this.$Modal.confirm({
        title: '删除用户',
        content: `您确定要删除用户【${row.username}】吗？`,
        onOk: async () => {
          await userApi.deleteRole([row.id])
          this.$Modal.remove()
          this.$Message.success('删除成功！')
          await this.getUserList()
        }
      })
    },
    editUserBtn (row) {
      this.modalStatus = 'edit'
      this.modal1 = true
      this.formInline = DeepCopy(row)
    },
    async addNewUser () {
      await userApi.roleAdd(this.formInline)
      await this.getUserList()
    },
    async editUserInfo () {
      await userApi.editRoleInfo(this.formInline)
      await this.getUserList()
    },
    async handleAssignPermissions (params) {
      const res = await userApi.AssignPermissions(this.PermissionsID, params)
      await this.getUserList()
      this.$Message.success('分配成功！')
    },
    async btnPermission (row) {
      this.PermissionsID = row.id
      this.treeData = filterTreeData(this.$store.getters.menus)
      this.modal2 = true
      console.log(row)
    },
    getSelectedNodes (data) {
      const arr = data.map(item => item.id)
      this.handleAssignPermissions(arr)
    }
  },
}
</script>
<style lang="scss" scoped>
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
