<template>
  <div class="articles">
    <ul
        class="articles-list"
        id="list"
    >
      <el-empty v-if="state.isEmpty" description="description"></el-empty>
      <transition-group name="el-fade-in">
        <div
            v-for="(article) in state.articlesList"
            :key="article.id"
            class="item"
        >
          <div style="padding-left: 20px">
            <a
                :href="state.href.replace('{id}',article.id.toString())"
                target="_blank"
            >
              <div class="article-head">
                <el-tag size="mini" style="margin-top: auto; margin-bottom: auto">文章</el-tag>
                <h4 class="title" v-html="article.title"></h4>
              </div>
              <div style="display: flex">
                <el-image
                    :fit="state.fit"
                    :src="isEmptyString(article.img)?'':state.fileServerHost+'/'+article.img"
                    class="wrap-img"
                    lazy
                >
                  <template #error>
                    <div class="image-slot">
                      <img alt="default" :src="state.fileServerHost+'/14e8f1e9-1fd0-4da3-ad08-b6192d09f8bb.png'"/>
                    </div>
                  </template>
                </el-image>
                <div class="description">
                  <p class="abstract"><span style="padding-left: 30px" v-html="article.content"/></p>
                </div>
              </div>

            </a>
            <div class="meta">
              <div style="flex: 1 ;min-width: 180px;">
                <el-button style="border: 0; background-color: transparent" @click.prevent="likeOrCancelLike(article)">
                  <vue-star style="margin: -42px -44px -33px -57px;" animate="yourAnimateCssClass"
                            color="rgb(152, 138, 222)" :is-click="article.userLiked">
                    <template v-slot:icon>
                      <svg t="1635866723995" class="icon" viewBox="0 0 1024 1024" version="1.1"
                           xmlns="http://www.w3.org/2000/svg" p-id="536" width="24" height="24">
                        <path
                            :stroke="'#E5404F'"
                            stroke-width="80"
                            stroke-linejoin="round"
                            :fill="article.userLiked  ? '#E5404F' : 'none'"
                            d="M727.771429 909.061224h-181.812245c-95.608163 0-179.2-38.661224-208.457143-53.812244h-67.918368c-25.6 0-47.020408-20.897959-47.020408-47.020409V431.020408c0-25.6 20.897959-47.020408 47.020408-47.020408h72.09796c12.538776-4.702041 57.469388-22.987755 78.367347-59.036735 7.836735-13.061224 14.628571-42.318367 21.420408-68.963265 11.493878-47.020408 22.465306-91.428571 48.065306-117.55102 23.510204-24.032653 65.306122-31.346939 104.489796-17.763266 50.677551 17.240816 85.159184 62.171429 92.473469 120.163266 6.791837 56.946939-2.612245 110.236735-6.791837 130.612244-1.044898 4.179592 1.044898 6.791837 2.089796 8.359184 1.044898 1.567347 3.657143 3.657143 7.836735 3.657143h119.640816c46.497959 0 100.310204 44.408163 100.310204 101.355102 0 26.122449-39.706122 331.232653-63.216326 369.893878-26.122449 43.363265-88.816327 54.334694-118.595918 54.334693zM134.791837 847.412245c-10.971429 0-19.853061-8.881633-19.853061-19.853061V420.571429c0-10.971429 8.881633-19.853061 19.853061-19.853062s19.853061 8.881633 19.853061 19.853062v406.987755c0 10.971429-8.881633 19.853061-19.853061 19.853061z"
                            fill="#E5404F" p-id="537">
                        </path>
                      </svg>
                    </template>
                  </vue-star>
                </el-button>
                <el-button style="border: 0; background-color: transparent; text-align: center;margin-left: 26px"
                           @click.prevent="article.userFavorite=!article.userFavorite">
                  <vue-star style="margin: -42px -44px -33px -57px;" animate="yourAnimateCssClass"
                            color="rgb(152, 138, 222)">
                    <template v-slot:icon>
                      <svg t="1638445168792" class="icon" viewBox="0 0 1024 1024" version="1.1"
                           xmlns="http://www.w3.org/2000/svg" p-id="4923" width="24" height="24">
                        <path
                            :stroke="'#FF8B26'"
                            stroke-width="80"
                            stroke-linejoin="round"
                            :fill="article.userFavorite  ? '#FF8B26' : 'none'"
                            d="M759.808 972.8c-10.0352 0-21.504-3.5328-31.5392-8.6528l-215.9616-112.384-217.7536 112.384c-21.504 12.1856-49.8176 10.3936-69.8368-5.12a72.8576 72.8576 0 0 1-26.624-69.12l44.9536-242.0736-171.008-165.9904a78.4384 78.4384 0 0 1-18.3296-72.704c8.2944-25.9072 28.3136-44.9536 54.784-48.3328l237.568-45.0048 106.4448-224.9216C464.1792 66.7136 487.424 51.2 512.3072 51.2c24.9344 0 49.8688 15.5136 59.8528 39.68l106.2912 224.768 237.568 43.2128c24.9344 3.584 46.4896 22.4256 53.248 48.384a72.6016 72.6016 0 0 1-16.64 72.704l-171.3152 167.8848 43.2128 242.0224c4.9152 27.6992-6.6048 53.6576-26.624 69.1712a57.3952 57.3952 0 0 1-38.0928 13.7728z"
                            fill="#FF8B26" p-id="4924"></path>
                      </svg>
                    </template>
                  </vue-star>
                </el-button>
                <el-button @click="getComments(article.id)"
                           style="border: 0; background-color: transparent">
                  <svg t="1635866824985" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="1467" width="24" height="24">
                    <path
                        d="M804.864 866.816H59.904V316.416c0-87.552 71.68-159.744 159.744-159.744h585.216c87.552 0 159.744 71.68 159.744 159.744v390.656c-0.512 88.064-72.192 159.744-159.744 159.744z"
                        fill="" p-id="1468"></path>
                    <path
                        d="M774.656 230.912H249.344c-66.048 0-119.808 53.76-119.808 119.808v431.616c0 6.144 5.12 10.24 10.24 10.24h634.368c66.048 0 119.808-53.76 119.808-119.808v-322.56c0-65.536-53.76-119.296-119.296-119.296z"
                        fill="#FFFFFF" p-id="1469"></path>
                    <path
                        d="M755.2 456.704H246.784a34.304 34.304 0 0 1 0-68.608h508.416a34.304 34.304 0 0 1 0 68.608zM451.072 646.144H246.784a34.304 34.304 0 0 1 0-68.608h204.288c18.944 0 34.304 15.36 34.304 34.304 0 19.456-15.36 34.304-34.304 34.304z"
                        fill="" p-id="1470"></path>
                  </svg>
                </el-button>
              </div>
              <div style="padding-top: 9px">
                <div>
                  <span> {{ article.views }}查看</span>
                  <span> {{ article.comments }}评论</span>
                  <span> {{ article.likes }}赞</span>
                </div>
                <div>
                <span class="time">
                  {{ formatTime(article.createDate) }}
                </span>
                </div>
              </div>

            </div>
            <div class="comments" v-if="state.comments.get(article.id)">
              <CommentTest :article="article"></CommentTest>
            </div>
          </div>
        </div>
      </transition-group>
    </ul>
  </div>
  <LoadingCustom v-if="state.isLoading"></LoadingCustom>
  <LoadEnd v-if="state.isLoadEnd||state.isEmpty"></LoadEnd>
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, reactive} from 'vue'
import VueStar from "../common/advanced_button/VueStar.vue";
import CommentTest from "../../views/CommentTest.vue";
import CustomSlider from "../common/CustomSlider.vue";
import LoadEnd from "../common/load/LoadEnd.vue";
import LoadingCustom from "../common/load/Loading.vue";
import config from "../../utils/config";
import urls from "../../utils/urls";
import {
  getDocumentHeight,
  getQueryStringByName,
  getScrollTop,
  getWindowHeight,
  isEmptyString,
  lazyload,
  timestampToTime
} from "../../utils/utils";
import {Article, ArticlesParams, Page} from "../../types";
import service from "../../utils/https";
import {ElMessage} from "element-plus";


