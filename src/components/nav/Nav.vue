<template>
  <div class="head">
    <!--    pc导航-->
    <div
        v-if="!state.isMobile"
        class="nav"
    >
      <div class="nav-content">
        <el-row :gutter="20" style="flex-wrap: nowrap;">
          <el-col :span="0.5"/>
          <el-col :span="1">
            <router-link to="/">
              <img
                  class="logo"
                  src="~@/assets/image/logo.png"
                  alt="xianchengyue"
              >
            </router-link>
          </el-col>
          <el-col :span="11">
            <el-menu
                :router="true"
                :default-active="state.activeIndex"
                active-text-color="#409eff"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
            >
              <el-menuItem
                  v-for="l in state.list"
                  :route="l.path"
                  :index="l.index"
                  :key="l.index"
                  style="height: 52px"
              >
                {{ l.name }}
              </el-menuItem>
            </el-menu>
          </el-col>
          <el-col :span="6">
            <search-input style="margin-top: 6px;"></search-input>
          </el-col>
          <el-col :span="3"></el-col>
          <!--登录-->
          <el-col
              v-if="userInfo.username"
              :span="0.5"
              style="display: flex"
          >
            <div style="height: 52px">
              <el-dropdown @command="handleClickMenu" style="margin-top: 5px">
                  <span class="el-dropdown-link">
                    <el-avatar shape="square" :size="40"
                               :src="userInfo.avatar"></el-avatar>
                  </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <router-link to="/profile">
                      <el-dropdown-item>个人中心</el-dropdown-item>
                    </router-link>
                    <a href="/admin">
                      <el-dropdown-item>{{ userInfo.username }}</el-dropdown-item>
                    </a>
                    <el-dropdown-item command="/logout">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </el-col>
          <el-col
              v-else
              :span="0.5"
          >

            <div style="width:122px;top: 19%;position: relative;"
            >
              <el-button
                  size="small"
                  type="primary"
                  @click="gologin()"
              >登录
              </el-button>
            </div>


          </el-col>
          <el-col :span="1.5"/>
        </el-row>
      </div>
    </div>
    <!--    phone导航-->
    <div
        v-else
        class="nav"
    >
      <div class="nav-mobile">
        <div class="nav-mobile-logo">
          <router-link to="/">
            <img
                class="logo fl"
                alt=""
                src="~@/assets/image/logo.png"
            >
          </router-link>
        </div>
        <div class="title">{{ state.title }}</div>
        <div
            class="menu"
            @click="handleMenu"
        ><i class="el-icon-menu"></i></div>
      </div>
      <div
          v-if="state.isShow"
          class="nav-mobile-content"
          :class="{'enter-slideUp': state.enterSlideUp,'leave-slideDown': state.leaveSlideDown}"
      >
        <div class="list">
          <div
              v-for="l in state.list"
              :key="l.index"
              @click="handleClickMenu(l.path)"
              class="item"
          >
            <router-link :to="l.path">{{ l.name }}</router-link>
          </div>

          <div
              v-if="userInfo.username"
              class="item"
              @click="handleMenu"
          >
            <router-link to="/profile">我的主页</router-link>
          </div>
          <div
              @click="handleClickMenu('/login')"
              class="item"
          >
            <span v-if="userInfo.username">{{ userInfo.username }}</span>
            <span v-else @click="gologin()">登 录</span>
          </div>
          <div
              v-if="userInfo.username"
              @click="handleClickMenu('/logout')"
              class="item"
          >
            登 出
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {defineAsyncComponent, defineComponent, onMounted, reactive,} from "vue";
import service from "../../utils/https";
import urls from "../../utils/urls";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {ElLoading} from "element-plus";
import {key} from "../../store";
import {getQueryStringByName, isMobile} from "../../utils/utils";
import {NavListItem, UserInfo} from "../../types";
import cookieUtils from "../../utils/cookieUtils";
import SearchInput from "../common/SearchInput.vue";
import config from "../../utils/config";

