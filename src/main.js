import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const app = createApp(App);

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// app.use(ElementPlus);
// 注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
// 国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
app.use(ElementPlus, {
	locale: zhCn,
});

// 全局组件注册
import myComponent from '@/components/index';
Object.keys(myComponent).forEach((key) => {
	app.component(key, myComponent[key]);
});

// 路由
import router from '@/router';
app.use(router);

// 配置全局api
import api from '@/api';
app.config.globalProperties.$api = api;

// pinia
import {
	createPinia,
} from 'pinia'
const pinia = createPinia()
// 持久化存储
import {
	createPersistedState
} from 'pinia-plugin-persistedstate';
pinia.use(
	createPersistedState({
		auto: true, // 启用所有 Store 默认持久化
	}),
);
app.use(pinia)

app.mount('#app')