<template>
  <Nav></Nav>
  <div class="toc">
    <el-button type="warning" class="toc_b"  @click="state.toc = !state.toc">目录</el-button>
  </div>
  <el-row :gutter="20" class="under-nav" style="justify-content: center">
    <el-col :xs="0" :sm="state.articleDetail.toc?6:2" :md="state.articleDetail.toc?6:2"
            :lg="state.articleDetail.toc?5:1" :xl="state.articleDetail.toc?3:1"
            v-if="state.toc"
    >
      <div
          v-if="!state.isMobile&&state.articleDetail.toc"
          class="article-left anchor"
          v-html="state.articleDetail.toc"
      >
      </div>
    </el-col>
    <el-col :xs="24" :sm="state.articleDetail.toc&&state.toc?14:20" :md="state.articleDetail.toc&&state.toc?12:16"
            :lg="state.articleDetail.toc&&state.toc?14:18" :xl="state.articleDetail.toc&&state.toc?17:19"
    >
      <span id="product_video" style="margin-top: -102px;padding-top: 102px;"></span>
      <div class="grid-content bg-purple-light">
        <div
            class="article-right fl"
        >
          <div class="content">
            <a style="position: relative;top: -80px;">123</a>
            <div
                id="content"
                class="article-detail"
                v-html="state.articleDetail.content"
            >
            </div>
          </div>
          <div class="heart" v-show="state.articleDetail.content">
            <el-button @click="likeArticle"
                       style="border: 0; background-color: transparent; text-align: center;margin-left: 26px">
              <vue-star style="margin: -42px -44px -33px -57px;" animate="yourAnimateCssClass"
                        color="rgb(152, 138, 222)">
                <template v-slot:icon>
                  <svg t="1641627600233" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg"
                       p-id="3735" width="48" height="48">
                    <path
                        :stroke="'#EF8218'"
                        stroke-width="80"
                        stroke-linejoin="round"
                        :fill="state.articleDetail.userLiked  ? '#EF8218' : 'none'"
                        d="M604.2 205.9c16.2 8.4 30.4 22.7 42.8 41.5 20.1 31.1 32.4 75.8 35 126.3 1.9 40.8-2.6 82.9-13 119.8h154.2c36.3 0 67.4 9.1 90.7 25.9 24 17.5 37.6 42.8 38.2 70.6v0.6c0 21.4-8.4 47.3-20.7 64.1 13.6 15.5 20.7 36.3 20.7 61.5 0 29.8-20.7 57.7-41.5 72.5 5.2 11.7 7.1 25.3 7.1 34.3 0 33.7-20.1 60.2-55.1 74.5 3.2 7.8 4.5 16.2 4.5 26.6 0 31.7-13 57.7-37.6 74.5-24 16.8-58.3 25.3-101.7 25.3h-246c-27.2 0-57.7-5.8-80.3-14.9-9.1-3.9-17.5-7.8-23.3-11-1.3-0.6-3.2-1.3-4.5-1.9-1.3 0.6-1.9 1.9-3.2 2.6-1.9 1.3-3.9 3.2-5.8 4.5-14.3 10.4-29.8 20.1-48.6 20.7h-66.7c-28.5 0-51.8-9.1-68-26.6-14.9-16.2-24-39.5-25.9-68.7l-30.4-324.5v-1.3c0-30.4 9.1-57.6 25.9-77.7 17.5-20.7 42.1-31.7 69.3-31.7H338c16.2 0 42.8-5.2 77.1-30.4 24-18.1 38.9-36.3 42.1-42.1 11-26.6 21.4-55.7 21.4-125 0-8.4 0-34.3 11-57 9.1-20.1 29.8-43.4 72.6-43.4 14.8 0 28.4 3.9 42 10.4z"
                        fill="#FF9D00" p-id="3736"></path>
                    <path d="M616.7 144.2a2.3 12.2 0 1 0 4.6 0 2.3 12.2 0 1 0-4.6 0Z" fill="#F07FFD" p-id="3737"></path>
                    <path d="M627.571704 142.656012a12.2 2.3 60 1 0 3.983717-2.3 12.2 2.3 60 1 0-3.983717 2.3Z"
                          fill="#F07FFD" p-id="3738"></path>
                    <path d="M636.311797 135.919689a12.2 2.3 30 1 0 2.3-3.983717 12.2 2.3 30 1 0-2.3 3.983717Z"
                          fill="#F07FFD" p-id="3739"></path>
                    <path d="M628.3 123.4a12.2 2.3 0 1 0 24.4 0 12.2 2.3 0 1 0-24.4 0Z" fill="#F07FFD"
                          p-id="3740"></path>
                    <path d="M627.328131 118.880268a2.3 12.2 60 1 0 21.13102-12.2 2.3 12.2 60 1 0-21.13102 12.2Z"
                          fill="#F07FFD" p-id="3741"></path>
                    <path d="M624.189866 115.445957a2.3 12.2 30 1 0 12.2-21.131019 2.3 12.2 30 1 0-12.2 21.131019Z"
                          fill="#F07FFD" p-id="3742"></path>
                    <path d="M617.4 101.9a2.3 12.2 0 1 0 4.6 0 2.3 12.2 0 1 0-4.6 0Z" fill="#F07FFD" p-id="3743"></path>
                    <path d="M607.088802 105.649823a12.2 2.3 60 1 0 3.983717-2.3 12.2 2.3 60 1 0-3.983717 2.3Z"
                          fill="#F07FFD" p-id="3744"></path>
                    <path d="M600.042483 114.130839a12.2 2.3 30 1 0 2.3-3.983717 12.2 2.3 30 1 0-2.3 3.983717Z"
                          fill="#F07FFD" p-id="3745"></path>
                    <path d="M586 122.6a12.2 2.3 0 1 0 24.4 0 12.2 2.3 0 1 0-24.4 0Z" fill="#F07FFD" p-id="3746"></path>
                    <path d="M590.235205 139.41267a2.3 12.2 60 1 0 21.13102-12.2 2.3 12.2 60 1 0-21.13102 12.2Z"
                          fill="#F07FFD" p-id="3747"></path>
                    <path d="M602.351017 151.801873a2.3 12.2 30 1 0 12.2-21.131019 2.3 12.2 30 1 0-12.2 21.131019Z"
                          fill="#F07FFD" p-id="3748"></path>
                    <path d="M367.4 187.6m-14.8 0a14.8 14.8 0 1 0 29.6 0 14.8 14.8 0 1 0-29.6 0Z" fill="#2C65AF"
                          p-id="3749"></path>
                    <path
                        d="M737.5 164.8c2.3 0 4.2 1.9 4.2 4.2v45.5c0 2.3-1.9 4.2-4.2 4.2s-4.2-1.9-4.2-4.2V169c0-2.4 1.9-4.2 4.2-4.2z"
                        fill="#EF8218" p-id="3750"></path>
                    <path
                        d="M714.7 187.5h45.5c2.3 0 4.2 1.9 4.2 4.2 0 2.3-1.9 4.2-4.2 4.2h-45.5c-2.3 0-4.2-1.9-4.2-4.2 0.1-2.4 1.9-4.2 4.2-4.2z"
                        fill="#EF8218" p-id="3751"></path>
                    <path
                        d="M270.2 222.6c5.9-3 8.8-9 6.6-13.3l-43.4-84.1c-2.2-4.3-8.8-5.3-14.7-2.3-5.9 3-8.8 9-6.6 13.3l43.4 84.1c2.2 4.3 8.8 5.3 14.7 2.3z"
                        fill="#7CCBE2" p-id="3752"></path>
                    <path
                        d="M294.3 147c-3-5.9-9-8.8-13.3-6.6l-84.1 43.4c-4.3 2.2-5.3 8.8-2.3 14.7s9 8.8 13.3 6.6l84.1-43.4c4.3-2.2 5.3-8.8 2.3-14.7z"
                        fill="#7CCBE2" p-id="3753"></path>
                    <path
                        d="M442.8 8.2c20.8 0 37.7 16.8 37.7 37.4S463.6 83 442.8 83c-20.8 0-37.7-16.8-37.7-37.4S422 8.2 442.8 8.2z m0 64.8c15.3 0 27.8-12.3 27.8-27.5S458.1 18 442.8 18 415 30.3 415 45.5 427.5 73 442.8 73z"
                        fill="#E62A52" p-id="3754"></path>
                    <path
                        d="M674 1006.1h-81.3c-8.3 0-15-6.7-15-15s6.7-15 15-15H674c40.5 0 71.8-7.6 93.1-22.5l0.2-0.1c20.3-13.9 31-35.4 31-62.1 0-8.8-1-15.2-3.4-20.8l-5.8-14 14-5.7c29.5-12 45.7-33.5 45.7-60.6 0-7-1.5-18.6-5.8-28.2l-5-11.2 9.9-7.1c17.5-12.6 35.2-36.1 35.2-60.4 0-21.4-5.7-38.8-17-51.7l-7.9-9 7.1-9.7c10.5-14.4 17.8-37.1 17.8-55.3v-0.5c-0.6-23.2-12-44-32.1-58.7-20.8-15.1-49.2-23-81.8-23h-174l5.3-19.1c9.9-35.1 14.3-76 12.4-115.1-2.5-47.9-14-90.1-32.6-118.9-11.1-17-23.5-29.2-36.8-36.2-12.7-6-23.9-8.8-35.4-8.8-35.8 0-51.8 18.8-58.9 34.6l-0.2 0.4c-9.5 19.6-9.5 42.8-9.5 50.5 0 70.6-10.7 102.1-22.5 130.8l-0.3 0.8-0.4 0.7c-4.4 7.9-20.8 27.6-46.2 46.8l-0.2 0.1c-37.5 27.6-67.4 33.4-86 33.4H166.2c-22.9 0-43.5 9.4-57.8 26.4C93.8 519.3 86 542.9 86 570v0.6l3.5 37.7c0.8 8.2-5.3 15.6-13.5 16.3-8.2 0.8-15.6-5.3-16.3-13.5L56 572v-2c0-34.2 10.2-64.4 29.4-87.4 20.2-23.9 48.9-37.1 80.8-37.1h117.9c14 0 37.2-4.8 68.1-27.5 21.4-16.2 34.6-32.1 37.6-36.8 10.9-26.4 19.8-53.9 19.8-118.3 0-9.3 0-37.6 12.4-63.4 6.5-14.2 16.3-26.3 28.5-35.1 15.7-11.3 35.1-17 57.6-17 16 0 31.8 3.9 48.6 11.8l0.5 0.2c18 9.4 34.3 25 48.4 46.5 21.4 33.5 34.7 81 37.4 134.1 1.7 35.4-1.4 72.2-8.7 105.6h135c39 0 73.4 9.9 99.5 28.8 27.9 20.4 43.7 49.6 44.4 82.4v1c0 20.6-6.8 44.7-17.4 63.4 11.6 17.1 17.4 38 17.4 62.3 0 32.2-19.3 60.3-38.7 77.5 4 13.5 4.4 25.4 4.4 29.4 0 35.3-18.8 64.9-52.1 82.6 1.1 5.6 1.6 11.7 1.6 18.4 0 36.5-15.6 67.4-44 86.8-26.6 18.5-63.7 27.9-110.4 27.9z"
                        fill="" p-id="3755"></path>
                    <path
                        d="M91.7 808.1c-7.7 0-14.2-5.8-14.9-13.6l-12-128.4c-0.8-8.2 5.3-15.6 13.5-16.3 8.3-0.8 15.6 5.3 16.3 13.5l12 128.4c0.8 8.2-5.3 15.6-13.5 16.3-0.4 0.1-0.9 0.1-1.4 0.1z"
                        fill="" p-id="3756"></path>
                    <path
                        d="M502.1 1006.1h-74.2c-28.8 0-60.9-6-85.9-16l-0.3-0.1c-8-3.4-14.7-6.5-19.9-9.2-0.7 0.6-1.6 1.2-2.5 1.8-16.2 11.7-34.2 22.7-56.7 23.4h-67.2c-32.7 0-60-10.8-79-31.4-17.4-18.9-27.7-45.7-29.9-77.7L82.7 857c-0.8-8.2 5.3-15.6 13.5-16.3 8.2-0.8 15.6 5.3 16.3 13.5l3.8 40.7c1.7 25.1 9.3 45.7 22 59.5 13.3 14.4 32.5 21.7 57 21.7h66.4c13.6-0.5 25.8-7.5 40-17.9l0.5-0.4c0.3-0.2 1.1-0.8 1.6-1.3 1.1-0.9 2.4-2 3.9-3 1-1 2.7-2.5 5.1-3.7l6.7-3.4 6.7 3.4c0.3 0.1 0.7 0.3 1.1 0.5 1 0.4 2.2 0.9 3.4 1.5l0.6 0.3c4.8 2.7 12.3 6.2 21.8 10.3 21.3 8.5 49.9 13.8 74.6 13.8h74.2c8.3 0 15 6.7 15 15s-6.5 14.9-14.8 14.9z"
                        fill="" p-id="3757"></path>
                    <path
                        d="M320.7 970c-7.9 0-14.5-6.2-15-14.2l-26.5-495c-0.4-8.3 5.9-15.3 14.2-15.8 8.3-0.4 15.3 5.9 15.8 14.2l26.5 495c0.4 8.3-5.9 15.3-14.2 15.8h-0.8z"
                        fill="" p-id="3758"></path>
                    <path
                        d="M188.4 628.7c-7.9 0-14.5-6.2-15-14.2l-2.8-49.5c-0.5-8.3 5.9-15.3 14.1-15.8 8.3-0.5 15.3 5.9 15.8 14.1l2.8 49.5c0.5 8.3-5.9 15.3-14.1 15.8-0.3 0.1-0.5 0.1-0.8 0.1zM200.2 842.3c-7.9 0-14.5-6.2-15-14.2l-8.1-145.7c-0.5-8.3 5.9-15.3 14.1-15.8 8.3-0.5 15.3 5.9 15.8 14.1l8.1 145.7c0.5 8.3-5.9 15.3-14.1 15.8-0.2 0-0.5 0.1-0.8 0.1z"
                        fill="#FFFFFF" p-id="3759"></path>
                  </svg>
                </template>
              </vue-star>
            </el-button>
          </div>
          <!--          <div class="comment">
                      <el-input
                          placeholder="评论一下"
                          type="textarea"
                          v-model="state.content"
                      ></el-input>
                      <el-button
                          style="margin-top: 15px"
                          type="primary"
                          :loading="state.btnLoading"
                          @click="handleAddComment"
                      >发 送
                      </el-button>
                    </div>
                    <CommentList
                        v-if="!state.isLoading"
                        :numbers="state.articleDetail.meta.comments"
                        :list="state.articleDetail.comments"
                        :article_id="state.articleDetail.id"
                        @refreshArticle="refreshArticle"
                    />-->
          <div class="comments" v-if="state.articleDetail.id!=='-1'">
            <comment-test :article="state.articleDetail"></comment-test>
          </div>
        </div>
        <LoadingCustom v-if="state.isLoading"></LoadingCustom>
      </div>
    </el-col>
    <el-col :xs="0" :sm="4" :md="6" :lg="5" :xl="4"
    >
      <div class="grid-content bg-purple-light">
        <custom-slider></custom-slider>
      </div
      >
    </el-col>
  </el-row>
  <el-backtop/>
