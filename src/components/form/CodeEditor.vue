<template>
  <div class="code-editor-box" :style="{'--code-box-width':codeBoxWidth + 'px'}">
    <div class="menu">
      <ul>
        <li :class="isHtml ? 'active':''" @click="menuCheck('html')">html</li>
        <li :class="isCss ? 'active':''" @click="menuCheck('css')">css</li>
        <li :class="isJs ? 'active':''" @click="menuCheck('js')">js</li>
        <li></li>
        <li @click="Run()">run</li>
      </ul>
    </div>
    <div class="code-box">
      <div class="item" 
        v-for="item in codeBoxs"
        :style="{height:codeBoxHeight+'%',display: item.isShow ? 'block' : 'none'}"
      >
        <div class="tag">{{ item.name }}</div>
        <Codemirror
          class="code"
          v-model="item.code"
          :style="{ height: '100%' }"
          :extensions="item.type"
          :autofocus="true"
          :disabled="props.disabled"
          @change="item.change"
        />
      </div>
      
    </div>
    <div class="output-box" >
      <div class="bar" 
        @mousedown="gtouchstart"
        @mousemove="gtouchmove"
        @mouseup="gtouchend"
        @mouseover="gtouchend"
        ></div>
      <!-- <iframe id="output" :src="'data:text/html;charset=utf-8,' + outputs"></iframe> -->
      <iframe id="output" src="" @load="iframeLoad"></iframe>
      
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
import { Codemirror } from "vue-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import generatePage from '@/utils/generatePage.js';
const gtouchstart = (e) => {
  isMove.value = true
}
const gtouchmove = (e) => {
  if(isMove.value){
    codeBoxWidth.value = e.clientX - 43
  }
  console.log(e.clientX, 'this is gtouchmove')
}
const gtouchend = (e) => {
  isMove.value = false
}
const props = defineProps({
  htmlCode: String,
  cssCode: String,
  jsCode: String,
  disabled: {type:Boolean,default:false},
  isHtml: {type:Boolean,default:true},
  isCss: {type:Boolean,default:true},
  isJs: {type:Boolean,default:true},
})
var outputs = ref();
var isHtml = ref(props.isHtml);
var isCss = ref(props.isCss);
var isJs = ref(props.isJs);
var isMove = ref(false)
var codeBoxWidth = ref(400);
var codeBoxHeight = ref((100 / 3).toFixed(2));
var _htmlCode = ref(props.htmlCode);
var _cssCode = ref(props.cssCode);
var _jsCode = ref(props.jsCode);
var _iframe = false
// 监听传入参数变化
watch(() => props.htmlCode, (newValue, oldValue) => {
  _htmlCode.value = newValue;
  Run();
});
watch(() => props.cssCode, (newValue, oldValue) => {
  _cssCode.value = newValue;
  Run();
});
watch(() => props.jsCode, (newValue, oldValue) => {
  _jsCode.value = newValue;
  Run();
});
const emit = defineEmits(['htmlChange', 'cssChange', 'jsChange', 'change'])
var handleHtmlChange = (value) => {
  _htmlCode.value = value;
  emit('htmlChange', value)
  Run();
}
var handleCssChange = (value) => {
  _cssCode.value = value;
  emit('cssChange', value)
  Run();
}
var handleJsChange = (value) => {
  _jsCode.value = value;
  emit('jsChange', value)
  Run();
}

