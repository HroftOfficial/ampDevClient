import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdCard from '../../pages/reklama/CardAd';
import dataReklama from '../../pages/reklama/reklamaState';
import Orders from '../../services/Orders';
import Draft from './Draft';

const DraftList = ({ data, pageFromUrl, reklama }) => {
	// console.log(data)
	const newData = [...data];
	// console.log(newData)
	// console.log(reklama)

	if (pageFromUrl !== 'favorite') {
		reklama.forEach((item, index) => {
			// console.log(item)
			if (item.card_place !== 0 && item.enabled) {
				newData.splice(item.card_place - 1, 0, item);
			}
		});
	}

	// console.log(newData);

	const [ready, setReady] = useState(true);
	const [favoriteId, setFavoriteId] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await Orders.getFavorite();
				const currentData = response?.data;

				// console.log('Resp favorite >> ', response)

				const arr = [];
				// response.data.forEach((item) => {
				//   arr.push(item._id)
				// })

				currentData?.map((item) => {
					arr.push(item._id);
				});

				setFavoriteId(arr);

				setReady(true);
			} catch (e) {
				console.error(e);
			} finally {
				setReady(true);
			}
		})();
	}, []);

	return (
		<Body>
			{ready && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{/* <AdCard/> */}

					{newData.map((p, index) => {
						const isFavorite = favoriteId.includes(p._id);
						// console.log(isFavorite)
						// console.log(p)
						return (
							<Draft
								key={p._id}
								title={p.title}
								id={p._id}
								number={p.number}
								details={p.details}
								photo_url={p.photo_url}
								description={p.description}
								overlay={p.overlay}
								preview_url={p.preview_url}
								card_text={p.card_text}
								index_photo={p.index_photo}
								pageFromUrl={pageFromUrl}
								isFavorite={isFavorite}
								favoriteId={favoriteId}
								setFavoriteId={setFavoriteId}
								reklama={reklama}
							/>
						);
					})}
				</div>
			)}
		</Body>
	);
};

export default DraftList;

const Body = styled.div`
	@media screen and (max-width: 710px) {
		display: none;
	}
`;
