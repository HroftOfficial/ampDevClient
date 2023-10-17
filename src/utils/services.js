import axios from 'axios';
import config from '../settings/settings';
import $api from '../http';

const { baseUrl, filesUrl } = config;

export const postRequest = async (url, body) => {
	// let isMounted = true;
	// console.log('post body >> ', url, body);
	const controller = new AbortController();
	try {
		const response = await $api.post(`${baseUrl}/${url}`, body, {
			signal: controller.signal,
		});
		// console.log('post body response >> ', response);

		return response.data;
		// isMounted && return response;
	} catch (error) {
		console.log(error);
		return error;
	} finally {
		// isMounted = false;
		controller.abort();
	}
};

export const getRequest = async (url) => {
	// let isMounted = true;
	// console.log(`${BASE_URL}/${url}`)
	const controller = new AbortController();
	try {
		const response = await $api.get(`${baseUrl}/${url}`, {
			signal: controller.signal,
		});
		// isMounted &&
		// console.log("rd getRequest ",url,response.data)
		return response.data;
	} catch (error) {
		console.log(error);
		return error;
	} finally {
		// isMounted = false;
		controller.abort();
	}
};

export const postFiles = async (data) => {
	// let isMounted = true;
	const controller = new AbortController();
	try {
		const response = await axios.post(`${filesUrl}/files/multiple`, data, {
			signal: controller.signal,
		});

		return response;
		// isMounted && return response;
	} catch (error) {
		console.log(error);
		return error;
	} finally {
		// isMounted = false;
		controller.abort();
	}
};

// export const getFiles = async (name) => {
// 	// let isMounted = true;
// 	// console.log(`${BASE_URL}/${url}`)
// 	const controller = new AbortController();
// 	try {
// 		const response = await axios.get(`${filesUrl}/files/${name}`, {
// 			signal: controller.signal,
// 		});
// 		// isMounted &&
// 		// console.log("rd getRequest ",url,response.data)
// 		return response;
// 	} catch (error) {
// 		console.log(error);
// 		return error;
// 	} finally {
// 		// isMounted = false;
// 		controller.abort();
// 	}
// };

export const textUrl = (urlString) => {
	const urlPattern =
		/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
	const result = !!urlPattern.test(urlString);
	// console.log('textUrl', urlString, result);
	return Boolean(result);
};

export const getTextByCount = (count, words) => {
	const value = Math.abs(Number(count)) % 100;
	const num = value % 10;
	let str = `${count}\u00A0`;

	if (value > 10 && value < 20) str += words[2];
	else if (num > 1 && num < 5) str += words[1];
	else if (num === 1) str += words[0];
	else str += words[2];

	return str;
};

export const getTagByCount = (count) =>
	getTextByCount(count, ['тег', 'тега', 'тегов']);

// module.exports = {postRequest, getRequest}
