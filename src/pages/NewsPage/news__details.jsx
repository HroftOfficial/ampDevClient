import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ReactHtmlParser from 'html-react-parser';
import NewsService from '../../services/NewsService';
import config from '../../settings/settings';
import { af } from 'date-fns/locale';

const NewsDetails = () => {
	const navigate = useNavigate();

	const { id } = useParams();
	const [item, setItem] = useState(null);
	const [img, setImg] = useState('');

	useEffect(() => {
		getItemNews(id);
	}, []);

	async function getItemNews(id) {
		try {
			const response = await NewsService.fetchItemNews(id);
			setImg(response.data?.news_url[0]?.filename);
			setItem(response?.data);
			// console.log('rd',response.data);

			// const textPlace = document.getElementById('text-place').
			// textPlace.innerHtml=`${item.details}`
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<>
			<div className="md:py-16">
				{item ? (
					<div
						className="max-w-2xl md:max-w-3xl lg:px-0 
					lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto pb-8"
					>
						<div className="px-10">
							<button
								onClick={() => navigate(-1)}
								className="mx-auto lg:mx-0 text-white rounded-md bg-green-450 my-4 py-2
						px-8 shadow-lg text-2xl focus:outline-none  
						focus:shadow-outline transform transition 
						hover:scale-105 duration-300 ease-in-out"
							>
								Назад
							</button>
						</div>

						<div className="flex justify-center items-center">
							<img
								src={`${config?.baseUrlUpload}/uploads/news/${img}`}
								alt="news-image"
								className="object-contain w-auto"
							/>
						</div>

						<div className="flex-col justify-center items-center text-gray-850">
							<h1 className="block text-xl py-6 md:py-12 md:text-2xl xl:text-2xl font-bold text-center">
								{item?.title}
							</h1>

							<p
								className="inline-block text-gray-450 p-4 md:border-l-4 md:border-red-500 customLink"
								id="text-place"
							>
								{ReactHtmlParser(item?.details)}
							</p>

							{/* <span className="block text-right px-8 text-gray-400">
					{new Date(item?.date).toLocaleDateString('ru-RU')}
					</span> */}
						</div>
					</div>
				) : null}
			</div>
		</>
	);
};

export default observer(NewsDetails);