export default defineComponent({
  name: "Nav",
  components: {
    SearchInput,
    RegisterAndLogin: defineAsyncComponent(
        () => import("./RegisterAndLogin.vue")
    ),
    Search: defineAsyncComponent(
        () => import("./Search.vue")
    ),
  },

  computed: {
    userInfo(): UserInfo {
      let userInfo: UserInfo = {
        token: "",
        username: "",
        avatar: "",
        id: ""
      };
      if (window.sessionStorage.userInfo) {
        userInfo = JSON.parse(window.sessionStorage.userInfo);
        (this as any).$store.commit("SAVE_USER", {
          userInfo,
        });
      }
      if ((this as any).$store.state.user.userInfo) {
        userInfo = (this as any).$store.state.user.userInfo;
      }
      return userInfo;
    },
  },
  watch: {
    $route: {
      handler(val: any, oldVal: any) {
        this.routeChange(val, oldVal);
      },
      immediate: true,
    },
  },
  mounted() {
    this.isMobile = isMobile();
    const code: string = getQueryStringByName("code");
    this.getUser(code);
    let scrollTop = 0;
    const hideNav=() =>{
      let scrollTopTemp =
          document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTopTemp > 10) {
        $(".head").hide(100);
      } else {
        $(".head").show(600);
      }
      if (scrollTop < scrollTopTemp) {
        if (scrollTopTemp > 10) {
          if (scrollTopTemp > 200) {
            $(".head").css("top", "-72px");
            scrollTop = scrollTopTemp;
          } else {
            $(".head").css({
              background: "rgba(0,0,0,.8)",
            });
            scrollTop = scrollTopTemp;
          }
        } else {
          $(".head").css("top", "0px");
          $(".head").css({
            background: "rgba(0,0,0,.8)",
          });
          scrollTop = scrollTopTemp;
        }
      } else {
        if (scrollTop < 10) {
          //小于50则说明快到顶了，这个时候就需要去掉之前加深的背景色，让他恢复原来的样子
          $(".head").css("top", "0");
          $(".head").css({
            background: "none",
          });
        } else {
          $(".head").css("top", "0");
          $(".head").css({
            background: "rgba(0,0,0,.8)",
          });
        }
        scrollTop = scrollTopTemp;
      }
    };
    window.addEventListener("scroll", hideNav);
  },

  setup(props, context) {
    const store = useStore(key);
    const router = useRouter();
    const route = useRoute();
    const gologin = () => {
      // 保存授权前的页面链接内容
      let preventHistory: object = {
        path: route.path,
        query: route.query,
      };
      window.localStorage.setItem("oldPath", JSON.stringify(preventHistory))
      router.push("/login")
    };

    const state = reactive({
      visible: false,
      handleFlag: "",
      title: "首页",
      list: [
        {
          index: "1",
          path: "/",
          name: "首页",
        },
        {
          index: "2",
          path: "/articles",
          name: "文章",
        },
        {
          index: "3",
          path: "/writeArticle",
          name: "创作",
        },
        {
          index: "4",
          path: "/personCenter",
          name: "个人中心",
        }
      ] as Array<NavListItem>,
      activeIndex: "0",
      enterSlideUp: false,
      leaveSlideDown: false,
      isShow: false,
      isMobile: isMobile(),
    });

    const routeChange = (val: any, oldVal: any) => {
      for (let i = 0; i < state.list.length; i++) {
        const l: NavListItem = state.list[i];
        if (val.path == "/") {
          state.activeIndex = "1";
          state.title = l.name;
          break;
        }
        if (l.path !== "/" && val.path.indexOf(l.path) == 0) {
          state.activeIndex = l.index;
          state.title = l.name;
          break;
        }
      }
    };
    const handleSelect = (val: string, oldVal: string): void => {
      state.activeIndex = val;
    };

    const handleOk = (value: boolean): void => {
      state.visible = value;
    };

    const handleCancel = (value: boolean): void => {
      state.visible = value;
    };

    const handleClick = (value: string): void => {
      state.handleFlag = value;
      state.visible = true;
    };

    const handleLogout = (): void => {
      window.sessionStorage.userInfo = "";
      cookieUtils.clearCookie("token")
      store.commit("SAVE_USER", {
        userInfo: {
          id: "",
          token: "",
          username: "",
          avatar: "",
        },
      });
    };

    const handleClickMenu = (route?: string): void => {
      state.isShow = false;
      if (route === "/login") {
        state.handleFlag = "login";
        state.visible = true;
      }
      if (route === "/register") {
        state.handleFlag = "register";
        state.visible = true;
      }
      if (route === "/logout") {
        handleLogout();
      }
    };

    const handleMenu = (): void => {
      state.isShow = !state.isShow;
      state.enterSlideUp = !state.enterSlideUp;
    };

    const getUser = async (code: string): Promise<void> => {
      if (store.state.user.userInfo?.id) {
        return;
      }

      const cookie = cookieUtils.getCookie("token");
      if (cookie == null || cookie == "") {
        return;
      }
      const loading: any = ElLoading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.7)",
      });
      const data: UserInfo = await service.get(
          urls.getCurrentUser,
          {code},
          {withCredentials: true}
      );
      loading.close();

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

    const handleHideMenu = (): void => {
      state.enterSlideUp = false;
      state.leaveSlideDown = true;
      setTimeout(() => {
        state.leaveSlideDown = false;
        state.isShow = false;
      }, 300);
    };



    return {
      state,
      handleCancel,
      handleOk,
      handleClick,
      handleLogout,
      handleClickMenu,
      handleMenu,
      getUser,
      handleSelect,
      routeChange,
      handleHideMenu,
      gologin,
    };
  },
});
</script>

