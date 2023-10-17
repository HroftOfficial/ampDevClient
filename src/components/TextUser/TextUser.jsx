import React, { useEffect, useState } from 'react';
import InfoService from '../../services/InfoService';

const TextUser = () => {
	const [info, setInfo] = useState([]);

	useEffect(() => {
		getInfo();
	}, []);

	async function getInfo() {
		try {
			const response = await InfoService.fetchInfo();
			setInfo(response?.data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<h1 className="text-base text-center text-black md:text-2xl xl:text-4xl font-bold">
			За пять лет работы у нас
			<span className="text-green-450 px-4">{info.allUser}</span>
			участников и партнеров
		</h1>
	);
};

export default TextUser;
