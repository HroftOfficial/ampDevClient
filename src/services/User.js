import $api from '../http';

// PROFILE

export default class User {
	static async getUser() {
		return await $api.get(`/users_amp/get_user`);
	}
	static async updateUser(data) {
		return await $api.put(`/users_amp/update_user_portal`, data);
	}
	// static async updateUserPhoto(data) {
	//     return await $api.put(`/users_amp/update_user_logo`, data)
	// }
	static async getUsersToms() {
		return await $api.get(`/users_amp/tomskl`);
	}
	static async getUsersTomsUnWind() {
		return await $api.get(`/users_amp/tomsklunwind`);
	}
	static async postUsersToms(data) {
		return await $api.put(`/users_amp/update_meh_user`, data);
	}
	/**update last visit user */
	static async updateLastVisitUser() {
		return await $api.put('/users_amp/ulv');
	}
}
