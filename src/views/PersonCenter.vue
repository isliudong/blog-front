<template>
  <Nav></Nav>
  <div class="common-layout under-nav" style="width: 100%">
    <el-container>
      <el-aside width="200px">
        <Menu></Menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import Menu from "../components/person/menu.vue";
import {defineComponent, onMounted, reactive, ref} from "vue";
import {Article, Page} from "../types";
import service from "../utils/https";
import urls from "../utils/urls";
import {useRouter} from "vue-router";
import Nav from "../components/nav/Nav.vue";

export default defineComponent({
  name: "PersonCenter",
  components: {Nav, Menu},

  setup() {
    const router = useRouter();
    const handleSizeChange = (val: number) => {
      state.pagination.size = val;
      getArticlesList();
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      state.pagination.currentPage = val
      getArticlesList();
      console.log(`current page: ${val}`)
    }
    const getArticlesList = async () => {
      const page: Page<Article> = await service.get(urls.getArticleList,
          {
            params: {
              size: state.pagination.size,
              current: state.pagination.currentPage,
            },
          }
      );
      state.articlesList = page.records
      state.pagination.total = page.total
      state.pagination.currentPage = page.current
    }
    onMounted(() => {
      getArticlesList();
    })

    const state = reactive({
      activeName: 'first',
      articlesList: [] as Array<Article>,
      pagination: {
        currentPage: ref(1),
        size: 10,
        total: 0
      }
    })
    return {
      state,
      handleSizeChange,
      handleCurrentChange,
      editArticle: (id: number) => {
        router.push({path: '/writeArticle', query: {
          id:id
          }})
      }
    }
  },
  methods: {
    handleClick(tab: string, event: string) {
      console.log(1)
      console.log(tab)
      console.log(tab, event)
    }
  },
})
</script>

<style scoped>
.demo-pagination-block {
  margin-top: 70px;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #ffffff;
  color: var(--el-text-color-primary);
  line-height: 200px;
  overflow: auto;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.main {
  background-color: #ffffff;
  margin: 0 20px 0 20px;
  padding: 0 20px 0 20px;
  line-height: 62px;
}

/*.main >>>.el-tabs__nav-wrap::after {
  position: static !important;
}*/
</style>
