import { useEffect, useState } from 'react';
import { PlantList } from '../../Plant/Components/PlantList/PlantList';
import PlantNewService from '../../../services/PlantNewService';

import classes from './FavoritePlants.module.css';

const FavoritePlants = () => {
	const [plants, setPlants] = useState([]);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		getFavoritePage();
	}, []);

	async function getFavoritePage() {
		try {
			setIsLoading(true);
			const response = await PlantNewService.getFavorite();
			setIsLoading(false);
			// console.log('log resp favorite',response?.data)
			setPlants(response?.data);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div className={classes.body}>
			<div className={classes.contextWrapper}>
				<h2>Избранное (объявления)</h2>
				<div className={classes.gridWrapper}>
					<PlantList data={plants} isLoading={isLoading} />
				</div>
			</div>
		</div>
	);
};

export default FavoritePlants;
