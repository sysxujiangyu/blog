<template>
	<!-- 路由出口 -->
	<!-- 路由匹配到的组件将渲染在这里 -->
	<router-view v-if="isRouterActive" />
	<!-- <layout /> -->
</template>
<script setup>
import { provide, nextTick, ref } from 'vue';
const isRouterActive = ref(true);
provide('reload', () => {
	isRouterActive.value = false;
	nextTick(() => {
		isRouterActive.value = true;
	});
});
</script>