export default defineComponent({
  props: {},
  components: {
    VueStar,
    CommentTest,
    CustomSlider,
    LoadEnd,
    LoadingCustom,
  },
  methods: {
    isEmptyString: isEmptyString
  },

  //路由改变回调
  watch: {
    $route: {
      handler(val: any, oldVal: any) {
        this.routeChange(val, oldVal);
      },
      immediate: true,
    },
  },
  setup(props, context) {
    let s = config.host + urls.articleDetail;
    let href = config.isDevMode ? s.substring(0, s.length - 7) : s.substring(0, s.length - 7);
    const state = reactive({
      comments: new Map,
      isLoadEnd: false,
      fileServerHost: config.fileServerHost,
      isLoading: false,
      isEmpty: false,
      articlesList: [] as Array<Article>,
      total: 0,
      tagName: decodeURI(getQueryStringByName("tagName")),
      params: {
        keyword: "",
        likes: "", // 是否是热门文章
        state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
        tagId: getQueryStringByName("tagId"),
        categoryId: getQueryStringByName("categoryId"),
        current: 1,
        size: 5,
      } as ArticlesParams,
      href: href
    });

    const formatTime = (value: string | Date): string => {
      return timestampToTime(value, true);
    };

    const getComments = (id: number) => {
      if (state.comments.has(id)) {
        state.comments.delete(id)
      } else {
        state.comments.set(id, {content: "评论"})
      }
    }


    const likeOrCancelLike = (article: Article) => {
      article.userLiked = !article.userLiked
      if (article.userLiked) {
        article.likes = article.likes + 1
        likeArticle(article)
      } else {
        article.likes = article.likes - 1
        cancelLikeArticle(article)
      }
    }

    const likeArticle = async (article: Article): Promise<void> => {
      const res = await service.put(urls.likeArticle.replace("{id}", article.id));
      if (res != null) {
        ElMessage({
          message: "谢谢点赞",
          type: "success",
        });
      }
    };

    const cancelLikeArticle = async (article: Article): Promise<void> => {
      const res = await service.put(urls.cancelLikeArticle.replace("{id}", article.id));
      if (res != null) {
        ElMessage({
          message: "取消了",
          type: "success",
        });
      }
    }


    const handleSearch = async (): Promise<void> => {
      window.onscroll = () => {
        if (getScrollTop() + getWindowHeight() > getDocumentHeight() - 100) {
          // 如果不是已经没有数据了，都可以继续滚动加载
          if (state.isLoadEnd === false && state.isLoading === false) {
            handleSearch();
          }
        }
      };
      state.isLoading = true;
      const data: Page<Article> = await service.get(urls.getArticleList,
          {
            params: state.params,
          }
      );
      /*for (let i = 0; i < data.records.length; i++) {
        data.records[i].content=await markdown.markedContent(data.records[i].content);
      }*/
      state.isLoading = false;
      state.articlesList = [...state.articlesList, ...data.records];
      state.total = data.total;
      state.isEmpty = data.total <= 0;
      state.params.current++;
      await nextTick(() => {
        lazyload();
      });
      if (data.total === 0 || data.current === data.pages) {
        state.isLoadEnd = true;
        window.onscroll = null;
      }
    };

    const routeChange = (val: any, oldVal: any): void => {
      state.tagName = decodeURI(getQueryStringByName("tagName"));
      state.params.tagId = getQueryStringByName("tagId");
      state.params.categoryId = getQueryStringByName("categoryId");
      state.params.keyword =  decodeURI(getQueryStringByName("keyword"));
      state.isLoadEnd = false;
      state.articlesList = [];
      state.params.current = 1;
      handleSearch();
    }

    onMounted(() => {

    });

    return {
      state,
      formatTime,
      handleSearch,
      routeChange,
      getComments,
      likeOrCancelLike
    };
  }
})
</script>

