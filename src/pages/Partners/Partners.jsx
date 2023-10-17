import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { AuthContext } from '../../hoc/AuthProvider';
import PartnersList from '../../components/Partners/PartnersList';
import PartnerService from '../../services/PartnerService';
import { getPageCount, getPagesArray } from '../../utils/pages';
import PaginationPortal from '../../components/Pagination/PaginationPortal';
import config from '../../settings/settings';
import Modal from './PartnersModal';
import { useDebounce } from '../../hooks/useDebounce';
import background from '../../img/draft-background.jpg';

const Partners = () => {
	const [message, setMessage] = useState('');
	const { store } = useContext(AuthContext);
	const params = useParams();
	const [partner, setPartner] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const limit = config?.partnerDoc;
	const [page, setPage] = useState(parseInt(params.page));
	const [inputValue, setInputValue] = useState(parseInt(params.page));
	const [xTotal, setXtotal] = useState('0');

	const [queryValue, setQueryValue] = useState('');

	let pagesArray = getPagesArray(totalPages);

	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [listVidi, setListVidi] = useState([]);
	const [selected, setSelected] = useState([]);

	const debouncedSearchTerm = useDebounce(queryValue, 500);

	useEffect(() => {
		const getPartners = async () => {
			try {
				let vidi = [];
				setIsLoading(true);

				if (store.isAuth) vidi = await PartnerService.getUsersToms();

				setListVidi(vidi.data);

				setMessage('');
				store.isLoading = true;

				let response = [];
				if (!store.isAuth)
					response = await PartnerService.fetchPartner(page, limit);
				if (store.isAuth)
					response = await PartnerService.postPartnersRequest(
						page,
						limit,
						queryValue,
						selected
					);

				setPartner(response.data);
				setIsLoading(false);

				const totalCount = response.headers['x-total-partners'];
				setXtotal(totalCount);
				setTotalPages(getPageCount(totalCount, limit));

				window.scrollTo(0, 0);
			} catch (e) {
				setMessage(e?.response?.data?.message);
				setIsError(true);
				setIsLoading(false);
			} finally {
				store.isLoading = false;
			}
		};
		getPartners();
	}, [page, debouncedSearchTerm, selected]);

	const changePage = async (event, value) => {
		setPage(value);
		setInputValue(value);
	};

	const handlerTegFind = async (e) => {
		// e.preventDefault();
		const value = e.target.value;
		// if (query.length < 2) return
		// console.log(query)
		// if (query?.length === 0 || query?.length > 2) {
		// console.log('setQuery 3 sumbol', query)
		setPage(1);
		setInputValue(1);
		// store?.setCurPage(1);
		// store?.setQuery(value);
		setQueryValue(value);
		// }
	};

	const handleOpenModal = (e) => {
		e.preventDefault();
		// console.log('Hey')
		setIsOpenMenu(true);
	};

	const [isOpenMenu, setIsOpenMenu] = useState(false);

	return (
		<Wrapper1>
			<Wrapper2>
				<Body>
					<div className=" max-w-2xl md:max-w-3xl lg:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto pb-8 w-full">
						<div className="flex justify-center items-center">
							<h1 className="block text-xl py-6 md:py-12 md:text-2xl xl:text-2xl font-bold text-center text-gray-850">
								НАШИ ПАРТНЕРЫ И УЧАСТНИКИ АССОЦИАЦИИ
							</h1>
						</div>

						{store.isAuth && (
							<Form>
								<span className="span-title">
									Здесь осуществляется поиск по компаниям производителям
								</span>
								<div className="search">
									<input
										type="text"
										placeholder="Введите тег, город или название предриятия"
										onChange={handlerTegFind}
										value={queryValue}
										id="form-input"
									/>
									{/* <div className='ili'>ИЛИ</div> */}
									<button onClick={handleOpenModal}>
										Выберете интересующие виды мехобработки
									</button>
									{selected?.length > 0 ? (
										<div className="index">{selected?.length}</div>
									) : null}
								</div>
								<Finded>
									<span>Найдено &nbsp;</span> {xTotal} компаний
								</Finded>
							</Form>
						)}

						{isOpenMenu && (
							<FindModal>
								<Modal
									setIsOpenMenu={setIsOpenMenu}
									data={listVidi}
									selected={selected}
									setSelected={setSelected}
								/>
							</FindModal>
						)}

						<div className="text-red-500 p-y-2 font-semibold">{message}</div>

						<PartnersList data={partner} isLoading={isLoading} />

						{/* {isLoading ? (
                            <PartnersList data={partner} />
                        ) : (
                            <Loading>Загрузка...</Loading>
                        )} */}

						{isError && (
							<p className="text-red-500 text-center font-semibold mt-60 mb-60">
								Cервер недоступен
							</p>
						)}
					</div>

					{partner?.length && (
						<PaginationPortal
							data={pagesArray.length}
							page={page}
							prefixUrl={'partners'}
							changePage={changePage}
							setPage={setPage}
							inputValue={inputValue}
							setInputValue={setInputValue}
						/>
					)}
				</Body>
			</Wrapper2>
		</Wrapper1>
	);
};

