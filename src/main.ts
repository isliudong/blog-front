import {createApp} from 'vue'
import App from './App.vue'
import {key, store} from './store'
import router from "./router/routerConfig";
import service from "./utils/https";
import urls from "./utils/urls";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import VueMarkdownEditor from '\@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '\@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import $ from 'jquery/dist/jquery';
import 'font-awesome/css/font-awesome.min.css'
//import 'animate.css/animate.min.css'
import "./assets/css/index.css";
/*import VConsole from "vconsole";
const vConsole = new VConsole()*/


const app = createApp(App)


VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});


window.jQuery = window.$ = $;

app.config.globalProperties.$https = service;
app.config.globalProperties.$urls = urls;
app.use(ElementPlus)
app.use(store, key)
app.use(router)
app.use(VueMarkdownEditor);
app.mount('#app');
