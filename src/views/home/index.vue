<template>
	<CodeEditor 
		@htmlChange="handleHtmlCodeChange" 
		@cssChange="handleCssCodeChange" 
		@jsChange="handleJsCodeChange" 
		:htmlCode="htmlCode" 
		:cssCode="cssCode" 
		:jsCode="jsCode"
	/>
</template>
<script setup>
import { onMounted, getCurrentInstance } from "vue";
import code from '@/api/public/code.js';
const route = useRoute();
const routeParams = route.params;
let htmlCode = ref('');
let cssCode = ref('');
let jsCode = ref('');  
const handleHtmlCodeChange = (code) => {
	htmlCode.value = code
}
const handleCssCodeChange = (code) => {
	cssCode.value = code
}
const handleJsCodeChange = (code) => {
	jsCode.value = code
}

const getCode = async (id) => {
	code.getCode({
		id,
	}).then((result) => {
		htmlCode.value = result.data.html;
		cssCode.value = result.data.css;
		jsCode.value = result.data.js;
	});
}
getCode(routeParams.id)

</script>

<style lang="scss" scoped> 

</style>