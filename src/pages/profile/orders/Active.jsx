import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Orders from '../../../services/Orders';
import Asidebar from '../components/Asidebar/Asidebar';
import MobileMenu from './MobileMenu';
import MobileHeader from './MobileHeader';
import NavBar from './NavBar';
import MainOrder from './MainOrder';
import OneOrderCard from './OneOrderCard';
import plusIco from '../../../img/plus-ico.svg';

const MyOrder = () => {
	const [ready, setReady] = useState(false);
	const [orders, setOrders] = useState([]);
	const [mainOrder, setMainOrder] = useState([]);

	let navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const orders = await Orders.getOrders();

				let tempArray = [];
				orders?.data?.forEach((item) => {
					if (item?.enabled && !item?.deleted) {
						tempArray?.push(item);
					}
				});

				setMainOrder(tempArray[0]);
				setOrders(tempArray);
				setReady(true);

				// console.log(orders)
				// console.log(mainOrder)
			} catch (e) {
				console.error('Error >>> ', e);
			} finally {
				setReady(true);
			}
		})();
	}, []);

	const handleViewOrder = (e) => {
		const id = e.target?.id;
		// console.log(id)
		orders.forEach((item) => {
			if (Object.values(item).includes(id)) {
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

	const handleDetele = (e) => {
		e.stopPropagation();
		// console.log(e);

		let ask = prompt('Вы уверенны, что хотите удалить заказ?', 'Да');
		if (ask === 'Да' || ask === 'да') {
			// console.log('123')
			Orders.deleteOrder(e.target?.parentElement.id, { deleted: true });
			window.location.reload();
		}
	};

	const handleActive = (e) => {
		e.stopPropagation();

		let ask = prompt('Вы уверенны, что хотите восствновить заказ?', 'Да');
		if (ask === 'Да' || ask === 'да') {
			Orders.deleteOrder(e.target?.parentElement.id, { deleted: false });
			window.location.reload();
		}
	};
	const [isOpenMenu, setIsOpen] = useState(false);

	return (
		<Body>
			{/* <Asidebar /> */}

			{/* <MobileHeader setIsOpen={setIsOpen} isOpen={isOpenMenu} />
			{isOpenMenu && <MobileMenu setIsOpen={setIsOpen} />} */}

			{ready && (
				<div className="context-wrapper ">
					<h2>Ваши заказы</h2>

					<NavBar />

					<div className="all-orders">Активных заказов: {orders?.length}</div>
					{orders?.length > 0 && (
						<MainOrder
							mainOrder={mainOrder}
							handleEdit={handleEdit}
							handleDetele={handleDetele}
							handleActive={handleActive}
						/>
					)}
					<AllOrders>
						{orders?.map((item) => (
							<OneOrderCard
								item={item}
								handleViewOrder={handleViewOrder}
								handleEdit={handleEdit}
								handleDetele={handleDetele}
								handleActive={handleActive}
							/>
						))}

						<Card onClick={() => navigate('/profile/addorder')}>
							<img src={plusIco} alt="" />
						</Card>
					</AllOrders>
				</div>
			)}
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

			@media screen and (max-width: 480px) {
				font-size: 22px;
			}
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
