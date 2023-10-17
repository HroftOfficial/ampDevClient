export const parseLocalStorage = (key) => {
	let result = [];
	try {
		result = JSON.parse(localStorage.getItem(key)) || [];
	} catch (error) {
		result = [];
		console.log(error);
	}
	return result;
};
