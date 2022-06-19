<template>
  <div class="md-editer">
    <v-md-editor
        @save="handleSave"
        v-model="state.text"
        :disabled-menus="[]"
        @upload-image="handleUploadImage"
        height="100vh">
    </v-md-editor>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, reactive, watch} from "vue";
import config from "../../../utils/config";
import fileService from "../../../utils/fileHttps";

export default defineComponent({
  name: "MdEditor",
  props: {
    text: String
  },
  setup(props, context) {
    const state = reactive({
      text: ""
    })
    const fun = () => {
      console.log("123")
    }
    const handleUploadImage = async (event, insertImage, files) => {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      console.log(files);
      const forms = new FormData();
      const configs = {
        headers: {'Content-Type': 'multipart/form-data'}
      };
      forms.append('file', files[0])
      const fileData = await fileService.post("/file", forms, configs);

      // 此处只做示例
      insertImage({
        url:
            config.fileServerHost + "/" + fileData.fileKey,
        desc: fileData.fileName,
        // width: 'auto',
        // height: 'auto',
      });
    }
    const handleSave = () => {
      context.emit("editor-save", state.text)
    }
    watch(() => props.text, () => {
      state.text = <string>props.text
    })
    onMounted(() => {
      window.onbeforeunload = function (e) {
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = "哈哈哈哈哈哈哈哈哈";
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '哈哈哈哈哈哈哈哈哈';
      }

    })
    onUnmounted(() => {
      window.onbeforeunload = null
    })
    return {
      state,
      fun,
      handleSave,
      handleUploadImage
    }

  }


});
</script>

<style scoped>
.md-editer {
  width: 100%;
}
</style>
