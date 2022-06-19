<template>
  <el-tabs v-model="this.state.activeName" @tab-click="handleClick">
    <el-tab-pane v-for="(c, i) in state.categories" :label="c.name" :name="c.id">
      <div v-for="article in this.state.articlesList" :key="article.id">
        <el-descriptions :column="1">
          <el-descriptions-item>
            <el-tag size="small" style="margin: 17px 10px 0 -10px">文章</el-tag>
            {{ article.title }}
          </el-descriptions-item>
          <el-descriptions-item>
            <div style="line-height: 20px;display: flex">
              <div style="padding-top: 18px;flex: 1">
                <span style="margin-right: 10px"> {{ article.views }}查看</span>
                <span style="margin-right: 10px"> {{ article.comments }}评论</span>
                <span style="margin-right: 10px"> {{ article.likes }}赞</span>
                <span
                    v-if="article.createDate"
                    class="time"
                    style="margin-right: 10px"
                >
                        {{ article.createDate }}
                      </span>
              </div>

              <div style="">
                <el-button @click="editArticle(article.id)" type="success" class="el-icon-edit"></el-button>
                <el-button type="primary" class="el-icon-share"></el-button>
                <el-button @click="deleteArticle(article.id)" type="danger" class="el-icon-delete"></el-button>
                <el-button type="primary" class="el-icon-search">Search</el-button>
                <el-button type="primary">
                  Upload<i class="el-icon-upload el-icon-right"></i>
                </el-button>
              </div>
            </div>
          </el-descriptions-item>

        </el-descriptions>
        <el-divider style="margin: 0 0 16px 0"></el-divider>
      </div>
    </el-tab-pane>
    <!--    <el-tab-pane label="回答" name="second">
          <div v-for="article in this.state.articlesList" :key="article.id">
            <el-descriptions :column="1">
              <el-descriptions-item>
                <el-tag size="small" style="margin: 17px 10px 0 -10px">文章</el-tag>
                {{ article.title }}
              </el-descriptions-item>
              <el-descriptions-item>
                <div style="line-height: 20px;display: flex">
                  <div style="padding-top: 18px;flex: 1">
                    <span style="margin-right: 10px"> {{ article.meta.views }}查看</span>
                    <span style="margin-right: 10px"> {{ article.meta.comments }}评论</span>
                    <span style="margin-right: 10px"> {{ article.meta.likes }}赞</span>
                    <span
                        v-if="article.createDate"
                        class="time"
                        style="margin-right: 10px"
                    >
                            {{ article.createDate }}
                          </span>
                  </div>

                  <div style="">
                    <el-button @click="editArticle(article.id)" type="success" class="el-icon-edit"></el-button>
                    <el-button type="primary" class="el-icon-share"></el-button>
                    <el-button @click="deleteArticle(article.id)" type="danger" class="el-icon-delete"></el-button>
                    <el-button type="primary" class="el-icon-search">Search</el-button>
                    <el-button type="primary">
                      Upload<i class="el-icon-upload el-icon-right"></i>
                    </el-button>
                  </div>
                </div>
              </el-descriptions-item>

            </el-descriptions>
            <el-divider style="margin: 0 0 16px 0"></el-divider>
          </div>
        </el-tab-pane>
        <el-tab-pane label="提问" name="third">
          <div v-for="article in this.state.articlesList" :key="article.id">
            <el-descriptions :column="1">
              <el-descriptions-item>
                <el-tag size="small" style="margin: 17px 10px 0 -10px">文章</el-tag>
                {{ article.title }}
              </el-descriptions-item>
              <el-descriptions-item>
                <div style="line-height: 20px;display: flex">
                  <div style="padding-top: 18px;flex: 1">
                    <span style="margin-right: 10px"> {{ article.meta.views }}查看</span>
                    <span style="margin-right: 10px"> {{ article.meta.comments }}评论</span>
                    <span style="margin-right: 10px"> {{ article.meta.likes }}赞</span>
                    <span
                        v-if="article.createDate"
                        class="time"
                        style="margin-right: 10px"
                    >
                            {{ article.createDate }}
                          </span>
                  </div>

                  <div style="">
                    <el-button @click="editArticle(article.id)" type="success" class="el-icon-edit"></el-button>
                    <el-button type="primary" class="el-icon-share"></el-button>
                    <el-button @click="deleteArticle(article.id)" type="danger" class="el-icon-delete"></el-button>
                    <el-button type="primary" class="el-icon-search">Search</el-button>
                    <el-button type="primary">
                      Upload<i class="el-icon-upload el-icon-right"></i>
                    </el-button>
                  </div>
                </div>
              </el-descriptions-item>

            </el-descriptions>
            <el-divider style="margin: 0 0 16px 0"></el-divider>
          </div>
        </el-tab-pane>
        <el-tab-pane label="文章" name="fourth">
          <div v-for="article in this.state.articlesList" :key="article.id">
            <el-descriptions :column="1">
              <el-descriptions-item>
                <el-tag size="small" style="margin: 17px 10px 0 -10px">文章</el-tag>
                {{ article.title }}
              </el-descriptions-item>
              <el-descriptions-item>
                <div style="line-height: 20px;display: flex">
                  <div style="padding-top: 18px;flex: 1">
                    <span style="margin-right: 10px"> {{ article.meta.views }}查看</span>
                    <span style="margin-right: 10px"> {{ article.meta.comments }}评论</span>
                    <span style="margin-right: 10px"> {{ article.meta.likes }}赞</span>
                    <span
                        v-if="article.createDate"
                        class="time"
                        style="margin-right: 10px"
                    >
                            {{ article.createDate }}
                          </span>
                  </div>

                  <div style="">
                    <el-button @click="editArticle(article.id)" type="success" class="el-icon-edit"></el-button>
                    <el-button type="primary" class="el-icon-share"></el-button>
                    <el-button @click="deleteArticle(article.id)" type="danger" class="el-icon-delete"></el-button>
                    <el-button type="primary" class="el-icon-search">Search</el-button>
                    <el-button type="primary">
                      Upload<i class="el-icon-upload el-icon-right"></i>
                    </el-button>
                  </div>
                </div>
              </el-descriptions-item>

            </el-descriptions>
            <el-divider style="margin: 0 0 16px 0"></el-divider>
          </div>
        </el-tab-pane>-->
  </el-tabs>
  <div class="demo-pagination-block">
    <el-pagination
        v-model:currentPage="state.pagination.currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="state.pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="state.pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref, watch} from 'vue'