<style scoped lang="less">

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.nav-mobile {
  display: flex;
  line-height: 60px;

  .nav-mobile-logo {
    flex: 1;
    margin-top: 5px;
    margin-left: 10px;
  }

  .title {
    flex: 3;
    font-size: 24px;
  }

  .menu {
    flex: 1;
    font-size: 34px;
    color: #409eff;
  }
}

.nav-mobile-content {
  font-size: 0.3rem;
  height: 7.3rem;
  width: 100%;
  background-color: #fff;

  .list {
    .item {
      line-height: 0.8rem;
      color: #303133;
      border-bottom: 1px solid #eee;

      a {
        display: block;
        width: 100%;
        color: #409eff;
        text-decoration-line: none;
      }
    }
  }
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);

  .user_item {
    padding: 0 3px;
  }

  .nav-content {
    margin: 0 auto;
    height: 52px;
  }

  .logo {
    height: 50px;
    width: 50px;
    margin: 1px 0 0;
  }

  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }

  .el-menu--horizontal > .el-menu-item {
    cursor: pointer;
    color: #333;
  }

  .nav-right {
    position: relative;
    padding-top: 15px;
    padding-right: 0;
    width: 122px;
    text-align: center;

    .el-dropdown {
      cursor: pointer;
      padding-right: 60px;
    }
  }

  .user-img {
    width: 50px;
  }
}

.enter-slideUp,
.leave-slideDown {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1010;
}

.enter-slideUp {
  overflow: auto;
  visibility: visible;
  z-index: 1001;
  animation: slideUp 0.3s forwards;
}

.leave-slideDown {
  visibility: visible;
  z-index: 1001;
  animation: slideDown 0.3s forwards;
}

@keyframes slideUp {
  from {
    transform: translate3d(0, 100%, 0);
    opacity: 0.1;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
}

.mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
}

.mask-fade-out {
  animation: maskFadeOut 0.4s forwards;
}

@keyframes maskFadeOut {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 0;
  }
}

.el-menu-demo {
  height: 50px;
}
</style>
