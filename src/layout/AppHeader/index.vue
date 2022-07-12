<template>
  <div class="layout-header-bar">
    <div class="left">
      <Icon :class="rotateIcon" :style="{margin: '0 20px'}" size="24" type="md-menu"
            @click.native="collapsedSider"></Icon>
      <tags-view></tags-view>
    </div>
    <div class="right">
      <Tooltip content="全屏" placement="bottom">
        <Icon :type="iconType" @click="screenfull"/>
      </Tooltip>
      <Tooltip content="关闭所有标签" placement="bottom">
        <Icon type="ios-close-circle-outline" @click="delAllTags"/>
      </Tooltip>
      <Avatar :src="userInfo.avatar" shape="square"/>
      <Dropdown style="margin-left: 20px" trigger="click" @on-click="handlerDropdown">
        <a class="username" href="javascript:void(0)">
          {{ userInfo.username }}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="toIndex">控制台</DropdownItem>
          <DropdownItem name="logout">退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>

    </div>
  </div>
</template>

<script>
import TagsView from "./tagsView";
import {mapGetters} from "vuex";
import screenfull from 'screenfull'

export default {
  props: ['isCollapsed'],
  components: {
    TagsView
  },
  data() {
    return {
      iconType: 'ios-expand'
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    rotateIcon() {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    }
  },

  methods: {
    collapsedSider() {
      this.$emit('collapsedSider')
    },
    screenfull() {
      if (!screenfull.isEnabled) {
        this.$message({message: '你的浏览器不支持全屏', type: 'warning'})
        return false
      }

      screenfull.toggle();
      this.iconType = !screenfull.isFullscreen ? 'ios-contract' : 'ios-expand'

    },
    delAllTags() {
      this.$store.commit('tagsView/removeTag')
    },
    logout() {
      this.$Modal.confirm({
        title: '退出',
        content: '<p>您确定要退出登录吗？</p>',
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$store.commit('user/logout')
            this.$Modal.remove();
            this.$Message.success('退出成功！');
          }, 1000);
        }
      });
    },
    handlerDropdown(name) {
      if (name === 'toIndex') {
        this.$router.push('/')
      }
      if (name === 'logout') {
        this.logout()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.layout-header-bar {
  background: #18bc9c;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  display: flex;
  justify-content: space-between;
  padding-right: 20px;

  .ivu-icon {
    vertical-align: -0.3em;
  }
}

.username {
  color: #fff;
  font-weight: bolder;
  font-size: 16px;
}

.right {
  .ivu-tooltip-rel {
    .ivu-icon {
      font-size: 25px;
      color: #fff;
      margin: 0 10px;
    }
  }

}
</style>
