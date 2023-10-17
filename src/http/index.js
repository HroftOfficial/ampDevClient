import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config  from '../settings/settings';

export const API_URL = config?.baseUrl


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})


$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/users_amp/refresh`, {withCredentials: true})
            localStorage.setItem('token', response?.data?.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            // useNavigate('/logout')
            localStorage.removeItem('token')
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export default $api;
