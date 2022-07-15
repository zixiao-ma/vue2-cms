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
      <Button
        type="primary"
        @click="modal1 = true"
        v-permission="'sys:menu:add'"
        >新增</Button
      >
    </div>
    <div class="table">
      <Table
        :columns="columns"
        :data="userList"
        :loading="loading"
        border
        row-key="id"
      >
        <template slot="type" slot-scope="{ row }">
          <Tag v-if="row.type === 0" color="primary">目录</Tag>
          <Tag v-if="row.type === 1" color="success">菜单</Tag>
          <Tag v-if="row.type === 2" color="error">按钮</Tag>
        </template>
        <template slot="status" slot-scope="{ row }">
          <i-switch :value="row.status === 1" />
        </template>
        <template slot="operating" slot-scope="{ row }">
          <Button
            size="small"
            type="success"
            @click="modal1 = true"
            v-permission="'sys:menu: update'"
            >编辑</Button
          >
          <Button
            size="small"
            type="error"
            @click="del(row)"
            v-permission="'sys:menu:del'"
            >删除</Button
          >
        </template>
      </Table>
    </div>
    <Modal v-model="modal1" title="添加菜单">
      <Form ref="formInline" :label-width="80" :model="formInline">
        <FormItem label="类型" prop="name">
          <Select v-model="model1" style="width: 200px">
            <Option
              v-for="item in cityList"
              :key="item.value"
              :value="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="父级菜单" prop="name">
          <Select v-model="model1" style="width: 200px">
            <Option
              v-for="item in cityList"
              :key="item.value"
              :value="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="展示名称" prop="name">
          <Input
            v-model="formInline.name"
            placeholder="name"
            type="text"
          ></Input>
        </FormItem>
        <FormItem label="文件名称" prop="code">
          <Input v-model="formInline.code" placeholder="code" type="password">
          </Input>
        </FormItem>
        <FormItem label="图标" prop="remark">
          <Input v-model="formInline.remark" placeholder="remark"> </Input>
        </FormItem>
        <FormItem label="components" prop="name">
          <Input
            v-model="formInline.name"
            placeholder="name"
            type="text"
          ></Input>
        </FormItem>
        <FormItem label="路径" prop="code">
          <Input v-model="formInline.code" placeholder="code" type="password">
          </Input>
        </FormItem>
        <FormItem label="唯一标识" prop="remark">
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
  </div>
</template>

<script>
import userApi from "@/api/user"
import { columns } from './TableColumns'

export default {
  data () {
    return {
      formInline: {
        name: '',
        code: '',
        remark: '',
        status: 0
      },
      loading: false,
      userList: [],
      modal1: false,
      pageModel: {
        current: 1,
        size: 20,
        name: ''
      },
      columns,
      cityList: [
        {
          value: 'New York',
          label: '目录'
        },
        {
          value: 'London',
          label: '菜单'
        },
        {
          value: 'London1',
          label: '按钮'
        }
      ],
      model1: ''
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    del (row) {
      this.$Modal.confirm({
        title: '删除用户',
        content: `您确定要删除用户【${row.name}】吗？`,
        onOk: async () => {
          this.$Modal.remove()
          await this.getUserList()
        }
      })
    },
    async getUserList () {
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