<style lang="less" scoped>
.left {
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
  flex: 0 1 auto;
  margin-bottom: 0;
  background-color: #ffffff;

  .articles-list {
    margin: 0;
    padding: 0;
    list-style: none;

    .title {
      color: #333;
      margin: 7px 0 4px;
      display: inherit;
      font-size: 18px;
      font-weight: 700;
      line-height: 1.5;
    }

    .item > div {
      padding-right: 10px;
    }

    .item .wrap-img {
      width: 190px;
      height: 105px;
      flex-shrink: 0;
      margin-right: 20px;
      border-radius: 3px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        border: 1px solid #f0f0f0;
      }
    }

    .item {
      line-height: 20px;
      position: relative;
      padding: 15px 0 5px 0;
      border-bottom: 1px solid #f0f0f0;
      word-wrap: break-word;
      cursor: pointer;

      &:hover {
        .title {
          color: #000;
        }
      }

      .abstract {
        min-height: 30px;
        margin: 0 0 8px;
        font-size: 14px;
        line-height: 24px;
        color: #555;
      }

      .meta {
        display: flex;
        margin-top: 10px;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;

        a {
          margin-right: 10px;
          color: #b4b4b4;

          &:hover {
            transition: 0.1s ease-in;
            -webkit-transition: 0.1s ease-in;
            -moz-transition: 0.1s ease-in;
            -o-transition: 0.1s ease-in;
            -ms-transition: 0.1s ease-in;
          }
        }

        span {
          margin-top: 10px;
          margin-right: 10px;
          color: #666;
        }
      }
    }
  }
}

.main-page {
  margin: 0 auto;
  display: flex;
}

.card {
  font-weight: 500;
}

.card > a {
  margin: 0 22px 0 22px;
  font-size: 16px;
  height: 58px;
}

.description {
  max-height: 100px;
  overflow: hidden;
}

.article-head {
  display: flex;
}
</style>