const codeBoxs = ref([
  { name: "html", type:  [html(), oneDark], isShow:isHtml, code: _htmlCode, change:handleHtmlChange },
  { name: "css", type: [css(), oneDark], isShow:isCss, code: _cssCode, change:handleCssChange },
  { name: "js", type: [javascript(), oneDark], isShow:isJs, code: _jsCode, change:handleJsChange},
])
const menuCheck = (type) => {
  let _isHtml = isHtml.value;
  let _isCss = isCss.value;
  let _isJs = isJs.value;
  switch (type) {
    case 'html':
    _isHtml = !isHtml.value;
      break;
    case 'css':
    _isCss = !isCss.value;
      break;
    case 'js':
    _isJs = !isJs.value;
      break;
  }
  if(!_isHtml && !_isCss && !_isJs){
    return
  }
  isHtml.value = _isHtml;
  isCss.value = _isCss;
  isJs.value = _isJs;
  let _num = 0;
  _num += _isHtml ? 1 : 0
  _num += _isCss ? 1 : 0
  _num += _isJs ? 1 : 0
  codeBoxHeight = (100 / _num).toFixed(2)
}
const iframeLoad = () =>{
  var iframe = document.getElementById('output');
  var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
  _iframe = iframeWin.document;
}
const Run = () => {
  // const newHtml = generatePage(_htmlCode.value, _cssCode.value, _jsCode.value);
  // outputs.value = encodeURIComponent(newHtml);
  var codehtml = props.htmlCode;
  var codecss = "<style>" + _cssCode.value + "</style>";
  var codejs = "<script>" + _jsCode.value + "<script>";
  _iframe["open"]();
  _iframe["write"](codecss + codehtml + codejs);
  _iframe["close"]();
}
</script>
<style lang="scss" scoped>
.code-editor-box{
  $mW: 40px;
  $cw:var(--code-box-width);
  width:100%;
  height:100vh;
  display: flex;
  overflow-y: hidden;
  .menu{
    width:$mW;
    height:100%;
    background:#222222;
    padding-top: 20px;
    li{
      padding: 2px;
      color: #eeeeee73;
      background: #2F2F2F;
      font-size: 12px;
      transform:scale(0.8);
      height:30px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      justify-items: center;
      &:hover{
        background: #2c2e2f;
        opacity: .7;
        cursor: pointer;
      }
    }
    li.active{
      color: #fff;
    }
  }
  .code-box{
    width:$cw;
    min-width: 100px;
    height:100%;
    background:#000;
    .item{
      width:100&;
      position: relative;
      // height:var(codeBoxHeight);
      border:1px solid black;
      .tag{
        position: absolute;
        top: 10px;
        right:10px;
        border:1px solid #eeeeee5b;
        background: #282C34;
        color: #eeeeee5b;
        padding: 3px 10px;
        font-size: 12px;
        border-radius: 4px;
        z-index: 100;
        transition: opacity 1s; /* 设置动画效果，持续时间为1秒 */
        opacity: 1; /* 初始状态为可见 */
      }
    }
    .item:hover .tag{
        opacity: 0;
      }
  }

  .output-box{
    width:calc(100% - $mW - var(--code-box-width));
    // width: calc($mW + var(--code-box-width));
    height:100%;
    overflow: hidden;
    background: #111;
    display: flex;
    .bar{
      height:100vh;
      width: 6px;
      background:#2C2E2F;
    }
    .bar:hover{
      cursor:col-resize;
    }
    #output{
      width:calc(100% - 6px);
      height:100%;
      border:0;
    }
  }
  
}
/* 小于  1180（最小宽度） 隐藏右侧  和 页脚部分内容 */
@media screen and (max-width: 980px){
  .code-editor-box{
      display: block;
      overflow-y: scroll;
  }
  .code-box,.output-box{
    min-width:100%;
  }
  .menu,.code-box,.output-box{
    float: left;
  }
  .bar{
    display: hidden;
  }
  #output{
    width:100%;
    height:100%;
    border:0;
    padding: 10px;
  }
}
/* 自定义滚动条样式 */
div ::v-deep .cm-scroller {
  // background-color: #1d1f20;
   //滚动条整体部分
  &::-webkit-scrollbar{
    width: 14px;
    height: 14px;
    background-color: #2c2e2f;
  }
  //滚动条两端的按钮 
  &::-webkit-scrollbar-button{
    // display: hidden;
  }
  // 外层轨道
  &::-webkit-scrollbar-track{
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .8) inset;
  }
  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    border: 5px solid transparent;
  }
  //内层轨道，滚动条中间部分（除去）  
  &::-webkit-scrollbar-track-piece{
    width: 5px;
    height: 5px;
  }
  //滚动条里面可以拖动的那个 
  &::-webkit-scrollbar-thumb{
    min-height: 20px;
    background-clip: content-box;
    box-shadow: 0 0 0 5px rgb(115, 115, 115) inset;
  }
  //边角
  &::-webkit-scrollbar-corner{
    background: transparent;
  }
  ///定义右下角拖动块的样式
  // &::-webkit-resizer{

  // }
}
</style>
