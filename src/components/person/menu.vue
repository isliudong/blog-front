<template>
  <div>
    <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router
    >
      <el-sub-menu index="1" disabled>
        <template #title>
          <i class="el-icon-location"></i>
          <span>主页</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="/personCenter/new" route="/personCenter/new">
        <i class="el-icon-menu"></i>
        <span>创作</span>
      </el-menu-item>
      <el-menu-item index="/personCenter/articles" route="/personCenter/articles">
        <i class="el-icon-document"></i>
        <span>管理</span>
      </el-menu-item>
      <el-menu-item index="/personCenter/math" route="/personCenter/math" disabled>
        <i class="el-icon-setting"></i>
        <span>数据分析</span>
      </el-menu-item>
      <el-menu-item index="/personCenter/self" route="/personCenter/self">
        <i class="el-icon-setting"></i>
        <span>个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  setup() {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      handleOpen,
      handleClose,
    }
  },
})
</script>
