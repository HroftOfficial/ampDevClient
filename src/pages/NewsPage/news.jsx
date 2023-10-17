import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { AuthContext } from '../../hoc/AuthProvider';
import NewsService from '../../services/NewsService';
import { getPageCount, getPagesArray } from '../../utils/pages';
import NewsList from '../../components/News/NewsList';
import PaginationPortal from '../../components/Pagination/PaginationPortal';
import config from '../../settings/settings';
import background from '../../img/draft-background.jpg';

const News = () => {
	const { page } = useParams();
	const [message, setMessage] = useState('');
	const { store } = useContext(AuthContext);
	const [news, setNews] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const limit = parseInt(config?.newsDoc);
	const [currentPage, setCurrentPage] = useState(parseInt(page));
	const [inputValue, setInputValue] = useState(parseInt(page));

	let pagesArray = getPagesArray(totalPages);

	useEffect(() => {
		window.scrollTo(0, 0);
		getNews(page);
	}, [page]);

	async function getNews() {
		try {
			setMessage('');
			store.isLoading = true;
			const response = await NewsService.fetchNews(page, limit);
			// console.log(response)

			// HARDCODE.push(news.splice(1,1)[0])

			setNews(response.data);
			const totalCount = response.headers['x-total-news'];
			setTotalPages(getPageCount(totalCount, limit));
			setIsLoading(true);
		} catch (error) {
			setMessage(error?.response?.data?.message);
			setIsError(true);
			setIsLoading(true);
		} finally {
			store.isLoading = false;
		}
	}

	const changePage = async (event, value) => {
		setCurrentPage(value);
		setInputValue(value);
	};
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	return (
		<>
			<Wrapper1>
				<Wrapper2>
					<div className="md:py-16">
						<div className="text-red-500 p-y-2 font-semibold">{message}</div>

						{/* {isLoading ? <><NewsList data={HARDCODE}/> <NewsList data={news}/> </> : <Loading>Загрузка...</Loading>} */}
						{isLoading ? (
							<NewsList data={news} />
						) : (
							<Loading>Загрузка...</Loading>
						)}
						{isError && (
							<p className="text-red-500 text-center font-semibold mt-60 mb-60">
								Cервер недоступен
							</p>
						)}
					</div>
					{news?.length && (
						<PaginationPortal
							data={pagesArray.length}
							page={currentPage}
							changePage={changePage}
							prefixUrl={'news'}
							setPage={setCurrentPage}
							inputValue={inputValue}
							setInputValue={setInputValue}
						/>
					)}
				</Wrapper2>
			</Wrapper1>
		</>
	);
};

export default observer(News);

const Loading = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 40px;
	color: black;
	margin: 200px 0 400px;
`;

const Wrapper1 = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	min-height: calc(100vh - 278.5px - 274px);
	background-image: url(${background});
	background-size: contain;
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
