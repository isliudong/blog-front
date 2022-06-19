<template>
  <div>
    <!--    keep-alive似乎没有用-->
    <router-view v-slot="{ Component }">
      <keep-alive :include="includeList">
        <component :is="Component"/>
      </keep-alive>
    </router-view>
  </div>
  <!-- bug造成输入框 指针变白色  <Player/>-->
</template>

<script lang="ts">
import {defineAsyncComponent, defineComponent, onMounted, reactive, ref} from "vue";
import {useRoute} from 'vue-router';
import {isMobile} from "./utils/utils";

// 移动端 rem 单位适配
if (isMobile()) {
  // width * 100 / 750 = width / 7.5
  // 1rem = 100px
  const width = window.screen.width;
  window.document.getElementsByTagName("html")[0].style.fontSize =
      width / 7.5 + "px";
}

export default defineComponent({
  name: "App",
  components: {
    Nav: defineAsyncComponent(() => import("./components/nav/Nav.vue")),
    CustomSlider: defineAsyncComponent(
        () => import("./components/common/CustomSlider.vue")
    ),
  },
  watch: {
    $route: function (val: any, oldVal: any) {
      this.routeChange(val, oldVal);
    },
  },
  setup() {
    // 需要缓存的组件name值
    const includeList = ref(["MdEditor"]);

    const state = reactive({});

    const route = useRoute();

    const routeChange = (val: any, oldVal: any): void => {
      const referrer: any = document.getElementById("referrer");
      if (val.path === "/" || val.path === "/a") {
        referrer.setAttribute("content", "always");
      } else {
        referrer.setAttribute("content", "never");
      }
    };

    onMounted(() => {
      routeChange(route, route);
    })

    return {
      state,
      routeChange,
      includeList
    };
  },
});
</script>

<style lang="less">
@import url("./less/monokai_sublime.less");
@import url("./less/index.less");
@import url("./less/mobile.less");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

img {
  vertical-align: bottom;
}

#anchor {
  display: block;
  position: relative;
  top: -60px;
  visibility: hidden;
}
</style>
