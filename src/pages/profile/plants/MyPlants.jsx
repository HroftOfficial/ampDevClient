import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlantNewService from '../../../services/PlantNewService';
import useMediaQuery from '@mui/material/useMediaQuery';
import plusIco from '../../../img/plus-ico.svg';
import NavBarPlants from './components/NavBarPlants/NavBarPlants';
import { PlantCard } from './components/PlantCard/PlantCard';
import { tabs } from '../../../utils/profileTabs';
import { skeletonCost } from '../../../utils/skeletonArr';
import classes from './MyPlants.module.css';
import { Skeleton } from '@mui/material';

const MyPlants = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [plants, setPlants] = useState([]);
	// const [mainPlant, setMainPlant] = useState([]);
	const [filter, setFilter] = useState(tabs[0]);
	const matches = useMediaQuery('(min-width:1000px)');

	const navigate = useNavigate();

	const result = filter.config.shouldBeFiltered;

	const filteredPlant = result
		? plants?.filter(
				({ deleted, enabled }) =>
					deleted === filter.config.deleted && enabled === filter.config.enabled
		  )
		: plants;

	// console.log('afterF', filteredPlant);

	const getPlantsUser = async () => {
		try {
			setIsLoading(true);
			const response = await PlantNewService.getPlantsUser();
			setIsLoading(false);
			// setMainOrder(orders?.data[0]);
			setPlants(response?.data);
			console.log(response.data);

			// console.log('All orders >>> ', orders)
		} catch (e) {
			console.error('Error >>> ', e);
		}
	};

	useEffect(() => {
		getPlantsUser();
	}, []);

	const handleDelete = async (id) => {
		const controller = new AbortController();
		try {
			await PlantNewService.deletePlant(id);
			getPlantsUser();
		} catch (err) {
			console.error(err);
		} finally {
			controller.abort();
		}
	};

	const handleRestore = async (id) => {
		const controller = new AbortController();
		try {
			await PlantNewService.restorePlant(id);
			getPlantsUser();
		} catch (err) {
			console.error(err);
		} finally {
			controller.abort();
		}
	};

	return (
		<div className={classes.body}>
			<div className={classes.contextWrapper}>
				<h2>Ваши объявления</h2>

				<NavBarPlants
					tabs={tabs}
					filter={filter}
					setFilter={setFilter}
					matches={matches}
				/>

				<div className={classes.numberOfPlants}>
					Всего объявлений: {filteredPlant?.length}
				</div>

				<div className={classes.plantList}>
					{isLoading ? (
						<>
							{skeletonCost(5).map((el) => {
								return (
									<Skeleton
										variant="rounded"
										key={el}
										height={277}
										sx={{ borderRadius: '14px' }}
									/>
								);
							})}
						</>
					) : (
						<>
							{filteredPlant?.map(
								({ _id, name, cities, price, number, deleted, enabled }) => (
									<PlantCard
										_id={_id}
										key={_id}
										name={name}
										cities={cities}
										price={price}
										number={number}
										deleted={deleted}
										enabled={enabled}
										updateList={getPlantsUser}
										handleDelete={handleDelete}
										handleRestore={handleRestore}
									/>
								)
							)}
						</>
					)}

					<div
						className={classes.addCard}
						onClick={() => navigate('/profile/addPlant')}
					>
						<img src={plusIco} alt="" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyPlants;
