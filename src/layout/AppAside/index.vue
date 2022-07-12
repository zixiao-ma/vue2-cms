<template>
  <div>
    <Menu :active-name="activeDefault" theme="dark" width="auto" :class="menuitemClasses">
      <recursive-menu v-for="item in menus" :key="item.id" :tree="item"></recursive-menu>
    </Menu>
  </div>

</template>

<script>
import recursiveMenu from './recursiveMenu'
import {mapGetters} from "vuex";
import {findMenuIndex} from "@/utils/activeDefault";

export default {
  components: {
    recursiveMenu
  },
  props: ['isCollapsed'],
  computed: {
    ...mapGetters({
      menus: 'menus'
    }),
    activeDefault() {
      let path = this.$route.path
      return findMenuIndex(this.menus, path)
    },
    menuitemClasses() {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  data() {
    return {}
  },

}
</script>
<style lang="scss" scoped>

</style>
