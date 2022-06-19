<template>
  <div>
    <div>
      <el-input placeholder="输入搜索内容(developing)" v-model="input3" class="input-with-select">
        <template #append>
          <el-button class="el-icon-search"></el-button>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  setup() {
    return {
      input3: ref(''),
      select: ref(''),
    }
  },
})
</script>

<style>
.el-select .el-input {
  /* width: 130px;*/
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
