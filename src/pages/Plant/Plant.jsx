import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { AuthContext } from '../../hoc/AuthProvider';
import SideBarPlant from '../../components/Plant/SideBarPlant';
import FindBlock from '../../components/Draft/FindBlock';
import PlantNewService from '../../services/PlantNewService';
import config from '../../settings/settings';
import imgFilter from '../../img/filter-ico.png';
import PaginationPortal from '../../components/Pagination/PaginationPortal';
import { parseLocalStorage } from '../../utils/parseDataLocalStoradge';
import { getPageCount } from '../../utils/pages';
import { PlantList } from './Components/PlantList/PlantList';
import { PlantGroupList } from './Components/PlantGroupList/PlantGroupList';

import classes from './Plant.module.css';

const { plantDoc } = config;

const Plant = () => {
	const { page } = useParams();
	const { store } = useContext(AuthContext);
	const navigate = useNavigate();

	/// start
	const [mainGroup, setMainGroup] = useState([{ name: 'Все', _id: '1' }]);
	const [subGroup, setSubGroup] = useState([]);

	const [selectGroup, setSelectGroup] = useState('1');

	// const parseLocalStorage = (key) => {
	// 	let result = [];
	// 	try {
	// 		result = JSON.parse(localStorage.getItem(key)) || [];
	// 	} catch (error) {
	// 		result = [];
	// 		console.log(error);
	// 	}
	// 	return result;
	// };

	// const test = JSON.parse(localStorage.getItem('subGroup')) || [];
	const test = parseLocalStorage('subGroup');
	const [checkedGroup, setCheckedGroup] = useState([...test]);

	const [whatIsGroup, setWhatIsGroup] = useState('Все');
	/// end

	///pagination
	const [totalPages, setTotalPages] = useState(0);
	const limit = parseInt(plantDoc);
	const [currentPage, setCurrentPage] = useState(page);
	const [inputValue, setInputValue] = useState(page);

	const [plant, setPlant] = useState([]);
	const matches = useMediaQuery('(max-width:710px)');
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const iOS =
		typeof navigator !== 'undefined' &&
		/iPad|iPhone|iPod/.test(navigator.userAgent);

	const [isLoading, setIsLoading] = useState(false);

	const getPlantsMainGroup = async () => {
		try {
			setIsLoading(true);
			const response = await PlantNewService.fetchPlantNewMainGroups();

			setMainGroup([...mainGroup, ...response?.data]);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	const getPlantsGroup = async () => {
		try {
			const response = await PlantNewService.fetchPlantNewGroup();
			setSubGroup(response?.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getPlantsMainGroup();
		getPlantsGroup();
	}, []);
	///// функции начало

	const getPlantToUrl = async () => {
		const controller = new AbortController();
		if (store.mainGroup !== '1') {
			setSelectGroup(store.mainGroup);
		}

		if (selectGroup !== '1') {
			try {
				setIsLoading(true);
				const response = await PlantNewService.fetchPlantToUrl(
					selectGroup,
					checkedGroup,
					currentPage
				);
				// console.log(response.data);
				setPlant(response?.data);
				setIsLoading(false);
				const totalCount = response?.headers['x-total-plant'];
				const totalPage = getPageCount(totalCount, limit);
				setTotalPages(totalPage);
				if (totalPage < page) {
					setCurrentPage(1);
					setInputValue(1);
					navigate(`/plant/1`, { replace: true });
				}
			} catch (err) {
				setIsLoading(false);
				console.error(err);
			} finally {
				controller.abort();
			}
		}
	};
	const changePage = async (event, value) => {
		setCurrentPage(value);
		setInputValue(value);
	};

	useEffect(() => {
		getPlantToUrl();
	}, [selectGroup, checkedGroup, page]);

	const mainGroupName = (id) => {
		const selectedGroup = mainGroup.find((el) => el._id === id);
		return selectedGroup.name;
	};

	const handlerSelectMainGroup = async (value) => {
		setSelectGroup(value);
		store.setMainGroup(value);
		localStorage.removeItem('subGroup');
		// navigate(`/plant/1`, { replace: true });
		setWhatIsGroup(mainGroupName(value));
		setCurrentPage('1');
		setInputValue('1');
	};

	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};

	///// функции конец

	return (
		<div className={classes.main}>
			<div className={classes.wrapper}>
				<div className={classes.body}>
					<div className={classes.box}>
						<FindBlock
							subject={plant}
							path="favoritePlants"
							xTotal={selectGroup === '1' ? mainGroup.length : plant.length}
						/>

						<section className={classes.content}>
							{matches ? (
								<div className={classes.sideBarPlantMobile}>
									<div style={{ display: 'flex' }}>
										<p style={{ color: '#000' }}>
											Категория: <strong>{whatIsGroup}</strong>
										</p>
										<img
											className={classes.filterImg}
											src={imgFilter}
											alt="filter"
											onClick={handleDrawerOpen}
										/>
									</div>

									<SwipeableDrawer
										anchor="left"
										open={isDrawerOpen}
										onClose={handleDrawerClose}
										disableBackdropTransition={!iOS}
										disableDiscovery={iOS}
										onOpen={handleDrawerOpen}
									>
										<div className={classes.drawerContent}>
											<SideBarPlant
												mainGroup={mainGroup}
												subGroup={subGroup}
												selectGroup={selectGroup}
												setSelectGroup={handlerSelectMainGroup}
												checkedGroup={checkedGroup}
												setCheckedGroup={setCheckedGroup}
											/>
											<span className={classes.closeIcon}>
												<IconButton onClick={handleDrawerClose}>
													<CloseIcon />
												</IconButton>
											</span>
										</div>
									</SwipeableDrawer>
								</div>
							) : (
								<div className={classes.categoryWrapperLeft}>
									<SideBarPlant
										mainGroup={mainGroup}
										subGroup={subGroup}
										selectGroup={selectGroup}
										setSelectGroup={handlerSelectMainGroup}
										checkedGroup={checkedGroup}
										setCheckedGroup={setCheckedGroup}
									/>
								</div>
							)}

							<div className={classes.plantListWrapper}>
								{selectGroup === '1' ? (
									<PlantGroupList
										data={mainGroup}
										setSelectGroup={handlerSelectMainGroup}
										isLoading={isLoading}
									/>
								) : (
									<>
										<PlantList
											data={plant}
											currectPage={page}
											isLoading={isLoading}
										/>
										{!isLoading && plant?.length > 0 && (
											<PaginationPortal
												data={totalPages}
												page={currentPage}
												changePage={changePage}
												prefixUrl={'plant'}
												setPage={setCurrentPage}
												inputValue={inputValue}
												setInputValue={setInputValue}
											/>
										)}
									</>
								)}
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default observer(Plant);
