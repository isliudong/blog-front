<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="#" class="sign-in-form">
          <h2 class="title">登录到小记</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input v-model="params.username" placeholder="用户名" type="text"/>
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input v-model="params.password" placeholder="密码" type="password"/>
          </div>
          <input class="btn solid" type="submit" value="登录" @click.prevent="login"/>
          <p class="social-text">Or Sign in with social platforms</p>
          <div class="social-media">
            <a class="social-icon" href="javascript:void(0);" @click.prevent="thirdAuth('qq')">
              <i class="fab fa-qq fa-1x"></i>
            </a>
            <a class="social-icon" href="javascript:void(0);" @click.prevent="thirdAuth('weixin')">
              <i class="fab fa-weixin"></i>
            </a>
            <a class="social-icon" href="javascript:void(0);" @click.prevent="thirdAuth('github')">
              <i class="fab fa-github fa-1x"></i>
            </a>
            <a class="social-icon" href="javascript:void(0);" @click.prevent="thirdAuth('weibo')">
              <i class="fab fa-weibo"></i>
            </a>
          </div>
        </form>
        <form action="#" class="sign-up-form">
          <h2 class="title">新用户</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input v-model="params.username" placeholder="用户名" type="text"/>
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input v-model="params.email" placeholder="邮箱" type="email"/>
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input v-model="params.password" placeholder="密码" type="password"/>
          </div>
          <input class="btn" type="submit" value="注册" @click.prevent="register"/>
          <p class="social-text">Or Sign up with social platforms</p>
          <div class="social-media">
            <a class="social-icon" href="javascript:void(0);" @click.prevent="thirdAuth('qq')">
              <i class="fab fa-qq fa-1x"></i>
            </a>
            <a class="social-icon" href="javascript:void(0);" @click.prevent="thirdAuth('weixin')">
              <i class="fab fa-weixin"></i>
            </a>
            <a class="social-icon" href="javascript:void(0);" @click.prevent="thirdAuth('github')">
              <i class="fab fa-github fa-1x"></i>
            </a>
            <a class="social-icon" href="javascript:void(0);" @click.prevent="thirdAuth('weibo')">
              <i class="fab fa-weibo"></i>
            </a>
          </div>
        </form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>New here ?</h3>
          <p>
            知识的激流虽涌现出万丈峭壁，但只要再前进一步，峭壁就会变成壮丽的瀑布!
          </p>
          <button id="sign-up-btn" class="btn transparent">
            去注册
          </button>
        </div>
        <img alt="" class="image" src="../../assets/image/book.svg"/>
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>One of us ?</h3>
          <p>
            拥有真正朋友的人生不再孤单,拥有真挚友情的生命不再孤独,拥有真诚情谊的生活不再寂寞
          </p>
          <button id="sign-in-btn" class="btn transparent">
            去登陆
          </button>
        </div>
        <img alt="" class="image" src="../../assets/image/学习.svg"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {responseIsSuccess} from "../../utils/utils";
import {RegAndLogParams, UserInfo} from "../../types";
import service from "../../utils/https";
import urls from "../../utils/urls";
import {ElMessage} from "element-plus";
import cookieUtils from "../../utils/cookieUtils";
import {key} from "../../store";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import config from "../../utils/config";

const store = useStore(key);
const router = useRouter();
const route = useRoute();
let btnLoading = false
const params: RegAndLogParams = {
  email: "",
  username: "",
  usercode: "",
  password: "",
  phone: "",
  desc: "",
};

const login = async () => {
  let data: UserInfo;
  btnLoading = true;
  data = await service.post(urls.login, params);
  btnLoading = false;
  const userInfo: UserInfo = {
    token: "Bearer " + data.token,
    username: data.username,
    avatar: data.avatar,
    id: data.id
  };
  console.log(userInfo)
  store.commit("SAVE_USER", {
    userInfo,
  });
  cookieUtils.setCookie("token", data.token);
  window.sessionStorage.userInfo = JSON.stringify(userInfo);
  ElMessage({
    message: "登录成功",
    type: "success",
  });
  //登录成功跳转回来
  const item = window.localStorage.getItem("oldPath");
  let preventHistory = JSON.parse(item == null ? "{}" : item);

  if (preventHistory.path != null) {
    await router.push({
      path: preventHistory.path,
      query: preventHistory.query,
    });
  } else {
    await router.push("/articles")
  }

}
const thirdAuth = (platform: string) => {
  window.location.href = config.serverHost + "/auth2/authorization/" + platform
};
const register = async () => {
  btnLoading = true;
  const data: UserInfo = await service.post(urls.register, params);
  btnLoading = false;
  if (responseIsSuccess(data)) {
    ElMessage({
      message: "注册成功，请前往登录",
      type: "success",
    });
    const sign_in_btn = document.querySelector("#sign-in-btn");
    sign_in_btn.click()
  }
}

onMounted(() => {
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");
  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });
  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });
})
</script>

<style scoped>


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
input {
  font-family: "Poppins", sans-serif;
}

.container {
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 50%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0em 5em;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

form.sign-up-form {
  opacity: 0;
  z-index: 1;
}

form.sign-in-form {
  z-index: 2;
}

.title {
  font-size: 2.2em;
  color: #444;
  margin-bottom: 10px;
}

.input-field {
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4em;
  position: relative;
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  transition: 0.5s;
  font-size: 1.1em;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1em;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.social-text {
  padding: 0.7em 0;
  font-size: 1em;
}

.social-media {
  display: flex;
  justify-content: center;
}

.social-icon {
  height: 46px;
  width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.45em;
  color: #333;
  border-radius: 50%;
  border: 1px solid #333;
  text-decoration: none;
  font-size: 1.1em;
  transition: 0.3s;
}

.social-icon:hover {
  color: #4481eb;
  border-color: #4481eb;
}

.btn {
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}

.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.container:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 3em 17% 2em 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3em 12% 2em 17%;
}

.panel .content {
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5em;
}

.panel p {
  font-size: 0.95em;
  padding: 0.7em 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8em;
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}

/* ANIMATION */

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign-up-mode .signin-signup {
  left: 25%;
}

.container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

@media (max-width: 870px) {
  .container {
    min-height: 800px;
    height: 100vh;
  }

  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .signin-signup,
  .container.sign-up-mode .signin-signup {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5em 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 1.2em;
  }

  .panel p {
    font-size: 0.7em;
    padding: 0.5em 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7em;
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container.sign-up-mode .right-panel .image,
  .container.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }

  .container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5em;
  }

  .image {
    display: none;
  }

  .panel .content {
    padding: 0.5em 1em;
  }

  .container {
    padding: 1.5em;
  }

  .container:before {
    bottom: 72%;
    left: 50%;
  }

  .container.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
}

</style>
