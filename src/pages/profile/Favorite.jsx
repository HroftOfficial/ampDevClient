import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DraftList } from '../../components/Draft/DraftList/DraftList';
import Orders from '../../services/Orders';

const Favorite = () => {
	const [draft, setDraft] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		getFavoritePage();
	}, []);

	async function getFavoritePage() {
		try {
			setIsLoading(true);
			const response = await Orders.getFavorite();
			setIsLoading(false);
			// console.log('log resp favorite',response?.data)
			setDraft(response?.data);
		} catch (e) {
			console.error(e);
		}
	}

	const pageFromUrl = window.location.pathname.split('/').splice(-1, 1)[0];

	return (
		<Body>
			<div className="context-wrapper ">
				<h2>Избранное (заказы)</h2>
				<DraftList
					data={draft}
					pageFromUrl={pageFromUrl}
					isLoading={isLoading}
				/>
			</div>
		</Body>
	);
};

export default Favorite;

const Body = styled.section`
	display: flex;
	color: #333333;
	font-family: 'Roboto', sans-serif;
	font-style: normal;
	font-weight: 400;

	@media screen and (max-width: 1200px) {
		flex-direction: column;
	}

	.context-wrapper {
		display: flex;
		flex-direction: column;
		padding: 98px 66px 42px;
		max-width: 1200px;
		width: 100%;

		@media screen and (max-width: 1200px) {
			box-sizing: border-box;
		}

		@media screen and (max-width: 480px) {
			padding: 26px 16px;
		}

		h2 {
			font-weight: 500;
			font-size: 24px;
			margin-bottom: 20px;

			@media screen and (max-width: 480px) {
				margin: 0 auto 20px;
			}
		}
		.draftList {
			width: 80%;
		}
	}
`;
