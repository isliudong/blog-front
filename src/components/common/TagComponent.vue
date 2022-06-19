<template>
  <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
  >
    {{ tag }}
  </el-tag>
  <el-input
      v-if="inputVisible"
      ref="saveTagInput"
      v-model="inputValue"
      class="input-new-tag"
      size="mini"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
  >
  </el-input>
  <el-button style="margin-left: 0" v-else class="button-new-tag" size="small" @click="showInput">+ 自定义
  </el-button>
</template>

<script lang="ts">
export default {
  name: "TagComponent",
  props: {
    newTag: String
  },
  data() {
    return {
      dynamicTags: [],
      tags: [],
      inputVisible: false,
      inputValue: '',
    }
  },
  watch: ({
        'dynamicTags.length': function (newQuestion, oldQuestion) {
          console.log(this.dynamicTags)
          this.tags=[];
          this.dynamicTags.forEach((t:string)=>{
            this.tags.push({name:t})
          })
          this.$emit("tag-emit", this.tags)
        },
        'newTag':function () {
          console.log(this.newTag)
          this.dynamicTags.push(this.newTag)
        }
      }
  ),
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
  },
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
