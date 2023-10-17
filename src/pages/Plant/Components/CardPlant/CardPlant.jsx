import { Link } from 'react-router-dom';
import PlantNewService from '../../../../services/PlantNewService';
import config from '../../../../settings/settings';
import star from '../../../../img/star.svg';
import starActive from '../../../../img/star-active.svg';

import classes from './CardPlant.module.css';

const { baseUrlUpload } = config;

const CardPlant = ({
	info,
	index_photo,
	number,
	name,
	id,
	isFavorite,
	favoriteId,
	setFavoriteId,
	photo_plant,
	isAuth,
}) => {
	const handleStar = (e) => {
		const number = e.target.id;
		if (isAuth) {
			if (!favoriteId.includes(id)) {
				const addFavoritePlant = async () => {
					setFavoriteId((state) => [...state, number]);
					// console.log('Add to favotive >> ', number)
					const resp = await PlantNewService.addFavorite({
						favorite: number,
					});
					// console.log('favorite >>>', resp)
				};
				addFavoritePlant();
			} else {
				const deleteFavoritePlant = async () => {
					const arr = favoriteId.slice();
					const index = arr.indexOf(number);
					arr.splice(index, 1);

					setFavoriteId(arr);
					// console.log('Delete from favorite >> ', number)

					const resp = await PlantNewService.deleteFavorite({
						favorite: number,
					});
					// console.log(resp)
				};
				deleteFavoritePlant();
			}
		} else {
			if (!favoriteId?.includes(id)) {
				// addFavorite(number);
				const arr = JSON.parse(localStorage.getItem('plants') || '[]');
				setFavoriteId((prevState) => [...prevState, number]);
				localStorage.setItem('plants', JSON.stringify([...arr, number]));
				// setFavoriteId((state) => [...state, number]);
			} else {
				// deleteFavorite(number);
				const arr = JSON.parse(localStorage.getItem('plants') || '[]');
				setFavoriteId(favoriteId.filter((el) => el !== number));
				localStorage.setItem(
					'plants',
					JSON.stringify(arr.filter((el) => el !== number))
				);
			}
		}
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.cardImg}>
				<img
					src={`${baseUrlUpload}/uploads/plant_ap/thumb/${
						photo_plant[index_photo || 0]?.filename
					}`}
					alt="img"
					className={classes.plant}
				/>
				<img
					src={isFavorite ? starActive : star}
					alt="star"
					className={classes.cardStar}
					onClick={handleStar}
					id={id}
				/>
			</div>
			<div className={classes.number}>{number}</div>

			<Link to={`/plant/details/${id}`} className={classes.link}>
				<div className={classes.name}>{name}</div>
				<div className={classes.details}>{info}</div>
				<div className={classes.more}>подробнее</div>
			</Link>
		</div>
	);
};

export default CardPlant;
