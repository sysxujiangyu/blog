import {
	createRouter,
	createWebHistory,
	createWebHashHistory
} from 'vue-router';
const modulesFiles = import.meta.glob('./modules/*.*', {
	eager: true
});

import Layout from '@/views/layout/index.vue';
// 本地静态路由
let constantRoutes = [{
		path: '/',
		meta: {
			title: '首页',
			isParentView: true,
		},
		// component: () => Layout,
		// 这里要用懒加载，解决 部署后报 TypeError: u.then is not a function
		component: () => import('@/views/layout/index.vue'),
		redirect: '/home',
		children: [{
			path: 'home/:id?',
			component: () => import('@/views/home/index.vue'),
			name: 'home',
			meta: {
				title: '首页',
			}
		}]

	},
	{
		path: '/:pathMatch(.*)',
		redirect: '/',
	}
];
for (const key in modulesFiles) {
	constantRoutes.push(modulesFiles[key].default[0])
}
// 创建路由
let router = createRouter({
	history: createWebHistory(),
	// history: createWebHashHistory(),
	routes: constantRoutes,
});

export default router;