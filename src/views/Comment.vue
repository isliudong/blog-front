<template>
  <div>
    <!--    <div ref="header" class="change-role">
          &lt;!&ndash;      <div class="change" @click="changeUser">切换角色</div>
                <div class="current-role">
                  <img :src="currentUser.avatar" alt="头像">
                  <span>{{ currentUser.name + (currentUser.author ? '（作者）' : '（游客）') }}</span>
                </div>&ndash;&gt;
        </div>-->
    <div ref="comment" :style="wrapStyle" class="comment-wrap">
      <Comment
          v-model:comments="comments"
          :user="currentUser"
          :before-submit="submit"
          :before-like="like"
          :before-delete="deleteComment"
          :upload-img="uploadImg"
          :commentModel="commentModel"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Comment from '../components/common/Comment'
import service from "../utils/https";
import {ElMessage} from "element-plus";

export default {
  name: 'CommentTest',
  components: {
    Comment
  },
  props: {
    article: Object
  },
  data() {
    const users = [
      {
        id: null,
        username: '游客',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        authorFlag: false
      }
    ]
    return {
      comments: [],
      commentModel: {
        id: 'id',
        content: 'content',
        imgSrc: 'imgSrc',
        children: 'children',
        likes: 'likes',
        reply: 'reply',
        createAt: 'createDate',
        user: 'user'
      },
      currentUser: users[0],
      users,
      wrapStyle: '',
    }
  },
  mounted() {
    this.wrapStyle = `max-height: 300vh;min-height: 20vh;font-size: 1em;`
    try {
      this.getUserInfo(JSON.parse(window.sessionStorage.userInfo).username)
    } catch (e) {
      console.log("user not login")
    }
    this.getComments(this.article.id)
  },
  methods: {
    async submit(newCommetn, parent, add) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({newCommetn, parent})
        }, 300)
      })

      let assign;
      if (parent == null) {
        assign = Object.assign(res.newCommetn, {
          parentType: "ARTICLE",
          articleId: this.article.id,
          parentId: this.article.id,
        });
      } else {
        assign = Object.assign(res.newCommetn, {
          parentType: "COMMENT",
          parentId: parent.id,
          articleId: this.article.id,
        });
      }
      const id = await service.post("/comments", assign);
      add(Object.assign(assign), {id: id})
      this.article.comments = this.article.comments + 1
    },
    async like(comment) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(comment)
        }, 0)
      })

      console.log('likeComment: ', res)
    },
    async uploadImg({file, callback}) {
      const res = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.onerror = () => {
          reject(reader.error)
        }
      })

      callback(res)
      console.log('uploadImg： ', res)
    },
    async deleteComment(comment, parent) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({comment, parent})
        }, 300)
      })

      console.log('deleteComment: ', res)
    },
    changeUser() {
      const users = this.users
      const index = users.findIndex((c) => c.username === this.currentUser.username)
      this.currentUser = users[index === users.length - 1 ? 0 : index + 1]
      this.$refs.comment.scrollTo({left: 0, top: 0, behavior: 'smooth'})
    },

    async getComments(articleId: number) {
      const comments = await service.get("/comments/article/" + articleId, {params: {}});
      this.comments = comments.records
    },

    async getUserInfo(account: string) {
      if (account == null) {
        ElMessage({
          message: "请先登录",
          type: "warning"
        });
        return
      }
      const user = await service.get("/users/account/" + account, {params: {}});

      if (user != null) {
        this.currentUser = user;
        if (user.id == this.article.createBy) {
          this.currentUser.authorFlag = true;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin scroll-style($thumb:rgba(255, 255, 255, 0.6), $track: rgba(255, 255, 255, 0)) {
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-track {
    border: none;
    box-shadow: none;
  }
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: $thumb;
  }
  &::-webkit-scrollbar-track {
    background: $track;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 14px;
}

html, body, #app {
  height: 100%;
}

@media screen and (min-width: 320px) {
  html {
    font-size: calc(14px + 4 * ((100vw - 320px) / (1200 - 320)));
  }
}

@media screen and (min-width: 1200px) {
  html {
    font-size: 18px;
  }
}

.change-role {
  background: #1c2433;
  color: #eee;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-content: center;

  .change {
    cursor: pointer;
    padding: 0.4rem;
    margin-right: 2rem;
    font-size: 0.9rem;
    border: 1px solid #e99210;
    border-radius: 5px;
    user-select: none;

    &:hover {
      opacity: 0.9;
    }
  }

  .current-role {
    min-width: 15rem;
    color: #e99210;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #e99210;
    padding: 0 1rem;

    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
      border: 1px solid #eee;
      border-radius: 50%;
    }
  }
}

.comment-wrap {
  overflow: auto;
  @include scroll-style(#db8f1c, #b9b9b9)
}

@media screen and (min-width: 760px) {
  body {
    margin: 0 10%;
    border: 1px dashed #eee;
  }
}

@media screen and (max-width: 500px) {
  .change-role .current-role {
    min-width: 5rem;
    padding: 0 0.5rem;
  }
}
</style>
