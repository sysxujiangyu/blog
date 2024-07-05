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

const getCode = async () => {
	code.getCode({
		id: routeParams.id,
	}).then((result) => {
		htmlCode.value = result.data.html;
		cssCode.value = result.data.css;
		jsCode.value = result.data.js;
	});
}
getCode()






// import { WebContainer } from '@webcontainer/api';
// 通过数据查找返回回显字符串


// 插入字段
// const insertEntity = (value, option)=>{
//   let row = toRaw(option[0])
//   if(!row || row.parentId == 0){
//       return 
//   }
//   let info = `{${row.parentUuid}.${row.code}}`
//   $codeEdit.value.insertInfo(info) 
//   fieldShow.value = false
// } 

// // Call only once
// const webcontainerInstance = await WebContainer.boot();
// const nodeVersion = await webcontainerInstance.spawn('node', ['--version']);
// nodeVersion.output.pipeTo(
//   new WritableStream({
//     write: (chunk) => {
//       console.log(chunk, 'this is the chunk');
//     }
//   })
// )
// await webcontainerInstance.mount({
//     'index.js':{
//         file:{
//             contents:`console.log('hello world')`
//         }
//     }
// })
// // 文件系统
// // webcontainerInstance.fs
// const fsProcess = await webcontainerInstance.spawn('node', ['index.js']);
// fsProcess.output.pipeTo(
//   new WritableStream({
//     write: (chunk) => {
//       console.log(chunk, 'this is the chunk');
//     }
//   })
// )
</script>

<style lang="scss" scoped> 

</style>