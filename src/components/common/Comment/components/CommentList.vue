<template>
<div :class="className">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: "CommentList.vue",
  props: {
    sub: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    className() {
      return this.sub ? 'sub-comment-list' : 'comment-list';
    }
  }
}
</script>

<style scoped>

</style>
