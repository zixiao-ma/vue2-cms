<template>
  <div class="login-container">
    <Card>
      <h2>智慧服务平台</h2>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="username">
          <Input v-model="formInline.username" clearable placeholder="Username" type="text">
            <Icon slot="prepend" type="ios-person-outline"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input v-model="formInline.password" password placeholder="Password" type="password">
            <Icon slot="prepend" type="ios-lock-outline"></Icon>
          </Input>
        </FormItem>
        <FormItem class="code" prop="code">
          <Input v-model="formInline.code" placeholder="code" type="text">
            <Icon slot="prepend" type="ios-finger-print"/>
            <span slot="suffix" class="img">
              <img v-if="codeUrl" slot="suffix" :src="codeUrl" alt="" @click="getCodeUrl">
              <Spin v-else></Spin>
            </span>
          </Input>
        </FormItem>
        <FormItem>
          <Button :loading="loading" long type="primary" @click="handleSubmit('formInline')">
            {{ loading ? '登录中...' : '登录' }}
          </Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import userApi from '@/api/user'
import ruleInline from '../../utils/ruleInline'

export default {
  data() {
    return {
      codeUrl: '',
      loading: false,
      formInline: {
        username: 'duck',
        password: 'admin888',
        code: '123',
        token: ''
      },
      ruleInline
    }
  },
  created() {
    this.getCodeUrl()
  },
  methods: {
    /**
     * 获取验证码
     * @return {Promise<void>}
     */
    async getCodeUrl() {
      const {captchaImg, token} = await userApi.getCaptcha()
      this.codeUrl = captchaImg
      this.formInline.token = token
    },
    /**
     * 表单验证方法
     * @param name
     */
    handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.loading = true
          const res = await this.$store.dispatch('user/login', this.formInline)
          if (res) {
            await this.$router.push('/')
            await this.$Message.success('登录成功！');
          }
          this.loading = false
        } else {
          this.$Message.error('请填写登录信息!');
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 10%;
  align-items: flex-start;
}

.ivu-card {
  width: 400px;
}

img {
  width: 100%;
  height: 100%;
}

.code {
  display: flex;

  ::v-deep .ivu-input-suffix {
    right: -40px !important;
  }

  .img {
    height: 32px;
    width: 117px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }
}

::v-deep .ivu-input-suffix {
  z-index: 99;
}

h2 {
  text-align: center;
  padding: 10px 0;
}
</style>
