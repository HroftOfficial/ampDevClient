import { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { AuthContext } from '../../../../hoc/AuthProvider';
import PlantNewService from '../../../../services/PlantNewService';
import { SkeletonCardPlant } from '../../../../components/Skeletons/SkeletonCardPlant/SkeletonCardPlant';
import { skeletonCost } from '../../../../utils/skeletonArr';
import { parseLocalStorage } from '../../../../utils/parseDataLocalStoradge';
import CardPlant from '../CardPlant/CardPlant';
import classes from './PlantList.module.css';

export const PlantList = observer(({ data, currectPage, isLoading }) => {
	const { store } = useContext(AuthContext);
	// const test = JSON.parse(localStorage.getItem('plants') || '[]');
	const test = parseLocalStorage('plants');
	const [favoriteId, setFavoriteId] = useState([...test]);

	useEffect(() => {
		const getFavoritePlant = async () => {
			if (store.isAuth) {
				try {
					const response = await PlantNewService.getFavorite();
					const currentData = response?.data;

					const arr = [];
					// response.data.forEach((item) => {
					//   arr.push(item._id)
					// })

					currentData?.map((item) => {
						arr.push(item._id);
					});

					setFavoriteId(arr);
				} catch (e) {
					console.error(e);
				}
			}
		};
		getFavoritePlant();
	}, []);

	// useEffect(() => {
	// 	localStorage.setItem('plants', JSON.stringify(store.favoritePlants));
	// }, [favoriteId]);

	if (isLoading) {
		return (
			<div className={classes.wrapper}>
				{skeletonCost(12).map((el) => {
					return <SkeletonCardPlant key={el} />;
				})}
			</div>
		);
	}
	if (!data || !data.length) {
		return (
			<>
				<p></p>
				<div className={classes.notFound}>
					По вашему запросу ничего не найдено
				</div>
			</>
		);
	}

	return (
		<div className={classes.wrapper}>
			{data?.map(({ name, _id, info, photo_plant, index_photo, number }) => {
				const isFavorite = favoriteId?.includes(_id);
				return (
					<CardPlant
						key={_id}
						info={info}
						name={name}
						id={_id}
						number={number}
						index_photo={index_photo}
						photo_plant={photo_plant}
						isFavorite={isFavorite}
						favoriteId={favoriteId}
						setFavoriteId={setFavoriteId}
						currectPage={currectPage}
						isAuth={store.isAuth}
					/>
				);
			})}
		</div>
	);
});
