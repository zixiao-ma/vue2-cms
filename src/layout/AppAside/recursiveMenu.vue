<template>
  <div>
    <template>
      <MenuItem :name="tree.id" v-if="!tree.children||tree.children.length<=0" :to="tree.path">
        <i :class="getIconName(tree.id)"></i>
        <span> {{ tree.label }}</span>
      </MenuItem>
      <Submenu :name="tree.id" v-else>
        <template slot="title">
          <i :class="getIconName(tree.id)"></i>
          <span>  {{ tree.label }}</span>
        </template>
        <MenuItem :name="item.id" v-for="item in tree.children" :key="item.id" :to="item.path">
          <i :class="getIconName(item.id)"></i>
          <span>{{ item.label }}</span>
        </MenuItem>
      </Submenu>
    </template>
  </div>
</template>

<script>
import MyIcon from './icon'

export default {
  props: ['tree'],
  name: 'MenuTree',
  components: {
    MyIcon
  },
  data() {
    return {
      iconName: ['', 'ivu-icon-md-home', 'ivu-icon-ios-keypad', 'ivu-icon-md-person', 'ivu-icon-ios-people', 'ivu-icon-ios-options']
    }
  },
  methods: {
    getIconName(id) {
      return `ivu-icon ${this.iconName[id]}`
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
