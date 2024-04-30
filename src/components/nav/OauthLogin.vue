<template>
  <div class="oauth-background">
    <div id="preloader_1">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-undef */
import {defineComponent, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {key} from "../../store";
import {ElMessage} from "element-plus";
import {UserInfo} from "../../types";
import service from "../../utils/https";
import cookieUtils from "../../utils/cookieUtils";
import urls from "../../utils/urls";
import config from "../../utils/config";

export default defineComponent({
  setup(props, context) {
    const store = useStore(key);
    const route = useRoute();
    const router = useRouter();
    onMounted(async () => {
          //关闭登录框
          //通过路径判断是微博登录还是qq登录
          if (route.path.indexOf("auth2/login")>-1) {
            //获取授权token
            const authData = await service.get(route.fullPath)
            cookieUtils.setCookie("token", authData.token);

            //使用token获取当前用户
            const data: UserInfo = await service.get(
                urls.getCurrentUser,
                {withCredentials: true}
            );
            const userInfo: UserInfo = {
              token: "Bearer " + authData.token,
              username: data.username,
              avatar: config.fileServerHost + "/" + data.avatar,
              id: data.id
            };
            store.commit("SAVE_USER", {
              userInfo,
            });
            window.sessionStorage.userInfo = JSON.stringify(userInfo);
            ElMessage({
              message: "登录成功",
              type: "success",
            });
          }

          //登录成功跳转回来
          const item = window.localStorage.getItem("oldPath");
          let preventHistory = JSON.parse(item == null ? "{}" : item);

          if (preventHistory.path != null) {
            await router.push({
              path: preventHistory.path,
              query: preventHistory.query,
            });
          } else {
            await router.push("/")
          }
        }
    )
  },
});
</script>

<style scoped>
.oauth-background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 1000;
}

#preloader_1 {
  position: relative;
  top: 45vh;
  left: 45vw;
}

#preloader_1 span {
  display: block;
  bottom: 0px;
  width: 9px;
  height: 5px;
  background: #9b59b6;
  position: absolute;
  animation: preloader_1 1.5s infinite ease-in-out;
}

#preloader_1 span:nth-child(2) {
  left: 11px;
  animation-delay: 0.2s;
}

#preloader_1 span:nth-child(3) {
  left: 22px;
  animation-delay: 0.4s;
}

#preloader_1 span:nth-child(4) {
  left: 33px;
  animation-delay: 0.6s;
}

#preloader_1 span:nth-child(5) {
  left: 44px;
  animation-delay: 0.8s;
}

@keyframes preloader_1 {
  0% {
    height: 5px;
    transform: translateY(0px);
    background: #9b59b6;
  }
  25% {
    height: 30px;
    transform: translateY(15px);
    background: #3498db;
  }
  50% {
    height: 5px;
    transform: translateY(0px);
    background: #9b59b6;
  }
  100% {
    height: 5px;
    transform: translateY(0px);
    background: #9b59b6;
  }
}
</style>
