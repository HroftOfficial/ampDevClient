// import axios from '../api/axios';
import $api from '../http';
// import useAuth from '../hoc/useAuth';
import config from "../settings/settings";
import { useContext } from 'react';
import { AuthContext } from '../hoc/AuthProvider';

const {baseUrl} = config;

const useRefreshToken = () => {
	// const { setAuth } = useAuth();
	const {store, setAuth} = useContext(AuthContext);

	const refresh = async () => {
		// const response = await $api.get('/users/refresh', {
		// 	withCredentials: true,
		// });
		const response = await $api.get(`${baseUrl}/users_amp/refresh`, {withCredentials: true})
		localStorage.setItem('token', response?.data?.accessToken);
		// console.log("useRefresh", response.data)
		setAuth((prev) => {
			return {
				...prev,
				fio: response.data?.user?.name,
				// roles: response.data.roles,
				accessToken: response.data?.accessToken,
				userId: response.data.user?._id,
			};
		});
		return response.data.accessToken;
	};
	return refresh;
};

export default useRefreshToken;
