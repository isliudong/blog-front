<template>
  <div class="loading">
    <img
        src="../../../assets/image/loading.svg"
        alt="拼命加载中..."
        width="50"
    >
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "LoadingCustom",
});
</script>
<style scoped>
.loading {
  text-align: center;
  padding: 30px;
}
</style>
