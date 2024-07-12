import request from '@/utils/request';
export default {
	// 获取代码列表
	getCodeList(data) {
		return request({
			url: '/api/code/getCodeList',
			method: 'post',
			data,
		});
	},

	// 获取代码
	getCode(data) {
		return request({
			url: '/api/code/getCode',
			method: 'post',
			data,
		});
	},
};