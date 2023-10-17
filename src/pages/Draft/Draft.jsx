import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import useMediaQuery from '@mui/material/useMediaQuery';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import DraftService from '../../services/DraftService';
import { getPageCount, getPagesArray } from '../../utils/pages';
import { AuthContext } from '../../hoc/AuthProvider';
import { DraftList } from '../../components/Draft/DraftList/DraftList';
import Sidebar from '../../components/Draft/Sidebar';
import LeftAd from '../reklama/LeftSide';
import SidebarMeh from '../../components/Draft/SidebarMeh';
import { sidebar_menu } from '../../utils/sidebar_menu';
import FindBlock from '../../components/Draft/FindBlock';
import PaginationPortal from '../../components/Pagination/PaginationPortal';
import PaginationForFind from '../../components/Pagination/PaginationForFind';
import config from '../../settings/settings';
import burgerOpen from '../../img/filter-ico.png';
import TopAd from '../reklama/TopSide';
import { useDebounce } from '../../hooks/useDebounce';
import ReklamaService from '../../services/Reklama';

import classes from './Draft.module.css';

const Draft = () => {
	const navigate = useNavigate();
	const { page } = useParams();
	const { store } = useContext(AuthContext);

	const [draft, setDraft] = useState([]);

	const [totalPages, setTotalPages] = useState(0);
	const [totalPagesFind, setTotalPagesFind] = useState(0);
	const limit = parseInt(config?.draftDoc);
	const [currentPage, setCurrentPage] = useState(parseInt(page));
	const [currentPageFind, setCurrentPageFind] = useState(parseInt(page));
	const [inputValue, setInputValue] = useState(parseInt(page));

	const [message, setMessage] = useState('');

	const [value, setValue] = useState('101');
	const [query, setQuery] = useState(store?.query || '');
	const [mehData, setMehData] = useState([]);
	const [stateMeh, setStateMeh] = useState([]);
	const [xTotal, setXTotal] = useState(0);

	const [reklama, setReklama] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingAdvertising, setIsLoadingAdvertising] = useState(false);

	const debouncedSearchTerm = useDebounce(query, 500);

	//drawerMobile
	const matches = useMediaQuery('(max-width:710px)');
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [whatIsGrpup, setWhatIsGrpup] = useState('Все');

	const iOS =
		typeof navigator !== 'undefined' &&
		/iPad|iPhone|iPod/.test(navigator.userAgent);
	//drawerMobile

	const modal = document.getElementById('findModal');

	window.onclick = function (event) {
		if (event.target == modal) {
			if (modal) modal.style.display = 'none';
		}
	};

	// const [url, setUrl] = useState(prefixUrl ||'all');

	let pagesArray = getPagesArray(totalPages);
	let pagesArrayFind = getPagesArray(totalPagesFind);

	const handlerChange = async (e) => {
		const value = e?.target?.value;
		setAutofind(false);
		navigate(`/draft/1`, { replace: true });
		setCurrentPage(1);
		setInputValue(1);
		store?.setCurPage(1);
		store?.setValue(value);
		setValue(value);
		setWhatIsGrpup(e.target.parentElement.parentElement.innerText);
		setIsDrawerOpen(false);
	};

	const handleChangeMeh = (event) => {
		setStateMeh({
			...stateMeh,
			[event.target.name]: event.target.checked,
		});
		console.log(stateMeh);
	};

	const handlerQuery = async (e) => {
		setAutofind(false);

		// e.preventDefault();
		const query = e?.target?.value;
		// if (query.length < 2) return
		// console.log(query)
		// if (query?.length === 0 || query?.length > 2) {
		// console.log('setQuery 3 sumbol', query)
		setCurrentPage(1);
		store?.setCurPage(1);
		store?.setQuery(query);
		setQuery(query);
		// }
	};

	const handleFind = async () => {
		try {
			setAutofind(false);
			let filters = [];

			for (let key in stateMeh) {
				if (stateMeh[key] === true) filters.push(key);
			}

			if (filters.length < 1) {
				getDraftToUrl(currentPage, value, query);
				setStateMeh([]);
				if (modal) modal.style.display = 'none';
				// return;
			}

			setCurrentPage(1);
			setQuery('');
			const quer = '';
			const response = await DraftService.fetchDraftToUrl(
				currentPage,
				value,
				quer,
				filters
			);

			setDraft(response?.data);
			// console.log(response?.data);

			const totalCount = response?.headers['x-total-draft'];
			setXTotal(totalCount);
			const tC = getPageCount(totalCount, limit);

			setTotalPagesFind(tC);

			if (modal) modal.style.display = 'none';
		} catch (error) {
			setMessage(error?.response?.data?.message);
		} finally {
			store?.setLoading(false);
		}
	};

	const [isAutofind, setAutofind] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const responseReklama = await ReklamaService.getReklamas();

				let filters = [];

				for (let key in stateMeh) {
					if (stateMeh[key] === true) filters.push(key);
				}
				if (store.value !== '101') {
					setValue(store.value);
				}

				if (filters.length < 1) {
					!isAutofind &&
						getDraftToUrl(
							currentPage,
							value,
							query,
							responseReklama.data,
							filters
						);
					isAutofind && handleAutoFind();
					setStateMeh([]);
					if (modal) modal.style.display = 'none';
				}
				mehDataInit();

				!isAutofind &&
					(await getDraftToUrl(
						currentPage,
						value,
						query,
						responseReklama.data,
						filters
					));
				isAutofind && handleAutoFind();
			} catch (e) {
				console.error(e);
			} finally {
				store?.setLoading(false);
			}
		})();
	}, [currentPage, debouncedSearchTerm, value, currentPageFind]);

	// const [favoriteId, setFavoriteId] = useState([])

	async function getDraftToUrl(
		currentPage,
		value,
		query,
		responseReklama,
		filters
	) {
		try {
			// const responseavorite = await Orders.getFavorite();
			// setFavoriteId(responsefavorite.data)

			setMessage('');
			store?.setLoading(true);
			// console.log(value)
			const filter = [];

			for (let item of responseReklama) {
				if (item.card_place !== 0 && item.enabled) filter.push(item);
			}
			setIsLoading(true);

			const response = await DraftService.fetchDraftToUrl(
				currentPage,
				value,
				query,
				filters,
				limit - filter.length
			);
			// console.log(response.data)
			const xTotal = response?.headers['x-total-draft'];
			setXTotal(xTotal);
			setIsLoading(false);

			if (response?.data.length < 1) return;
			setDraft(response?.data);
			const totalCount = response?.headers['x-total-draft'];
			const tC = getPageCount(totalCount, limit);

			setTotalPages(tC);
			if (tC < page) {
				setCurrentPage(1);
				navigate(`/draft/1`, { replace: true });
			}
			store?.setLoading(false);
		} catch (error) {
			setMessage(error?.response?.data?.message);
			setIsLoading(false);
			setIsError(true);
		} finally {
			store?.setLoading(false);
		}
	}

	async function mehDataInit() {
		try {
			setMessage('');
			store?.setLoading(true);

			const response = await DraftService.getMechData();
			setMehData(response?.data);
			setIsLoadingAdvertising(true);
			const responseRe = await ReklamaService.getReklamas();
			// console.log(responseRe)
			setIsLoadingAdvertising(false);
			setReklama(responseRe.data);
		} catch (error) {
			setMessage(error?.response?.data?.message);
			setIsLoadingAdvertising(false);
		} finally {
			store?.setLoading(false);
		}
	}

	const changePage = async (event, value) => {
		setCurrentPage(value);
		setInputValue(value);
	};

	const handleAutoFind = async () => {
		try {
			// setStateMeh([])
			setAutofind(true);
			// setCurrentPage(1);
			store?.setCurPage(1);
			store?.setQuery('');
			setQuery('');
			store?.setValue('101');
			setValue('101');
			// console.log(currentPage)
			const response = await DraftService.autoFind(currentPage);
			// console.log(response);
			const xTotal = response?.headers['x-total-draft'];
			setXTotal(xTotal);

			if (response?.data.length < 1) return;
			setDraft(response?.data);
			const totalCount = response?.headers['x-total-draft'];
			const tC = getPageCount(totalCount, limit);
			setTotalPages(tC);

			if (tC < page) {
				setCurrentPage(1);
				navigate(`/draft`, { replace: true });
			}

			const responseMechData = await DraftService.getMechData();
			setMehData(responseMechData?.data);
		} catch (error) {
			console.error(error);
		}
	};

	const scrollY = window.scrollY;

	const [isError, setIsError] = useState(false);

	const pageFromUrl = window.location.pathname.split('/').splice(-1, 1)[0];

	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};
	//dialog
	// const [isOpenNewNote, setIsOpenNewNote] = useState(store.newNote);
	// const handleClose = () => {
	//     setIsOpenNewNote(false);
	// };

	// const handleSubmit = () => {
	//     setIsOpenNewNote(false);
	//     store.setNewNote(false);
	//     navigate("/profile/chat");
	// };

	return (
		<div className={classes.body}>
			{/* <DialogAlertNewMessage
                open={isOpenNewNote}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                data={store.costNote}
            /> */}
			<div className={classes.wrapper}>
				<main className={classes.main}>
					<TopAd reklama={reklama} isLoading={isLoadingAdvertising} />

					<section className={classes.section}>
						<FindBlock
							isAutofind={isAutofind}
							handlerQuery={handlerQuery}
							query={query}
							handleAutoFind={handleAutoFind}
							stateMeh={stateMeh}
							xTotal={xTotal}
							path="favorite"
						/>

						<FindModal id="findModal">
							<SidebarMeh
								data={mehData}
								handlerChange={handleChangeMeh}
								handleFind={handleFind}
							/>
						</FindModal>

						<div className={classes.content}>
							{matches ? (
								<div className={classes.sideBarDraftMobile}>
									<div className={classes.filterWrapper}>
										<p className={classes.categoryName}>
											Категория: <strong>{whatIsGrpup}</strong>
										</p>
										<img
											className={classes.filterImg}
											src={burgerOpen}
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
									>
										<div className={classes.drawerContent}>
											<Sidebar
												setIsOpenMenu={setIsDrawerOpen}
												data={sidebar_menu}
												handlerChange={handlerChange}
												value={value}
												setValue={setValue}
												stateMeh={stateMeh}
												setWhatIsGrpup={setWhatIsGrpup}
												scrollY={scrollY}
												isAutofind={isAutofind}
											/>
										</div>
									</SwipeableDrawer>
								</div>
							) : (
								<div className={classes.categoryWrapperLeft}>
									<Sidebar
										data={sidebar_menu}
										handlerChange={handlerChange}
										value={value}
										setValue={setValue}
										stateMeh={stateMeh}
										isAutofind={isAutofind}
									/>

									<LeftAd reklama={reklama} />
								</div>
							)}

							<div className={classes.draftList}>
								<DraftList
									data={draft}
									pageFromUrl={pageFromUrl}
									reklama={reklama}
									isLoading={isLoading}
								/>

								{xTotal !== '0' ? (
									stateMeh.length < 1 ? (
										totalPages && (
											<PaginationPortal
												data={pagesArray.length}
												page={currentPage}
												changePage={changePage}
												prefixUrl={'draft'}
												setPage={setCurrentPage}
												inputValue={inputValue}
												setInputValue={setInputValue}
											/>
										)
									) : (
										<PaginationForFind
											setDraft={setDraft}
											stateMeh={stateMeh}
											data={pagesArrayFind.length}
											page={currentPage}
											changePage={changePage}
											prefixUrl={'draft'}
										/>
									)
								) : (
									<div className={classes.emptyBlock} />
								)}
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
};

export default observer(Draft);

const FindModal = styled.div`
	display: none; /* Hidden by default */
	position: fixed; /* Stay in place */
	z-index: 1; /* Sit on top */
	padding-top: 50px; /* Location of the box */
	padding-bottom: 50px; /* Location of the box */
	left: 0;
	top: 0;
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: #000000ae; /* Black w/ opacity */
`;
