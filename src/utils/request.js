import axios from 'axios';
import {
	ElMessage,
	ElMessageBox
} from 'element-plus';
// import store from '@/store';
import {
	localStorage
} from '@/utils/storage';
import {
	showLoading,
	hideLoading
} from "./loading";
// 创建axios实例
const service = axios.create({
	baseURL: import.meta.env.VITE_APP_SERVICE_API,
	timeout: 50000, // 请求超时时间：50s
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
});

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		// showLoading()
		if (!config.headers) {
			throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
		}
		return config;
	},
	(error) => {
		// hideLoading()
		return Promise.reject(error);
	},
);

// 响应拦截器
service.interceptors.response.use(
	(response) => {
		const res = response.data;
		const {
			code,
			msg,
			error
		} = res;
		if (code === 1) {
			// hideLoading()
			return res;
		} else {
			// token过期
			if (code === 101) {
				handleError();
			} else {
				ElMessage({
					message: error || '系统出错',
					type: 'error',
					duration: 5 * 1000,
				});
			}
			// hideLoading()
			return Promise.reject(new Error(error || 'Error'));
		}
	},
	(error) => {
		// hideLoading()

		console.log('请求异常：', error);
		const {
			msg
		} = error.response.data;

		// 未认证
		if (error.response.status === 101) {
			handleError();
		} else {
			ElMessage({
				message: '网络异常，请稍后再试!',
				type: 'error',
				duration: 5 * 1000,
			});
			return Promise.reject(new Error(msg || 'Error'));
		}
	},
);

// 统一处理请求响应异常
function handleError() {
	// hideLoading()
}

// 导出实例
export default service;