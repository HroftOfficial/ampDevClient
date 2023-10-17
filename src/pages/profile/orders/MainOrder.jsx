import { useState } from 'react';
import styled from 'styled-components';
import { DeleteModal } from '../../../components/DeleteModal/DeleteModal';
import config from '../../../settings/settings';
import deleteIco from '../../../img/delete-ico.svg';
import repairIco from '../../../img/repair-ico.svg';
import editIco from '../../../img/edit-ico.svg';

const MainOrder = (props) => {
	const mainOrder = props.mainOrder;

	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
	const handleOpen = () => setIsOpenDeleteModal(true);

	const active = !mainOrder.deleted && mainOrder.enabled;
	const waiting = !mainOrder.deleted && !mainOrder.enabled;
	const deleted = mainOrder.deleted && !mainOrder.enabled;
	const wooops = mainOrder.deleted && mainOrder.enabled;

	return (
		<Order>
			<div className="header">
				<p className="title">{mainOrder?.number} </p>

				<div className="buttons">
					{!deleted && (
						<button
							title="Редактировать"
							className="edit-btn"
							onClick={props.handleEdit}
							id={mainOrder?._id}
						>
							<img alt="" src={editIco} className="card-ico" />
						</button>
					)}
					{!deleted ? (
						<>
							<button
								title="Удалить"
								className="del-btn"
								onClick={handleOpen}
								id={mainOrder?._id}
							>
								<img alt="" src={deleteIco} className="card-ico" />
							</button>
							<DeleteModal
								open={isOpenDeleteModal}
								setOpen={setIsOpenDeleteModal}
								name={mainOrder.title}
								_id={mainOrder._id}
								handleDelete={props.handleDelete}
							/>
						</>
					) : (
						<button
							title="Восстановить"
							className="del-btn"
							onClick={() => props.handleActive(mainOrder?._id)}
							id={mainOrder?._id}
						>
							<img alt="" src={repairIco} className="card-ico" />
						</button>
					)}
				</div>
			</div>
			<p className="price">{mainOrder?.title} </p>

			<div className="price">{mainOrder?.many} р</div>
			<div className="city">г. {mainOrder?.cities}</div>

			<div className="vidiobrabotki">
				<p>
					<b>Виды мехобработки</b>
				</p>
				<div className="kak-eto-nazvat">
					<div className="vidi-column">
						{mainOrder?.work_info.map((item) => (
							<div key={item?.id}>{item?.name}</div>
						))}
					</div>
					<div className="details">
						<div>
							Деталей: {mainOrder?.kl}{' '}
							{mainOrder?.kl_text === 'мес/шт'
								? 'шт/мес'
								: mainOrder?.kl_text === 'партия'
								? 'шт.'
								: mainOrder?.kl_text === 'год/шт'
								? 'шт/год'
								: mainOrder?.kl_text === 'шт.'
								? 'шт.'
								: null}
						</div>
						<div>Макс длина: {mainOrder?.max_width} мм</div>
						<div>Макс диаметр: {mainOrder?.max_d} мм</div>
					</div>
				</div>
			</div>

			<div className="description">
				<p>
					<b>Описание заказа</b>
				</p>
				<div>{mainOrder?.details}</div>
			</div>

			<div className="images">
				{mainOrder?.photo_url.map((item, index) => (
					<a
						href={config?.baseUrlUpload + '/uploads/' + item?.filename}
						key={index}
						target="_blank"
						noreferel="true"
					>
						<img
							className="image"
							src={`${config?.baseUrlUpload}/uploads/${item?.filename}`}
							alt=""
						/>
					</a>
				))}
			</div>

			<div className="documents">
				{mainOrder?.file_url.map((item, index) => (
					<a
						href={config?.baseUrlUpload + '/uploads/' + item?.filename}
						className="document"
						key={index}
						target="_blank"
						noreferel="true"
					>
						{item?.filename}
					</a>
				))}
			</div>

			{active && (
				<div className="status good" id={mainOrder?._id}>
					<a href={`/draft/details/${mainOrder?._id}`}>
						Заказ находится на сайте
					</a>
				</div>
			)}
			{waiting && (
				<div className="status waiting" id={mainOrder?._id}>
					На модерации
				</div>
			)}
			{deleted && (
				<div className="status deleted" id={mainOrder?._id}>
					Удален
				</div>
			)}
			{wooops && (
				<div className="status wooops" id={mainOrder?._id}>
					Сообщите об этом заказе администраторам
				</div>
			)}
		</Order>
	);
};

export default MainOrder;

const Order = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 1328px;
	background: #f6f6f6;
	border-radius: 14px;
	padding: 46px 36px;
	margin-bottom: 40px;
	font-family: 'Roboto', sans-serif;
	font-style: normal;
	font-weight: 400;
	color: #333333;

	@media screen and (max-width: 480px) {
		padding: 26px 16px;
	}

	.header {
		display: flex;
		justify-content: space-between;

		.title {
			font-weight: 500;
			font-size: 24px;
			color: #00aeae;
		}
	}

	.price {
		margin-top: 9px;
		font-weight: 500;
		font-size: 24px;
	}

	.city {
		margin-top: 24px;
		font-size: 15px;
		color: #7c7c7c;
	}

	.vidiobrabotki {
		display: flex;
		flex-direction: column;
		margin-top: 47px;
		font-size: 18px;

		.kak-eto-nazvat {
			display: flex;
			justify-content: space-between;
			gap: 20px;

			@media screen and (max-width: 700px) {
				flex-direction: column;
			}
		}

		.details {
			min-width: 300px;
		}

		.vidi-column {
			columns: 2;

			@media screen and (max-width: 700px) {
				columns: 1;
			}
		}
	}

	.description {
		display: flex;
		flex-direction: column;
		margin-top: 39px;
		font-size: 18px;
	}

	.images {
		display: flex;
		flex-wrap: wrap;
		padding: 25px 0;
		gap: 10px;

		.image {
			width: 240px;
		}
	}

	.documents {
		display: flex;
		flex-wrap: wrap;
		gap: 23px;

		.document {
			font-size: 18px;
			text-decoration-line: underline;
			color: #7c7c7c;
		}
	}

	.status {
		margin-top: 51px;
		font-size: 18px;
		color: black;
	}

	.good {
		color: #00aeae;
		text-decoration: underline;
	}

	.waiting {
		color: #fdb97c;
	}

	.deleted {
		color: #e56877;
	}

	.wooops {
		color: #9827cc;
	}

	.card-ico {
		height: 25px;
		width: 25px;
		margin-left: 15px;
	}
`;
