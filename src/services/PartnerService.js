import axios from 'axios';
import $api from '../http';
import config from '../settings/settings';

const API_URL = config?.baseUrl;

export default class PartnerService {
	static async fetchPartner(page, items) {
		return await axios.get(`${API_URL}/users_amp/partners/${page}/${items}`);
	}

	static async getUsersToms() {
		return await $api.get('users_amp/find_user');
	}

	static async postPartnersRequest(page, items, queryValue, selected) {
		const data = {
			query: queryValue,
			category: selected,
		};
		return await $api.post(`users_amp/find_user/${page}/${items}`, data);
	}

	static async getUserInfo(id) {
		return await $api.get(`users_amp/users_portal/${id}`);
	}
}
