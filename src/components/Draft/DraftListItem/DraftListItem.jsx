import { Link } from 'react-router-dom';
import config from '../../../settings/settings';
import AdCard from '../../../pages/reklama/CardAd';
import star from '../../../img/star.svg';
import starActive from '../../../img/star-active.svg';
import Orders from '../../../services/Orders';

import classes from './DraftListItem.module.css';

export const DraftListItem = (props) => {
	const handleStar = (e) => {
		const number = e.target.id;
		if (!props.favoriteId.includes(`${props.id}`)) {
			const addFavoriteDraft = async () => {
				props.setFavoriteId((state) => [...state, number]);
				// console.log('Add to favotive >> ', number)
				await Orders.addFavorite({ favorite: number });
				// console.log('favorite >>>', resp)
			};
			addFavoriteDraft();
		} else {
			const deleteFavoriteDraft = async () => {
				const arr = props.favoriteId.slice();
				const index = arr.indexOf(number);
				arr.splice(index, 1);

				props.setFavoriteId(arr);

				await Orders.deleteFavorite({ favorite: number });
			};
			deleteFavoriteDraft();
		}
	};
	if (!props.number) {
		return (
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
		);
	}

	return (
		<div className={classes.wrapper}>
			<div className={classes.cardImg}>
				<img
					src={`${config?.baseUrlUpload}/uploads/tumb/${
						props.photo_url[props.index_photo || 0]?.filename
					}`}
					alt="img"
					lassName={classes.draft}
				/>
				<img
					className={classes.cardStar}
					src={props.isFavorite ? starActive : star}
					alt="star"
					onClick={handleStar}
					id={props.id}
				/>
			</div>

			<div className={classes.number}>{props.number}</div>

			<Link className={classes.link} to={`/draft/details/${props.id}`}>
				<div className={classes.name}>{props.title}</div>
				<div className={classes.details}>{props.details}</div>
				<div className={classes.more}>Подробнее</div>
			</Link>
		</div>
	);
};
