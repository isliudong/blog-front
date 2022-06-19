<template>
  <div class="right slider">
    <!--    <img
          class="right-logo"
          src="~@/assets/user_logo.jpg"
          alt=""
        />-->
    <img
        alt=""
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage109.360doc.com%2FDownloadImg%2F2019%2F12%2F0413%2F177212461_2_20191204012755613&refer=http%3A%2F%2Fimage109.360doc.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649594588&t=4189a956c3465c63724ff2d520fb638d"
        style="max-width: 200px"
    />
    <!--    <div class="title">小记</div>-->
    <div class="right-content">
      <div class="item">
        <div class="num">32</div>
        文章
      </div>
      <div class="item">
        <div class="num">18</div>
        回答
      </div>
      <div class="item">
        <div class="num">14</div>
        分享
      </div>
      <div class="item">
        <div class="num">3</div>
        收获
      </div>
    </div>
    <div class="tags">
      <div class="title">标签云</div>
      <router-link
          v-for="item in state.list"
          :key="item.id"
          :to="`/articles?tagId=${item.id}&tagName=${item.name}&categoryId=`"
          class="item"
      >
        <span :key="item.id">{{ item.name }}</span>
      </router-link>
    </div>
    <div class="introduce">
      <div class="title">技术以内的 BB</div>
      <div class="content">
        <img
            alt="全栈修炼"
            src="~@/assets/image/xianchengyue.png"
            style="width:100%;"
        />
      </div>
    </div>
    <div class="introduce">
      <div class="title">开源项目的 BB</div>
      <div class="content">
        <img
            alt="前端GitHub"
            src="~@/assets/image/xianchengyue-git.png"
            style="width:100%;"
        />
      </div>
    </div>

    <div class="introduce">
      <div class="content">
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Page, Params, Tag} from "../../types";
import {defineComponent, onMounted, reactive} from "vue";
import service from "../../utils/https";
import urls from "../../utils/urls";
import Footer from "./Footer.vue";

export default defineComponent({
  name: "CustomSlider",
  components: {Footer},
  setup(props, context) {
    const state = reactive({
      isLoadEnd: false,
      isLoading: false,
      list: [] as Array<any>,
      total: 0,
      params: {
        current: 1,
        size: 10,
      } as Params,
    });

    const handleSearch = async (): Promise<void> => {
      state.isLoading = true;
      const data: Page<Tag> = await service.get(urls.getTagList, {
        params: state.params,
      });
      state.isLoading = false;

      state.list = [...state.list, ...data.records];
      state.total = data.total;
      state.params.current++;
      if (state.total === state.list.length) {
        state.isLoadEnd = true;
      }
    };

    onMounted(() => {
      handleSearch();
    });

    return {
      state,
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.slider {
  overflow: hidden;
  //min-width: 200px;
  //padding-top: 50px;
}

.right {
  -webkit-box-flex: 1;
  -ms-flex: 1 1;
  flex: 1 1;
  font-size: 14px;
  background-color: #ffffff;
  text-align: center;

  .right-logo {
    width: 130px;
    border-radius: 50%;
    animation: mylogo 3s infinite;
    -moz-animation: mylogo 3s infinite; /* Firefox */
    -webkit-animation: mylogo 3s infinite; /* Safari and Chrome */
    -o-animation: mylogo 3s infinite; /* Opera */

  }

  .title {
    font-size: 25px;
    font-weight: bold;
  }

  .right-content {
    padding: 10px 0 20px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;

    .item {
      display: inline-block;
      padding: 0 10px;
      color: #969696;
      border-right: 1px solid #eee;

      &:last-child {
        border-right: none;
      }

      .num {
        color: #333;
      }
    }
  }

  .introduce {
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;

    .title {
      font-size: 14px;
      color: #969696;
    }

    .content {
      color: #333;
      line-height: 26px;
      text-align: left;
      padding: 20px 0;
    }

    .footer {
      padding-bottom: 10px;
    }
  }

  .tags {
    min-height: 200px;
    padding: 5px 0 20px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;

    .title {
      font-size: 14px;
      color: #969696;
    }

    .item {
      display: inline-block;
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 5px;
      background-color: #eee;
      color: #333;
      margin: 10px 10px 0 0;
      text-decoration: none;

      &:hover {
        color: #409eff;
      }
    }
  }

  .classification {
    padding: 5px 0 20px 0;

    .title {
      font-size: 14px;
      color: #969696;
    }

    .item {
      text-align: center;
      padding: 10px;
      border-bottom: 1px solid #eee;
      color: #666;
      margin: 10px 10px 0 0;
    }
  }
}

@keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-moz-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-webkit-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-o-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}
</style>
