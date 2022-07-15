<template>
  <div>
    <div class="search">
      <Input
        v-model="pageModel.username"
        enter-button="查询"
        inline
        placeholder="请输入用户名"
        search
        @on-search="getUserList"
      />
      <Button type="primary" @click="addUserBtn" v-permission="'sys:user:add'"
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
            v-permission="'sys:user:update'"
            >编辑</Button
          >
          <Button
            size="small"
            type="warning"
            @click="btnPermissions(row)"
            v-permission="'sys:user:assign'"
            >分配角色</Button
          >
          <Button
            size="small"
            type="error"
            @click="delUser(row)"
            v-permission="'sys:user:del'"
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
      <Form
        ref="formInline"
        :label-width="80"
        :model="formInline"
        :rules="ruleInline"
      >
        <FormItem label="头像">
          <Avatar :src="formInline.avatar" shape="square" />
        </FormItem>
        <FormItem label="用户名" prop="username">
          <Input
            v-model="formInline.username"
            placeholder="Username"
            type="text"
          ></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input
            v-model="formInline.password"
            placeholder="Password"
            type="password"
          >
          </Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="formInline.email" placeholder="email" type="email">
          </Input>
        </FormItem>
        <FormItem label="状态">
          <RadioGroup v-model="formInline.status">
            <Radio label="1">启用</Radio>
            <Radio label="0">禁用</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modal2" title="分配权限" @on-ok="assignPermissions">
      <Select v-model="selectValue" :max-tag-count="2" multiple>
        <Option
          v-for="item in selectRoleList"
          :key="item.value"
          :value="item.id"
          >{{ item.name }}</Option
        >
      </Select>
    </Modal>
  </div>
</template>

<script>
import userApi from '@/api/user'
import ruleInline from "@/utils/ruleInline"
import { DeepCopy } from "@/utils/DeepCopy"
import { columns } from "@/views/users/TableColumns"
/*avatar: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8e360403-b17a-4c03-87b3-832ad7eb5fde/944e2483-68a2-47b6-b4fd-9e65f5a8c76d.jpg"
createTime: "2022-06-11 00:16:16"
deleted: 0
email: "51318492321@qq.com"
id: 1
password: "$2a$10$d9i937oB8s8wtJcOltCsGuo/SotfhA1tBheRXplciT7cfz/5LJwBO"
roles: Array(1)
status: 1
updateTime: "2022-07-11 19:55:01"
username: "duck"*/
export default {
  data () {
    return {
      ruleInline,
      modal2: false,
      formInline: {
        username: '',
        password: '',
        email: '',
        status: 0,
        avatar: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg'
      },
      modalStatus: 'add',
      modal1: false,
      total: 10,
      loading: false,
      color: ['primary', 'success', 'error', 'warning', 'magenta', 'volcano', 'orange', 'gold'],
      userList: [],
      columns,
      pageModel: {
        current: 1,
        size: 10,
        username: '',
        total: 0
      },
      permissionId: null,
      selectValue: [],
      selectRoleList: []
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      try {
        this.loading = true
        const res = await userApi.getUserList(this.pageModel)
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
          await userApi.delUser([row.id])
          this.$Modal.remove()
          this.$Message.success('删除成功！')
          this.getUserList()
        }
      })
    },
    editUserBtn (row) {
      this.modalStatus = 'edit'
      this.modal1 = true
      this.formInline = DeepCopy(row)
    },
    async addNewUser () {
      await userApi.addUser(this.formInline)
      await this.getUserList()
    },
    async editUserInfo () {
      await userApi.editUserInfo(this.formInline)
      await this.getUserList()
    },
    async btnPermissions (row) {
      this.selectValue = row.roles.map(item => item.id)
      const res = await userApi.getRoleList(this.pageModel)
      this.selectRoleList = res.records
      this.permissionId = row.id
      if (res.records) {
        this.modal2 = true
      }

    },
    async assignPermissions () {
      const res = await userApi.userAssign(this.permissionId, this.selectValue)
      this.$Message.success('分配成功！')
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
