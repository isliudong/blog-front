<template>
  <Nav></Nav>
  <div class="under-nav" style="width: 100%">
    <el-dialog v-model="state.newArticleForm" title="新文章">
      <el-form :model="state.formLabelAlign">
        <el-form-item label="标题" :label-width="state.formLabelWidth">
          <el-input v-model="state.formLabelAlign.title" placeholder="请输入标题..." autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <div style="display: flex;overflow: hidden; height: 200px">
            <el-image
                class="wrap-img"
                :src="state.fileServerHost+'/'+state.formLabelAlign.title"
                :fit="fit"
                v-if="!state.formLabelAlign.img"
            >
              <template #error>
                <div class="image-slot">
                  <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="default"/>
                </div>
              </template>
            </el-image>
            <img-upload @file-key="getFileKey" style="width: 400px"></img-upload>
          </div>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="state.formLabelAlign.description" placeholder="请输入用于展示的描述信息..."></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <div class="">
            <tag-component2 ref="tagComponent"></tag-component2>

            <div style="display: flex;flex-wrap: wrap;">
              <div
                  v-for="item in state.tag.tagList"
                  style="margin-right: 6px"
                  class="item"
                  :key="item.id"
              >
                <el-check-tag :key="item.id" :checked="false" @change="onChange(item)">{{ item.name }}
                </el-check-tag>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.newArticleForm = false">返回</el-button>
        <el-button type="primary" @click="save" :disabled="state.formLabelAlign.title===''">确定</el-button>
      </span>
      </template>
    </el-dialog>
    <el-form
        :label-position="state.labelPosition"
        label-width="100px"
        :model="state.formLabelAlign"
    >

    </el-form>
    <md-editor @editor-save="saveArticle" :text="state.formLabelAlign.content"></md-editor>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, onMounted, reactive, ref} from 'vue'
import {useStore} from 'vuex'
import {key} from '../store'
import MdEditor from "../components/common/editer/MdEditor.vue";
import service from "../utils/https";
import {useRoute} from "vue-router";
import {Article, Page, Params, Tag} from "../types";
import {ElMessage} from "element-plus";
import ImgUpload from "../components/common/imgUpload.vue";
import config from "../utils/config";
import TagComponent from "../components/common/TagComponent.vue";
import urls from "../utils/urls";
import TagComponent2 from "../components/common/TagComponent2.vue";
import Nav from "../components/nav/Nav.vue";

export default defineComponent({
  name: 'WriteArticle',
  components: {Nav, TagComponent2, TagComponent, ImgUpload, MdEditor},
  props: {
    msg: {
      type: String,
      default: 'Hello Test'
    }
  },
  setup() {
    let route = useRoute();
    const tagComponent = ref();

    const store = useStore(key)
    const saveArticle = (content: string) => {
      if (content == null || content == "") {
        ElMessage({
          message: "请输入内容后保存哦",
          type: "warning"
        });
        return
      }
      state.formLabelAlign.content = content;
      state.newArticleForm = true;
      nextTick(()=>{
        tagComponent.value.dynamicTags=state.formLabelAlign.tags
      })

    }

    const save = async () => {
      let data;
      if (state.formLabelAlign.id == -1) {
        state.formLabelAlign.id = null;
        data = await service.post("/articles", state.formLabelAlign);
        if (data!=null){
          state.formLabelAlign.id = data.id;
        }else {
          state.formLabelAlign.id = -1;
        }
      } else {
        data = await service.put("/articles/{id}".replace("{id}", state.formLabelAlign.id.toString()), state.formLabelAlign);
      }
      if (data!=null){
        ElMessage({
          message: "保存成功",
          type: "success"
        });
      }
      state.newArticleForm = false;
    }
    const getFileKey = (fileKey: string) => {
      state.formLabelAlign.img = fileKey
    }
    const state = reactive({
      newArticleForm: false,
      formLabelWidth: '',
      tag: {
        total: 0,
        tagParams: {
          current: 1,
          size: 8,
        } as Params,
        tagList: [] as Array<{ choose: false }>,
        isLoadEnd: false,
        checked: false,
      },

      labelPosition: 'left',
      fileServerHost: config.fileServerHost,
      formLabelAlign: {
        id: -1,
        title: '',
        description: '',
        img: '',
        type: '',
        createBy: -1,
        tags: [],
        content: ''
      },
    })
    const count = computed(() => store.state.count)
    onMounted(() => {
      if (route.query.id) {
        getArticleDetail(route.query.id)
      }
      getTags();
    })
    const getArticleDetail = async (id: number) => {
      const data: Article = await service.get("/articles/{id}/detail".replace("{id}", id.toString()));
      state.formLabelAlign.content = data.content;
      state.formLabelAlign.tags = data.tags;
      state.formLabelAlign.title=data.title;
      state.formLabelAlign.id = Number.parseInt(data.id);
      state.formLabelAlign.description = data.description;
      state.formLabelAlign.createBy = data.createBy;
      document.title = data.title
    }
    //加载标签
    const getTags = async () => {
      const tagData: Page<Tag> = await service.get(urls.getTagList, {
        params: state.tag.tagParams,
      });
      state.tag.tagList = [...state.tag.tagList, ...tagData.records];
      state.tag.total = tagData.total;
      state.tag.tagParams.current++;
      if (state.tag.tagParams.current === tagData.pages) {
        state.tag.isLoadEnd = true;
      }
    };
    const onChange = (tag) => {
      //tag.choose = !tag.choose
      if (state.formLabelAlign.tags.filter(item=>item.name==tag.name).length) {
        let tag1=null;
        for (let i = 0; i < state.formLabelAlign.tags.length; i++) {
          if (tag.name==state.formLabelAlign.tags.at(i).name){
            tag1=state.formLabelAlign.tags[i];
            break;
          }
        }
        if (tag1!=null){
          state.formLabelAlign.tags.splice(state.formLabelAlign.tags.indexOf(tag1), 1)
        }
      } else {
        state.formLabelAlign.tags.push(tag)
      }

    }
    return {
      state,
      count,
      tagComponent,
      onChange,
      saveArticle,
      save,
      getFileKey,
      inCrement: () => store.commit('increment')
    }
  }
})
</script>

<style lang="less" scoped>
.wrap-img {
  width: 190px;
  height: 105px;
  flex-shrink: 0;
  margin-right: 20px;
  border-radius: 3px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    border: 1px solid #f0f0f0;
  }
}
</style>
