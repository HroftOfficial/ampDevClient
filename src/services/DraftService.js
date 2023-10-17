import $api from '../http';
export default class DraftService {
	static async fetchItemDraft(id) {
		return await $api.get(`/draft/detail/${id}`);
	}

	static async fetchItemDraftTelegram(id) {
		return await $api.get(`/draft/get_telegram/${id}`);
	}

	static async getMechData() {
		return await $api.get('/draft/meh');
	}

	static async sendZvk(data) {
		return await $api.post('/draft/send', data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	///messages/first
	static async firstMessage(data) {
		return await $api.post('messages/first', data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	static async fetchDraftToUrl(currentPage, value, query, filters, limit) {
		const data = {
			currentPage,
			category: value,
			search: query,
			filters,
			limit,
		};
		return await $api.post(`/draft`, { data });
	}

	static async fetchDraftToFind(currentPage, data) {
		return await $api.post(`/info/get_info/${currentPage}/6`, { data });
	}

	//autofind
	static async autoFind(currentPage) {
		const data = {
			currentPage,
			limit: 11,
		};
		return await $api.post(`draft/auto_find`, data);
	}

	// static async getOpenDraft(currentPage, value, query, filters, limit) {
	//   const data = {
	//     currentPage,
	//     category: value,
	//     search: query,
	//     filters,
	//     limit,
	//   };
	//   return await $api.post(`/draft/share`, { data });
	// }
}
