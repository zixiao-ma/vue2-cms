<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <app-aside :isCollapsed="isCollapsed"></app-aside>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <app-header @collapsedSider="collapsedSider" :isCollapsed="isCollapsed"></app-header>
        </Header>
        <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
          <div class="breadCrumb">
            <my-breadcrumb></my-breadcrumb>
          </div>
          <app-main></app-main>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import AppAside from './AppAside/index'
import AppHeader from "@/layout/AppHeader";
import AppMain from './AppMain'
import MyBreadcrumb from './AppMain/breadCrumb'

export default {
  components: {
    AppAside,
    AppHeader,
    AppMain,
    MyBreadcrumb
  },
  data() {
    return {
      isCollapsed: false
    }
  },
  computed: {},
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    }
  }
}
</script>
<style lang="scss">
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  height: 100%;
}


.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

.menu-icon {
  transition: all .3s;
}

.rotate-icon {
  transform: rotate(-90deg);
}

.breadCrumb {
  height: 40px;
  width: 100%;
  line-height: 40px;
  padding: 0 10px;
  border-bottom: 1px solid #dddddd;
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width .2s ease;
}

.ivu-layout.ivu-layout-has-sider {
  height: 100%;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