</template>
<script lang="ts">
import {defineComponent, nextTick, onMounted, onUpdated, reactive, ref} from "vue";
import service from "../utils/https";
import urls from "../utils/urls";
import {ElMessage} from "element-plus";
import {useRoute} from "vue-router";
import {isMobile, lazyload, timestampToTime} from "../utils/utils";
import markdown from "../utils/markdown";
import LoadingCustom from "../components/common/load/Loading.vue";
import CommentList from "../components/common/comment2/CommentList.vue";
import {ArticleDetailIF, ArticleDetailParams, LikeParams, UserInfo,} from "../types";
import CustomSlider from "../components/common/CustomSlider.vue";
import {store} from "../store";
import cookieUtils from "../utils/cookieUtils";
import VueStar from "../components/common/advanced_button/VueStar.vue";
import CommentTest from "./Comment.vue";
import Nav from "../components/nav/Nav.vue";
import {viewArticle} from "../api/article";

// 点击图片放大
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import TocHelper from "toc-helper";
import config from "../utils/config";

export default defineComponent({
  name: "ArticleDetail",
  components: {
    Nav,
    CommentTest,
    VueStar,
    CustomSlider,
    LoadingCustom,
    CommentList,
  },
  setup() {
    const state = reactive({
      comments: {},
      btnLoading: false,
      isLoadEnd: false,
      isLoading: false,
      toc: false,
      isMobile: isMobile(),
      params: {
        id: "",
        type: 1, //文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
      } as ArticleDetailParams,
      content: "",
      articleDetail: {
        toc: "",
        author: "xianchengyue",
        createBy: -1,
        category: [],
        comments: [],
        create_time: "",
        desc: "",
        content: "",
        id: '-1',
        img_url: "",
        numbers: 0,
        keyword: [],
        like_users: [],
        meta: {views: 0, likes: 0, comments: 0},
        origin: 0,
        state: 1,
        tags: ["123"],
        title: "",
        update_time: "",
        userLiked: false,
      } as ArticleDetailIF,
      cacheTime: 0, // 缓存时间
      times: 0, // 评论次数
      likeTimes: 0, // 点赞次数
    });

    const formatTime = (value: string | Date): string => {
      return timestampToTime(value, true);
    };

    const large = () => {
      // 绑定图片放大事件，
      //  图片放大容器
        const ViewerDom = document.getElementsByClassName("article-detail")[0];
        let imgs = ViewerDom.getElementsByTagName("img");
        //遍历图片，绑定点击事件触发放大
        for (let i = 0; i < imgs.length; i++) {
          imgs[i].onclick = function () {
            new Viewer(imgs[i], {
              // 配置
              navbar: false, // 显示缩略图导航
              zoomRatio: 0.2, // 鼠标滚动时的缩放比例
              movable: true, // 图片是否可移动
              toolbar: { // 显示工具栏
                zoomIn: 1,
                zoomOut: 1,
                oneToOne: 0,
                reset: 1,
                prev: 0,
                play: 0,
                next: 0,
                rotateLeft: 1,
                rotateRight: 1,
                flipHorizontal: 0,
                flipVertical: 0,
              },
            }).show();
          };
        }
    };

    const getUser = async (): Promise<void> => {
      const cookie = cookieUtils.getCookie("token");
      if (cookie == null || cookie == "") {
        return;
      }
      /*const loading: any = ElLoading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.7)",
      });
      loading.close();*/

      const data: UserInfo = await service.get(
          urls.getCurrentUser,
          {withCredentials: true}
      );
      const userInfo: UserInfo = {
        id: data.id,
        token: data.token,
        username: data.username,
        avatar: config.fileServerHost + "/" + data.avatar,
      };
      store.commit("SAVE_USER", {
        userInfo,
      });
      window.sessionStorage.userInfo = JSON.stringify(userInfo);
    };

    const handleSearch = async (): Promise<void> => {
      state.isLoading = true;
      let id = location.href.substring(location.href.lastIndexOf('/') + 1);
      if (id.indexOf('#') != -1) {
        id = id.substring(0, id.indexOf('#'))
      }
      const data: any = await service.get(urls.articleDetail.replace('{id}', id), state.params);
      state.articleDetail = data;
      state.isLoading = false;


      const article = markdown.marked(data.content);
      article.then((res: any) => {
        state.articleDetail.content = res.content;
        state.articleDetail.toc = res.toc;
      });
      document.title = data.title;
      document.addEventListener("scroll", lazyload);
    };

    const refreshArticle = (): void => {
      handleSearch();
    };

    const likeArticle = async (): Promise<void> => {
      state.articleDetail.userLiked = true;
      if (!state.articleDetail.id) {
        ElMessage({
          message: "该文章不存在！",
          type: "warning",
        });
        return;
      }

      if (state.likeTimes > 0) {
        ElMessage({
          message: "好兄弟点了不准反悔！",
          type: "warning",
        });
        return;
      }

      let user_id: string = "";
      if (window.sessionStorage.userInfo) {
        let userInfo = JSON.parse(window.sessionStorage.userInfo);
        user_id = userInfo.id;
      } else {
        ElMessage({
          message: "登录才能点赞，请先登录！",
          type: "warning",
        });
        return;
      }
      let params: LikeParams = {
        id: state.articleDetail.id,
        user_id,
      };
      const res = await service.put(urls.likeArticle.replace("{id}", params.id));
      state.isLoading = false;
      if (res != null) {
        state.likeTimes++;
        ElMessage({
          message: "谢谢点赞",
          type: "success",
        });
      }
    };

    const handleAddComment = async (): Promise<void> => {
      if (!state.articleDetail.id) {
        ElMessage({
          message: "该文章不存在！",
          type: "error",
        });
        return;
      }

      if (state.times > 2) {
        ElMessage({
          message: "您今天评论的次数已经用完，明天再来评论吧！",
          type: "warning",
        });
        return;
      }

      let now = new Date();
      let nowTime = now.getTime();
      if (nowTime - state.cacheTime < 4000) {
        ElMessage({
          message: "您评论太过频繁，1 分钟后再来留言吧！",
          type: "warning",
        });
        return;
      }

      if (!state.content) {
        ElMessage({
          message: "请输入内容!",
          type: "warning",
        });
        return;
      }
      let user_id = "";
      if (window.sessionStorage.userInfo) {
        let userInfo = JSON.parse(window.sessionStorage.userInfo);
        user_id = userInfo.id;
      } else {
        ElMessage({
          message: "登录才能评论，请先登录！",
          type: "warning",
        });
        return;
      }

      state.btnLoading = true;
      await service.post(urls.addComment, {
        article_id: state.articleDetail.id,
        user_id,
        content: state.content,
      });
      state.btnLoading = false;
      state.times++;
      state.cacheTime = nowTime;
      state.content = "";
      ElMessage({
        message: "操作成功",
        type: "success",
      });
      handleSearch();
    };

    const route = useRoute();
    onMounted(() => {
      state.params.id = route.query.id as string;
      if (route.path === "/about") {
        state.params.type = 3;
      }
      getUser()
      handleSearch();
      //拿不到图片数组元素，暂时先这样写
      setTimeout(() => {
        large();
      }, 500)

      setTimeout(() => {
        let id = location.href.substring(location.href.lastIndexOf('/') + 1);
        viewArticle(Number.parseInt(id));
      }, 3000)
    });

    return {
      state,
      formatTime,
      handleSearch,
      handleAddComment,
      likeArticle,
      refreshArticle,
    };
  },
  beforeUnmount(): void {
    document.title = "小记";
  },
});


