<template>
  <el-tag
      v-for="tag in dynamicTags"
      :key="tag.id"
      class="mx-1"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
  >
    {{ tag.name }}
  </el-tag>
  <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="ml-1 w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
  >
  </el-input>
  <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
    + 自定义
  </el-button>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import type { ElInput } from 'element-plus'

const inputValue = ref('')
const dynamicTags = ref(['Tag 1'])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}
defineExpose({

  dynamicTags

})
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push({name:inputValue.value})
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>
