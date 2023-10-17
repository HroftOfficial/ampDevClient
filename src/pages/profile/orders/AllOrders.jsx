import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SkeletonDraftProfile } from '../../../components/Skeletons/SkeletonDraftProfile/SkeletonDraftProfile';
import { tabs } from '../../../utils/profileTabs';
import NavBarPlants from '../plants/components/NavBarPlants/NavBarPlants';
import Orders from '../../../services/Orders';
import NavBar from './NavBar';
import MainOrder from './MainOrder';
import OneOrderCard from './OneOrderCard';
import plusIco from '../../../img/plus-ico.svg';

const MyOrder = () => {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [mainOrder, setMainOrder] = useState([]);
	const [filter, setFilter] = useState(tabs[0]);
	const matches = useMediaQuery('(min-width:1000px)');

	const result = filter.config.shouldBeFiltered;

	const filteredDraft = result
		? orders?.filter(
				({ deleted, enabled }) =>
					deleted === filter.config.deleted && enabled === filter.config.enabled
		  )
		: orders;

	const navigate = useNavigate();

	const getOrders = async () => {
		try {
			setIsLoading(true);
			const orders = await Orders.getOrders();
			setIsLoading(false);
			setMainOrder(orders?.data[0]);
			setOrders(orders?.data);
		} catch (e) {
			console.error('Error >>> ', e);
		}
	};

	useEffect(() => {
		getOrders();
	}, []);

	const handleViewOrder = (e) => {
		const id = e.target.id;
		orders?.forEach((item) => {
			if (Object.values(item)?.includes(id)) {
				setMainOrder(item);
			}
		});

		window.scrollTo({
			top: 271,
			behavior: 'smooth',
		});
	};

	const handleEdit = (e) => {
		e.stopPropagation();
		const id = e.target?.parentElement.id;
		// console.log(id)
		navigate(`/profile/orders/${id}`);
	};

	const handleDelete = async (id) => {
		const controller = new AbortController();
		try {
			await Orders.deleteOrder(id, {
				deleted: true,
			});
			getOrders();
		} catch (err) {
			console.error(err);
		} finally {
			controller.abort();
		}
	};

	const handleActive = async (id) => {
		const controller = new AbortController();
		try {
			await Orders.deleteOrder(id, {
				deleted: false,
			});
			getOrders();
		} catch (err) {
			console.error(err);
		} finally {
			controller.abort();
		}
	};

	useEffect(() => {
		if (!!filteredDraft.length) {
			setMainOrder(filteredDraft[0]);
		}
	}, [filter]);

	if (isLoading) {
		return <SkeletonDraftProfile />;
	}

	return (
		<Body>
			<div className="context-wrapper ">
				<h2>Ваши заказы</h2>

				{/* <NavBar /> */}
				<NavBarPlants
					tabs={tabs}
					filter={filter}
					setFilter={setFilter}
					matches={matches}
				/>

				<div className="all-orders">Всего заказов: {filteredDraft?.length}</div>
				{filteredDraft.length > 0 && (
					<MainOrder
						mainOrder={mainOrder}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
						handleActive={handleActive}
					/>
				)}
				<AllOrders>
					{filteredDraft?.map((item) => (
						<OneOrderCard
							item={item}
							handleViewOrder={handleViewOrder}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
							handleActive={handleActive}
						/>
					))}

					<Card onClick={() => navigate('/profile/addorder')}>
						<img src={plusIco} alt="" />
					</Card>
				</AllOrders>
			</div>
		</Body>
	);
};

export default MyOrder;

const Body = styled.section`
	display: flex;
	color: black;
	font-family: 'Roboto', sans-serif;
	font-style: normal;
	font-weight: 400;

	@media screen and (max-width: 1200px) {
		flex-direction: column;
	}

	.context-wrapper {
		display: flex;
		flex-direction: column;
		padding: 69px 37px 52px;
		width: 100%;
		max-width: 1328px;
		box-sizing: content-box;

		@media screen and (max-width: 1200px) {
			box-sizing: border-box;
		}

		@media screen and (max-width: 480px) {
			padding: 26px 16px;
		}

		h2 {
			font-weight: 500;
			font-size: 24px;
			color: #333333;

			@media screen and (max-width: 480px) {
				margin: 0 auto;
			}
		}

		.all-orders {
			margin-bottom: 25px;
			font-size: 24px;
			color: #333333;
		}

		@media screen and (max-width: 480px) {
			font-size: 22px;
		}
	}
`;

const AllOrders = styled.div`
	display: flex;
	gap: 40px;
	flex-wrap: wrap;
	width: 100%;

	@media screen and (max-width: 785px) {
		flex-wrap: nowrap;
		flex-direction: column;
	}
	@media screen and (max-width: 480px) {
		gap: 0;
	}
`;

const Card = styled.div`
	display: flex;
	flex-direction: column;
	width: 31%;
	height: 277px;
	background: #f6f6f6;
	border-radius: 14px;
	cursor: pointer;
	padding: 33px 37px;
	z-index: 5;

	@media screen and (max-width: 1804px) {
		width: 31%;
	}
	@media screen and (max-width: 1640px) {
		width: 30%;
	}
	@media screen and (max-width: 1440px) {
		width: 47.5%;
	}
	@media screen and (max-width: 1300px) {
		width: 46.5%;
	}
	@media screen and (max-width: 785px) {
		width: 100%;
	}

	:hover {
		border: 1px solid #00aeae;
	}

	img {
		height: 102px;
		width: 102px;
		margin: auto auto;
	}
`;
