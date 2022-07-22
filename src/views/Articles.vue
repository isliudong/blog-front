<template>
  <div>
    <Nav></Nav>
    <div class="main-page">
      <el-row :gutter="20" style="margin: 0;justify-content: center">
        <el-col :lg="16" :md="18" :sm="18" :xl="18" :xs="24"
        >
          <div class="left clearfix">
            <div class="card">
              <router-link active-class="link-active" class="el-link el-link--default" to="/articles/list">全站
              </router-link>
              <router-link active-class="link-active" class="el-link el-link--default" to="/articles/top">热榜
              </router-link>
              <router-link active-class="link-active" class="el-link el-link--default" to="/articles/recommend">推荐
              </router-link>
<!--              <router-link active-class="link-active" class="el-link el-link&#45;&#45;default" to="/articles/follow">关注
              </router-link>-->
            </div>
            <div>
              <router-view></router-view>
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :md="4" :sm="4" :xl="4" :xs="0"
        >
          <div
              v-if="!state.isMobile"
          >
            <CustomSlider></CustomSlider>

          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import CustomSlider from "../components/common/CustomSlider.vue";
import {isMobile} from "../utils/utils";
import Nav from "../components/nav/Nav.vue";

export default defineComponent({
  name: "Articles",
  components: {
    Nav,
    CustomSlider,
  },
  methods: {},
  setup(props, context) {
    const state = reactive({
      isMobile: isMobile(),
    })
    return {state}
  }
});
</script>


<style lang="less" scoped>
.link-active {
  color: #0d84ff;
}

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
  margin-top: 61px;
}

.card {
  font-weight: 500;
}

.card > a {
  margin: 0 22px 0 22px;
  font-size: 16px;
  height: 58px;
}

</style>
