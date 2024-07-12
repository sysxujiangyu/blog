<template>
	<div>
		<li v-for="item in codeLists" @click="getCode(item.id)">{{ item.title }}</li>
		<el-pagination
			background
			layout="prev, pager, next"
			:total="count"
			page-size="10"
			@size-change="changePage"
			@current-change="changePage"
			@prev-click="changePage"
			@next-click="changePage"
		/>
	</div>
	<div v-if="codeEditor" class="code-box">
		<CodeEditor
			close
			@close="codeEditorClosed"
			@htmlChange="handleHtmlCodeChange"
			@cssChange="handleCssCodeChange"
			@jsChange="handleJsCodeChange"
			:htmlCode="htmlCode"
			:cssCode="cssCode"
			:jsCode="jsCode"
		/>
	</div>
</template>
<script setup>
import { onMounted, getCurrentInstance } from 'vue';
import code from '@/api/public/code.js';
const route = useRoute();
const routeParams = route.params;
let codeLists = ref([]);
let count = ref(0);
let htmlCode = ref('');
let cssCode = ref('');
let jsCode = ref('');
let codeEditor = ref(false);
const changePage = (e) => {
	getCodeList(e);
};
const handleHtmlCodeChange = (code) => {
	htmlCode.value = code;
};
const handleCssCodeChange = (code) => {
	cssCode.value = code;
};
const handleJsCodeChange = (code) => {
	jsCode.value = code;
};
const getCodeList = async (page) => {
	code.getCodeList({
		page
	}).then((result) => {
		codeLists.value = result.data.list;
		count.value = result.data.count;
	});
};
getCodeList(1);
const getCode = async (id) => {
	codeEditor.value = true;
	code.getCode({
		id
	}).then((result) => {
		htmlCode.value = result.data.html;
		cssCode.value = result.data.css;
		jsCode.value = result.data.js;
	});
};
// getCode(routeParams.id);
const codeEditorClosed = () => {
	codeEditor.value = false;
};
</script>

<style lang="scss" scoped>
.code-box {
	z-index: 100;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
}
</style>
