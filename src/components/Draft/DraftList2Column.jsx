import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Orders from '../../services/Orders';
import Draft from './Draft';

const DraftList2Column = ({ data, pageFromUrl, reklama, vidList }) => {
	const newData = [...data];

	if (pageFromUrl !== 'favorite') {
		reklama.forEach((item, index) => {
			if (item.card_place !== 0 && item.enabled) {
				if (item.card_place > 4) {
					newData.splice(item.card_place - 4, 0, item);
				} else {
					newData.splice(item.card_place - 1, 0, item);
				}
			}
		});
	}

	const [ready, setReady] = useState(true);
	const [favoriteId, setFavoriteId] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await Orders.getFavorite();
				const currentData = response?.data;
				// console.log('Resp favorite >> ', response)

				const arr = [];
				// response?.data?.forEach((item) => {
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
			{/* <AdCard/> */}

			{ready &&
				newData.map((p, index) => {
					// console.log(p)

					const isFavorite = favoriteId.includes(p._id);
					// console.log(isFavorite)
					return (
						<Draft
							index_photo={p.index_photo}
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
							pageFromUrl={pageFromUrl}
							isFavorite={isFavorite}
							favoriteId={favoriteId}
							setFavoriteId={setFavoriteId}
							reklama={reklama}
							vidList={vidList}
						/>
					);
				})}
		</Body>
	);
};

export default DraftList2Column;

const Body = styled.div`
	// columns: 2;

	@media screen and (min-width: 711px) {
		display: none;
	}
`;
