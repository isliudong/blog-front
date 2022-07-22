<template>
  <div class="articles">

      <el-empty v-if="state.isEmpty" description="description"></el-empty>
      <transition-group name="el-fade-in">

        <MediaPicture
            v-for="post in state.articlesList"
            :post="post"
        />
      </transition-group>
  </div>
  <LoadingCustom v-if="state.isLoading"></LoadingCustom>
  <LoadEnd v-if="state.isLoadEnd||state.isEmpty"></LoadEnd>
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, reactive} from 'vue'
import VueStar from "../common/advanced_button/VueStar.vue";
import CommentTest from "../../views/Comment.vue";
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
import MediaPicture from "../common/MediaPicture.vue";


export default defineComponent({
  props: {},
  components: {
    MediaPicture,
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
      state.params.keyword = decodeURI(getQueryStringByName("keyword"));
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

.articles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  place-items: center;
  background: #a5b1bb;
}
</style>
