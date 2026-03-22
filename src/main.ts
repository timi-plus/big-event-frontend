import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "@/router";
import { createPinia } from 'pinia'
//导入持久化插件
import {createPersistedState} from "pinia-persistedstate-plugin"
//导入element-plus中文包
import locale from 'element-plus/dist/locale/zh-cn.js'

const app = createApp(App);
const pinia = createPinia();
const persisted = createPersistedState();
app.use(ElementPlus,{locale});
app.use(router);
//使用持久化插件
pinia.use(persisted);
app.use(pinia);
app.mount('#app')
