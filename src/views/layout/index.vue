<template>
	<router-view v-slot="{ Component }">
        <transition name="fade">
            <!-- 渲染layout一级路由组件的子路由 -->
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script setup>
import { useRouter } from 'vue-router';
import screenfull from 'screenfull';
const { proxy } = getCurrentInstance();
// 获取路由对象
let $router = useRouter();
let apiUrl = import.meta.env.VITE_APP_SERVICE_API;
let breadList = $ref([]);
// 点击菜单的回调
const goRoute = (vc) => {
	// 路由跳转
	$router.push(vc.index);
};
const updateBread = () => {
	// 修改面包屑
	breadList = [];
	$router.currentRoute.value.matched.forEach(function (item) {
		breadList.push({ title: item.meta.title, path: item.path });
	});
};
// 监听路由变化
watch(
	() => $router.currentRoute.value.fullPath,
	(toPath) => {
		//要执行的方法
		updateBread();
	},
	{ immediate: true, deep: true },
);

let isCollapse = $ref(true);
let isScreenfull = $ref(false);
const editableTabs = $ref([
	{
		title: 'Tab 1',
		name: '1',
		content: 'Tab 1 content',
	},
	{
		title: 'Tab 2',
		name: '2',
		content: 'Tab 2 content',
	},
]);
// 全屏点击
const onScreenfullClick = () => {
	if (!screenfull.isEnabled) {
		this.$message.warning('暂不不支持全屏');
		return false;
	}
	screenfull.toggle();
	screenfull.on('change', () => {
		if (screenfull.isFullscreen) isScreenfull = true;
		else isScreenfull = false;
	});
};
</script>

<style lang="scss" scoped>
a {
	text-decoration: none;
	color: black;
}
</style>