export default observer(Partners);

const Wrapper1 = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	background-image: url(${background});
	background-size: contain;
	min-height: calc(100vh - 278.5px - 274px);
`;

const Wrapper2 = styled.div`
	width: 100%;
	height: 100%;
	background: radial-gradient(
		circle,
		rgba(255, 255, 255, 1) 70%,
		rgba(255, 255, 255, 0.9472163865546218) 80%,
		rgba(255, 255, 255, 0.9220063025210083) 90%,
		rgba(255, 255, 255, 0.7259278711484594) 100%
	);
	min-height: calc(100vh - 278.5px - 274px);

	@media screen and (max-width: 1200px) {
		background: radial-gradient(
			circle,
			rgba(255, 255, 255, 1) 91%,
			rgba(255, 255, 255, 0.8155637254901961) 100%,
			rgba(255, 255, 255, 0.8) 100%
		);
	}
`;

const Finded = styled.div`
	display: flex;
	margin-top: 40px;
	color: black;
	font-family: 'Ubuntu', sans-serif;
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 21px;
	color: #808080;

	span {
		color: #00aeae;
	}
`;

const Body = styled.section`
	display: flex;
	min-height: 59vh;
	flex-direction: column;
`;

const FindModal = styled.div`
	display: flex; /* Hidden by default */
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

const Loading = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 40px;
	color: black;
	margin: 100px 0 400px;
`;

const Form = styled.form`
	display: flex;
	width: 100%;
	max-width: 1220px;
	margin: 0 auto 70px;
	color: black;
	flex-direction: column;
	position: relative;

	@media screen and (max-width: 480px) {
		font-size: 16px;
		padding: 10px;
	}

	.span-title {
		font-size: 22px;
		text-align: center;
		margin-bottom: 15px;
	}

	.search {
		display: flex;
		align-items: center;

		@media screen and (max-width: 830px) {
			flex-direction: column;
			padding: 0 20px;
		}

		.ili {
			font-family: 'Ubuntu', sans-serif;
			font-size: 24px;
			margin: 0 30px;
			font-weight: 500;

			@media screen and (max-width: 830px) {
				display: none;
			}
		}

		button {
			font-family: 'Ubuntu', sans-serif;
			font-size: 18px;
			background: #00aeae;
			cursor: pointer;
			color: white;
			padding: 4px;

			@media screen and (max-width: 830px) {
				padding: 10px 15px;
				margin-left: auto;
				margin-top: 30px;
			}
		}
	}

	input {
		width: 100%;
		padding: 20px 14px 20px 33px;

		margin-right: 20px;
		border: 1px solid #e0e0e0;
		font-family: 'Ubuntu', sans-serif;
		font-style: italic;
		font-weight: 400;
		font-size: 18px;
		line-height: 21px;
		outline: none;

		color: black;

		@media screen and (max-width: 480px) {
			font-size: 16px;
			padding: 10px;
		}
	}

	.index {
		display: flex;
		height: 30px;
		width: 30px;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		background: tomato;
		position: absolute;
		top: 33px;
		right: -15px;
		padding-left: 1px;
		color: white;

		@media screen and (max-width: 830px) {
			top: auto;
			bottom: 32px;
			right: 5px;
		}

		@media screen and (max-width: 480px) {
			top: auto;
			bottom: 70px;
			right: 15px;
		}
	}
`;
