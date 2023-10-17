import { Link } from 'react-router-dom';
import styled from 'styled-components';
import config from '../../settings/settings';
import AdCard from '../../pages/reklama/CardAd';
import star from '../../img/star.svg';
import starActive from '../../img/star-active.svg';
import Orders from '../../services/Orders';

const Draft = (props) => {
	// console.log(props)
	const handleStar = (e) => {
		const number = e.target.id;

		if (!props.favoriteId.includes(`${props.id}`)) {
			(async () => {
				props.setFavoriteId((state) => [...state, number]);
				// console.log('Add to favotive >> ', number)
				const resp = await Orders.addFavorite({ favorite: number });
				// console.log('favorite >>>', resp)
			})();
		}

		if (props.favoriteId.includes(`${props.id}`)) {
			(async () => {
				const arr = props.favoriteId.slice();
				const index = arr.indexOf(number);
				arr.splice(index, 1);

				props.setFavoriteId(arr);
				// console.log('Delete from favorite >> ', number)

				const resp = await Orders.deleteFavorite({ favorite: number });
				// console.log(resp)
			})();
		}
	};

	return (
		<>
			{props.number ? (
				<Card>
					<div className="card-img">
						<img
							src={`${config?.baseUrlUpload}/uploads/tumb/${
								props.photo_url[props.index_photo || 0]?.filename
							}`}
							alt="card"
							className="draft"
						/>
						<img
							className="card-star"
							src={props.isFavorite ? starActive : star}
							alt=""
							onClick={handleStar}
							id={props.id}
						/>
					</div>

					<div className="number">{props.number}</div>

					<Links to={`/draft/${props.pageFromUrl}/details/${props.id}`}>
						<div className="title">{props.title}</div>
						<div className="details">{props.details}</div>
						<div className="more">Подробнее</div>
					</Links>
				</Card>
			) : (
				<AdCard
					photo={props.photo_url}
					isFavorite={props.isFavorite}
					number={props.number}
					link={props.pageFromUrl}
					preview_url={props.preview_url}
					title={props.title}
					details={props.description}
					more={props.more}
					id={props.id}
					overlay={props.overlay}
					card_text={props.card_text}
				/>
			)}
		</>
	);
};

export default Draft;

const Links = styled(Link)`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;

	.title {
		display: flex;
		font-weight: 500;
		text-align: center;
		margin-top: 38px;
		max-height: 55px;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2; /* количество строк */
		-webkit-box-orient: vertical;
		display: -webkit-box;
	}

	.details {
		display: flex;
		text-align: center;
		font-weight: 300;
		font-size: 14px;
		margin-top: 15px;
		max-height: 45px;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2; /* количество строк */
		-webkit-box-orient: vertical;
		display: -webkit-box;
	}

	.more {
		display: flex;
		font-weight: 300;
		font-size: 18px;
		text-align: center;
		text-decoration-line: underline;
		color: #bfbfbf;
		margin-top: 22px;
	}
`;

const Card = styled.div`
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #f6f6f6;
	height: 440px;
	max-width: 368px;
	-webkit-box-shadow: 0px 0px 7px 4px rgba(34, 60, 80, 0.2);
	-moz-box-shadow: 0px 0px 7px 4px rgba(34, 60, 80, 0.2);
	box-shadow: 0px 0px 7px 4px rgba(34, 60, 80, 0.2);
	position: relative;

	font-family: 'Roboto', sans-serif;
	font-weight: 400;
	font-size: 18px;
	color: #333333;

	.number {
		display: flex;
		width: 86px;
		height: 36px;
		background: #333333;
		border-radius: 5px;
		position: absolute;
		top: calc(50% - 18px);
		left: calc(50%-43px);
		justify-content: center;
		font-family: 'Roboto';
		font-weight: 500;
		font-size: 24px;
		line-height: 28px;
		align-items: center;
		color: #ffffff;
	}

	.line {
		text-decoration: underline;
	}

	@media screen and (max-width: 639px) {
		max-width: 380px;
	}

	@media screen and (max-width: 711px) {
		margin-bottom: 12px;
		border-radius: 10px;
		-webkit-box-shadow: 0px 0px 5px 0px rgba(34, 60, 80, 0.3);
		-moz-box-shadow: 0px 0px 5px 0px rgba(34, 60, 80, 0.3);
		box-shadow: 0px 0px 5px 0px rgba(34, 60, 80, 0.3);
	}

	.card-img {
		position: relative;
		overflow: hidden;
		height: 50%;

		.draft {
			/* height: 100%; */
			/* object-fit: cover; */
			/* width: auto; */
			width: 400px;
			height: 100%;
			object-fit: cover;

			@media screen and (max-width: 480px) {
				object-fit: cover;
				height: 100%;
				/* width: 100%; */
			}
		}

		.card-star {
			position: absolute;
			top: 20px;
			right: 20px;
			cursor: pointer;
			height: 30px;
		}
	}
`;