import {useRouter} from "vue-router";
import {Article, ArticlesParams, Page} from "../../types";
import service from "../../utils/https";
import {ElMessage} from "element-plus";
import {getQueryStringByName} from "../../utils/utils";

export default defineComponent({
  props: {},

  setup(props, context) {
    const router = useRouter();
    const handleSizeChange = (val: number) => {
      state.pagination.size = val;
      getArticlesList('');
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      state.pagination.currentPage = val
      getArticlesList('');
      console.log(`current page: ${val}`)
    }
    const getArticlesList = async (tag: string) => {
      state.params.tagId = tag;
      state.params.current = state.pagination.currentPage <= state.pagination.total
          ? state.pagination.currentPage : state.pagination.total;
      state.params.size = state.pagination.size
      const page: Page<Article> = await service.get("/users/articles",
          {
            params: state.params,
          }
      );
      state.articlesList = page.records
      state.pagination.total = page.total
    }

    const deleteArticle = async (id: number) => {
      const res = await service.delete("/articles/" + id.toString());
      if (res == null) {
        return;
      }
      state.articlesList = state.articlesList.filter(a => {
        return a.id != id.toString();
      })
      ElMessage({
        message: "删除完成",
        type: "success"
      });

    }
    onMounted(() => {
      getArticlesList("");
    })


    const state = reactive({
      activeName: '',
      articlesList: [] as Array<Article>,
      pagination: {
        currentPage: ref(1),
        size: 5,
        total: 0
      },
      params: {
        tagName: "",
        keyword: "",
        likes: "", // 是否是热门文章
        state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
        tagId: getQueryStringByName("tagId"),
        categoryId: getQueryStringByName("categoryId"),
        current: 1,
        size: 5,
      } as ArticlesParams,
      categories: [
        {
          name: "全部",
          id: ''
        },
        {
          name: "计算机基础",
          id: 1 + ""
        }, {
          name: "面试基础",
          id: 2 + ""
        },
      ],
    })
    watch(() => state.activeName, () => {
      getArticlesList(state.activeName)
    })
    watch(() => state.pagination.size, () => {
      getArticlesList(state.activeName)
    })
    return {
      state,
      handleSizeChange,
      handleCurrentChange,
      editArticle: (id: number) => {
        router.push({
          path: '/writeArticle', query: {
            id: id
          }
        })
      },
      deleteArticle
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
