<template>
  <div style="width: 100%">
    <!-- Form -->
    <el-dialog v-model="state.newArticleForm" title="新文章">
      <el-form :model="state.articleData">
        <el-form-item :label-width="state.formLabelWidth" label="标题">
          <el-input v-model="state.articleData.title" autocomplete="off" placeholder="请输入标题..."></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.newArticleForm = false">Cancel</el-button>
        <el-button :disabled="state.articleData.title===''" type="primary" @click="saveArticle">确定</el-button>
      </span>
      </template>
    </el-dialog>
    <md-editor :text="state.articleData.content" @editor-save="editorSave"></md-editor>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive} from 'vue'
import {useRoute} from "vue-router";
import {Article} from "../../types";
import service from "../../utils/https";
import MdEditor from "../common/editer/MdEditor.vue";
import {useStore} from "vuex";
import {key} from "../../store";
import {ElMessage} from "element-plus";

export default defineComponent({
  components: {MdEditor},
  props: {},
  setup() {
    let route = useRoute();
    const store = useStore(key)

    async function save() {
      if (state.articleData.id) {
        let data = await service.put("/articles/{id}".replace("{id}", route.query.id.toString()),
            state.articleData);
      } else {
        let data = await service.post("/articles", state.articleData);
        state.articleData.id = data.id;
      }
      ElMessage({
        message: "保存成功",
        type: "success"
      });
      state.newArticleForm = false;
    }

    const saveArticle = () => {
      save();
      state.newArticleForm = false;
    }
    const editorSave = (content: string) => {
      if (content == null || content == "") {
        ElMessage({
          message: "请输入内容后保存哦",
          type: "warning"
        });
        return
      }
      state.articleData.content = content;
      if (state.articleData.id == null) {
        state.newArticleForm = true;
      } else {
        save();
      }
    }
    const state = reactive({
      newArticleForm: false,
      formLabelWidth: '',
      labelPosition: 'left',
      articleData: {
        id: null,
        title: '',
        desc: '',
        type: '',
        author: 1,
        content: ''
      },
    })
    const count = computed(() => store.state.count)
    onMounted(() => {
      getArticleDetail(route.query.id)
    })
    const getArticleDetail = async (id: number) => {
      const data: Article = await service.get("/articles/{id}/detail".replace("{id}", id.toString()));
      state.articleData.content = data.content;
      state.articleData.title = data.title;
      state.articleData.desc = data.tags.toString();
      document.title = data.title
    }
    return {
      state,
      count,
      saveArticle,
      editorSave,
      inCrement: () => store.commit('increment')
    }
  }
})
</script>
