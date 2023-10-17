import axios from 'axios';
import $api from '../http';
import config from '../settings/settings';

const API_URL = config?.baseUrl;

export default class PlantNewService {
	/**
	 *
	 * TODO
	 * получить все основные группы оборудования
	 */
	static async fetchPlantNewMainGroups() {
		return await axios.get(`${API_URL}/main_plant/cl`);
	}
	/**
	 *
	 * TODO
	 * получить все группы оборудования
	 */
	static async fetchPlantNewGroup() {
		const result = axios.get(`${API_URL}/plant_group_ap/cl`);
		return result;
	}

	static async fetchPlantToUrl(selectGroup, checkedGroup, currentPage) {
		const data = {
			mainGroup: selectGroup,
			plantGroups: checkedGroup,
		};
		return await axios.post(`${API_URL}/plant_ap/${currentPage}`, data);
	}

	/**
	 *
	 * TODO
	 * получить оборудованиe USER
	 */
	static async getPlantsUser() {
		const result = await $api.get('/plant_ap/client');
		return result;
	}

	/**
	 * TODO
	 * получить оборудование по его ID
	 */
	static async fetchItemPlant(id) {
		const result = await axios.get(`${API_URL}/plant_ap/client/${id}`);
		return result;
	}

	// static async fetchItemPlantAuth(id) {
	// 	const result = await $api.get(`/plant_ap/client_auth/${id}`);
	// 	return result;
	// }

	/**
	 * TODO
	 * создать новуое оборудование
	 */
	static async createPlant(data) {
		return await $api.post('/plant_ap/add_plant_profile', data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}
	/**
	 * TODO
	 * обновляем оборудование
	 */
	static async updatePlant(data, id) {
		return $api.post(`plant_ap/update_plant_profile/${id}`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	/**
	 * TODO
	 * удалить/ восстановить оборудование
	 */
	static async deletePlant(id) {
		return await $api.delete(`/plant_ap/profile/${id}`);
	}
	static async restorePlant(id) {
		return await $api.post(`/plant_ap/profile/${id}`);
	}

	/**
	 * TODO
	 * получить избранное оборудование
	 */
	static async getFavorite() {
		return await $api.get('/plant_ap/get_favorite');
	}

	static async addFavorite(data) {
		return await $api.post(`/plant_ap/add_favorite`, data);
	}

	static async deleteFavorite(data) {
		return await $api.post(`/plant_ap/delete_favorite`, data);
	}
	///messages/first
	static async firstMessage(data) {
		return await $api.post('messages/first', data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}
	/**
	 * TODO
	 * Удалить имеющиеся файлы при редактировании
	 * */
	static async deletePlantFile(id, data) {
		return await $api.post(`plant_ap/deletefc/${id}`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}
}
