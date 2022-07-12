<template>
  <span>
      <Tag type="dot" color="warning" :checkable="$route.path!=='/welcome'"
           @on-change="$router.push('/welcome')">控制台</Tag>
   <Tag type="dot" closable
        :color="color[i]"
        @on-change="$router.push(tag.path)"
        :checkable="$route.path!==tag.path"
        v-for="(tag,i) in tags"
        @on-close="delTag(i)"
        :key="tag.path">{{ tag.title }}</Tag>

  </span>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      color: ['primary', 'success', 'error', 'warning', 'magenta', 'volcano', 'orange', 'gold']
    }
  },
  computed: {
    ...mapGetters(['tags'])
  },
  methods: {
    delTag(i) {
      if (0 === i) {
        this.$router.push('/welcome')
      } else {
        let nextPath = this.tags[i - 1].path
        this.$router.push(nextPath)
      }
      this.$store.commit('tagsView/delTag', i)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
