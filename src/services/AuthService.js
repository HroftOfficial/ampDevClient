import $api from '../http';

export default class AuthService {
	static async login(email, password) {
		// console.log('$api', $api)
		return $api.post('/users_amp/login', { email, password });
	}

	static async logout() {
		return $api.post('/users_amp/logout');
	}

	static async getUserInfo() {
		return await $api.get('/users_amp');
	}
	//отправка на почту
	static async postChangePassword(data) {
		return await $api.post('/users_amp/change_password', data);
	}
	//отправка на почту для юзера с профиля
	static async postUserNewPassword(data) {
		return await $api.post('/users_amp/new_password_profile', data);
	}

	//самостоятельная смена пароля
	static async postNewPassword(data) {
		return await $api.post('/users_amp/new_password_url', data);
	}
}
