<template>
  <el-autocomplete
      style="width: 325px"
      v-model="state"
      :fetch-suggestions="querySearch"
      popper-class="my-autocomplete"
      placeholder="search"
      @select="handleSelect"
      @keyup.enter="handleIconClick"
  >
    <template #suffix>
      <el-icon class="el-input__icon" @click="handleIconClick">
        <search/>
      </el-icon>
    </template>
    <template #default="{ item }">
      <div class="value">{{ item.value }}</div>
      <span class="link">{{ item.link }}</span>
    </template>
  </el-autocomplete>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {Search} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";

interface LinkItem {
  value: string
  link: string
}

const state = ref('')
const links = ref<LinkItem[]>([])

const querySearch = (queryString: string, cb) => {
  const results = queryString
      ? links.value.filter(createFilter(queryString))
      : links.value
  // call callback function to return suggestion objects
  cb(results)
}
const createFilter = (queryString) => {
  return (restaurant) => {
    return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const loadAll = () => {
  return [
    {value: '推荐'},
    {value: 'java'},
    {value: 'elasticsearch'},
    {value: 'mysql', link: '数据库知识集'},
    {value: 'redis'},
    {value: 'git', link: '项目实际操作指南'},
  ]
}
const handleSelect = (item: LinkItem) => {
  console.log(item)
  handleSearch(item.value)
}

const handleIconClick = (ev: Event) => {
  console.log(state.value)
  handleSearch(state.value)
}

const router = useRouter()

const handleSearch = (keyword: string) => {
  // query 参数
  router.push({
    path: '/articles/list',
    name: 'articles',
    query: {
      keyword: keyword
    }
  })
};

onMounted(() => {
  links.value = loadAll()
})
</script>

<style>
.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}

.my-autocomplete li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}

.my-autocomplete li .addr {
  font-size: 12px;
  color: #b4b4b4;
}

.my-autocomplete li .highlighted .addr {
  color: #ddd;
}
</style>
