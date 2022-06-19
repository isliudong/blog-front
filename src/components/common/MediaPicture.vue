<template>

  <figure class="media-post">
    <a
        :href="state.href.replace('{id}',post.id.toString())"
        target="_blank"
    >
      <img :alt="post.title" :src="'https://source.unsplash.com/collection/190727/400x400?1'" height="200" width="200"/>
      <figcaption>
        <h2 v-if="post.title">{{ post.title }}</h2>
      </figcaption>
    </a>
    <em v-if="post.description">By {{ post.description }}</em>

    <div class="meta">
      <div style="flex: 1 ;min-width: 180px;">
        <el-button style="border: 0; background-color: transparent" @click.prevent="likeOrCancelLike(post)">
          <vue-star :is-click="post.userLiked" animate="yourAnimateCssClass"
                    color="rgb(152, 138, 222)" style="margin: -42px -44px -33px -57px;">
            <template v-slot:icon>
              <svg class="icon" height="24" p-id="536" t="1635866723995"
                   version="1.1" viewBox="0 0 1024 1024" width="24" xmlns="http://www.w3.org/2000/svg">
                <path
                    :fill="post.userLiked  ? '#E5404F' : 'none'"
                    :stroke="'#E5404F'"
                    d="M727.771429 909.061224h-181.812245c-95.608163 0-179.2-38.661224-208.457143-53.812244h-67.918368c-25.6 0-47.020408-20.897959-47.020408-47.020409V431.020408c0-25.6 20.897959-47.020408 47.020408-47.020408h72.09796c12.538776-4.702041 57.469388-22.987755 78.367347-59.036735 7.836735-13.061224 14.628571-42.318367 21.420408-68.963265 11.493878-47.020408 22.465306-91.428571 48.065306-117.55102 23.510204-24.032653 65.306122-31.346939 104.489796-17.763266 50.677551 17.240816 85.159184 62.171429 92.473469 120.163266 6.791837 56.946939-2.612245 110.236735-6.791837 130.612244-1.044898 4.179592 1.044898 6.791837 2.089796 8.359184 1.044898 1.567347 3.657143 3.657143 7.836735 3.657143h119.640816c46.497959 0 100.310204 44.408163 100.310204 101.355102 0 26.122449-39.706122 331.232653-63.216326 369.893878-26.122449 43.363265-88.816327 54.334694-118.595918 54.334693zM134.791837 847.412245c-10.971429 0-19.853061-8.881633-19.853061-19.853061V420.571429c0-10.971429 8.881633-19.853061 19.853061-19.853062s19.853061 8.881633 19.853061 19.853062v406.987755c0 10.971429-8.881633 19.853061-19.853061 19.853061z"
                    fill="#E5404F"
                    p-id="537"
                    stroke-linejoin="round" stroke-width="80">
                </path>
              </svg>
            </template>
          </vue-star>
        </el-button>
        <el-button style="border: 0; background-color: transparent; text-align: center;margin-left: 26px"
                   @click.prevent="post.userFavorite=!post.userFavorite">
          <vue-star animate="yourAnimateCssClass" color="rgb(152, 138, 222)"
                    style="margin: -42px -44px -33px -57px;">
            <template v-slot:icon>
              <svg class="icon" height="24" p-id="4923" t="1638445168792"
                   version="1.1" viewBox="0 0 1024 1024" width="24" xmlns="http://www.w3.org/2000/svg">
                <path
                    :fill="post.userFavorite  ? '#FF8B26' : 'none'"
                    :stroke="'#FF8B26'"
                    d="M759.808 972.8c-10.0352 0-21.504-3.5328-31.5392-8.6528l-215.9616-112.384-217.7536 112.384c-21.504 12.1856-49.8176 10.3936-69.8368-5.12a72.8576 72.8576 0 0 1-26.624-69.12l44.9536-242.0736-171.008-165.9904a78.4384 78.4384 0 0 1-18.3296-72.704c8.2944-25.9072 28.3136-44.9536 54.784-48.3328l237.568-45.0048 106.4448-224.9216C464.1792 66.7136 487.424 51.2 512.3072 51.2c24.9344 0 49.8688 15.5136 59.8528 39.68l106.2912 224.768 237.568 43.2128c24.9344 3.584 46.4896 22.4256 53.248 48.384a72.6016 72.6016 0 0 1-16.64 72.704l-171.3152 167.8848 43.2128 242.0224c4.9152 27.6992-6.6048 53.6576-26.624 69.1712a57.3952 57.3952 0 0 1-38.0928 13.7728z"
                    fill="#FF8B26"
                    p-id="4924"
                    stroke-linejoin="round" stroke-width="80"></path>
              </svg>
            </template>
          </vue-star>
        </el-button>
        <el-button style="border: 0; background-color: transparent"
                   @click="getComments(post.id)">
          <svg class="icon" height="24" p-id="1467" t="1635866824985"
               version="1.1" viewBox="0 0 1024 1024" width="24" xmlns="http://www.w3.org/2000/svg">
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
          <span> {{ post.views }}查看</span>
          <span> {{ post.comments }}评论</span>
          <span> {{ post.likes }}赞</span>
        </div>
        <div>
                <span class="time">
                  {{ formatTime(post.createDate) }}
                </span>
        </div>
      </div>

    </div>
    <div v-if="state.comments.get(post.id)" class="comments">
      <CommentTest :article="post"></CommentTest>
    </div>
  </figure>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from "vue";
import CommentTest from "../../views/CommentTest.vue";
import VueStar from "./advanced_button/VueStar.vue";
import {timestampToTime} from "../../utils/utils";
import {Article} from "../../types";
import service from "../../utils/https";
import urls from "../../utils/urls";
import {ElMessage} from "element-plus";
import config from "../../utils/config";

export default defineComponent({
  components: {VueStar, CommentTest},
  props: {
    post: Object,
    title: String,
  },

  setup() {
    let s = config.host + urls.articleDetail;

    let href = config.isDevMode ? s.substring(0, s.length - 7) : s.substring(0, s.length - 7);

    const state = reactive({
      comments: new Map,
      href: href


    })
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
    return {
      state,
      formatTime,
      getComments,
      likeOrCancelLike,
      ...toRefs(state),
    }
  },
})
</script>

<style scoped>


.media-post {
  display: block;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, .2);
  background: #FFF;
}

.media-post img {
  border-radius: .5rem;
  display: block;
}

.media-post figcaption {
  margin: 1rem 1rem 0;
}

.media-post h2 {
  font-size: 1.6rem;
  line-height: 1;
}

.media-post em {
  font-size: 1rem;
}


</style>
