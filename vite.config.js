import * as path from 'path';
import vue from '@vitejs/plugin-vue'
import { defineConfig,loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import ReactivityTransform from '@vue-macros/reactivity-transform/vite';
import {generateCNAMEPlugin,generateNginxPlugin} from './src/utils/vite-plugin-generate';
// https://vitejs.dev/config/
export default defineConfig(({
  mode
}) => {
  // 获取`.env`环境配置文件
	const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
			vue(),
			ReactivityTransform(), // 启用响应式语法糖 $ref ...
			// 解决 `import { ref , reactive ..... } from 'vue'` 大量引入的问题
			AutoImport({
				imports: ['vue', 'vue-router'],
			}),
			// 生成 CNAMEW 文件
			generateCNAMEPlugin({
				content: 'blog.xujiangyu.com', // 替换为你的域名
			}),
			// 生成 Nginx 配置文件
			generateNginxPlugin(),
		],
    // 反向代理解决跨域问题
		server: {
		headers:{
			'Cross-Origin-Embedder-Policy': 'require-corp',
			// 支持 SharedArrayBuffer
		},
		// host: 'localhost', // 只能本地访问
		host: '0.0.0.0', // 局域网别人也可访问
		// port: Number(env.VITE_APP_PORT),
		// 运行时自动打开浏览器
		open: false,
		proxy: {
			// [env.VITE_APP_BASE_API]: {
			// 	target: env.VITE_APP_SERVICE_API,
			// 	changeOrigin: true,
			// 	rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
			// },
		},
		},
    resolve: {
      // 配置路径别名
      alias: [
        // @代替src
        {
          find: '@',
          replacement: path.resolve('./src'),
        },
      ],
    }
  }
})
  // plugins: [vue()],
