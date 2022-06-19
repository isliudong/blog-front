<template>
  <div>
    <el-upload
        v-show="show"
        :action=fileServer
        v-model=fileKey
        drag
        :headers=headers
        :http-request="uploadSectionFile"
        list-type="picture-card"
        ref="upload"
        :auto-upload="true">
      <template #default>
        <el-icon>
          <plus/>
        </el-icon>
      </template>
      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
          <span class="el-upload-list__item-actions">
          <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in/></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
          >
            <el-icon><download/></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
          >
            <el-icon><delete/></el-icon>
          </span>
        </span>
        </div>
      </template>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt=""/>
    </el-dialog>
    <!--  <el-button @click=submit></el-button>-->
  </div>
</template>
<script lang="ts">
import {Delete, Download, Plus, ZoomIn} from '@element-plus/icons'
import config from "../../utils/config";
import cookieUtils from "../../utils/cookieUtils";
import fileService from "../../utils/fileHttps";

export default {
  components: {
    Plus,
    ZoomIn,
    Download,
    Delete,
  },
  data() {
    return {
      files: [],
      show: true,
      headers: {'Content-Type': 'multipart/form-data', 'Authorization': "Bearer " + cookieUtils.getCookie("token")},
      fileKey: '',
      fileServer: config.baseURL + "/file",
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
    }
  },
  watch: {
    files(val: Array<any>, old: Array<any>) {
      console.log(val)
      console.log(old)
      if (val.length > 0) {
        this.show = false
      }
    }
  },
  methods: {
    handleRemove(file) {
      // 1.获取将要删除图片的临时路径
      const filePath = file.response.data.tmp_path
      // 2.从pics数组中，找到图片对应的索引值
      const i = this.formData.pics.findIndex(x => x.pic === filePath)
      // 3.调用splice方法，移除图片信息
      this.formData.splice(i, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    submit() {
      this.$refs.upload.submit();
    },
    async uploadSectionFile(params) {
      const file = params.file,
          fileType = file.type,
          isImage = fileType.indexOf("image") != -1,
          isLt2M = file.size / 1024 / 1024 < 2;
      // 这里常规检验，看项目需求而定
      if (!isImage) {
        this.$message.error("只能上传图片格式png、jpg、gif!");
        return;
      }
      if (!isLt2M) {
        this.$message.error("只能上传图片大小小于2M");
        return;
      }
      const forms = new FormData();
      const configs = {
        headers: {'Content-Type': 'multipart/form-data'}
      };
      forms.append('file', file)
      const fileData = await fileService.post("/file", forms, configs);
      this.fileKey=fileData.fileKey;
      this.$emit("file-key", this.fileKey)
    }
  },
}
</script>
