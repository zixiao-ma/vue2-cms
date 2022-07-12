<template>
  <Breadcrumb>
    <BreadcrumbItem to="/welcome">首页</BreadcrumbItem>
    <BreadcrumbItem
        v-for="item in arr"
        :key="item.path"
        :to="item.path"
        v-if="item.meta.title"
    >{{ item.meta.title }}
    </BreadcrumbItem>

  </Breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      arr: []
    }
  },
  created() {
    this.arr = this.$route.matched
  },
  watch: {
    $route(val) {
      this.arr = val.matched
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