</script>
<style lang="less">
#li-toc:target {
  padding-top: 50px;
}

.anchor {
  min-width: 190px;
  max-height: 100vh;
  overflow-y: scroll;
  display: block;
  border-left: 1px solid #eee;

  .anchor-ul {
    list-style-type: none;
    position: relative;
    margin-top: 14px;
    padding-left: 10px;
    padding-right: 10px;
    max-width: 250px;
    border: none;
    -moz-box-shadow: 0 0px 0px #fff;
    -webkit-box-shadow: 0 0px 0px #fff;
    box-shadow: 0 0px 0px #fff;

    li.active {
      color: #009a61;
    }
  }

  a {
    margin-top: 9px;
    color: #333;
    display: inline-block;
  }
}

.anchor::-webkit-scrollbar {
  display: none;
}

.article {
  width: 100%;

  .header {
    .title {
      margin: 20px 0 0;
      text-align: center;
      font-size: 34px;
      font-weight: bold;
    }

    .author {
      position: relative;
      margin: 30px 0 40px;
      padding-left: 50px;

      .avatar {
        position: absolute;
        left: 0;
        top: 0;
        width: 48px;
        height: 48px;
        vertical-align: middle;
        display: inline-block;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .info {
        float: left;
        vertical-align: middle;
        // display: inline-block;
        margin-left: 8px;

        a {
          color: #333;
        }
      }

      .name {
        margin-right: 3px;
        font-size: 16px;
        vertical-align: middle;
      }

      .meta {
        margin-top: 5px;
        font-size: 12px;
        color: #969696;

        span {
          padding-right: 5px;
        }
      }

      .tags {
        float: right;
        padding-top: 15px;
        // padding-right: 20px;
        .tag {
          // padding: 0 10px;
          margin-left: 5px;
          border-right: 2px solid #eee;
        }
      }
    }
  }

  .content {
    min-height: 300px;
  }
}

.heart {
  height: 60px;
  text-align: center;
  margin: 50px;
}

.loader {
  color: rgb(226, 44, 44);
  text-align: center;
  padding: 50px;
  font-size: 16px;
}

.clearfix {
  clear: both;
}

.article-left {
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
  background-color: #ffffff;
}

.article-right {
  padding: 14px;
  width: 97%;
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
  background-color: #ffffff;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  //background: #e5e9f2;
}

.grid-content {
  overflow: hidden;
  border-radius: 4px;
  min-height: 36px;
}


.target-fix {
  position: relative;
  top: -44px; /*偏移值*/
  display: block;
  height: 0;
  overflow: hidden;
}

.toc {
  top:60px;
  position: fixed;
  z-index: 1000000001;
  left: -62px !important;
  overflow: visible;
  transition: transform 0.4s ease-in 0s;
  display: block;
}

.toc:hover {
  transform: translateX(62px);
}

.toc_b {
}
</style>

