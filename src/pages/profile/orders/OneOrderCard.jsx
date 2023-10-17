import { useState } from 'react';
import styled from 'styled-components';
import { DeleteModal } from '../../../components/DeleteModal/DeleteModal';
import deleteIco from '../../../img/delete-ico.svg';
import repairIco from '../../../img/repair-ico.svg';
import editIco from '../../../img/edit-ico.svg';
import config from '../../../settings/settings';

const NavBar = (props) => {
	const { _id, title, cities, many, number } = props.item;

	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
	const handleOpen = () => setIsOpenDeleteModal(true);

	const active = !props.item.deleted && props.item.enabled;
	const waiting = !props.item.deleted && !props.item.enabled;
	const deleted = props.item.deleted && !props.item.enabled;
	const wooops = props.item.deleted && props.item.enabled;

	return (
		<Card key={_id} id={_id} onClick={props.handleViewOrder}>
			<div className="header" id={_id}>
				<p
					className="title"
					id={_id}
					style={{ opacity: deleted ? '0.3' : '1' }}
				>
					{number}
				</p>

				<div className="buttons">
					{!deleted && (
						<button
							button
							title="Редактировать"
							className="edit-btn"
							onClick={props.handleEdit}
							id={_id}
						>
							<img alt="" src={editIco} className="card-ico" />
						</button>
					)}
					{!deleted ? (
						<>
							<button
								button
								title="Удалить"
								className="del-btn"
								onClick={handleOpen}
								id={_id}
							>
								<img alt="" src={deleteIco} className="card-ico" />
							</button>
							<DeleteModal
								open={isOpenDeleteModal}
								setOpen={setIsOpenDeleteModal}
								name={title}
								_id={_id}
								handleDelete={props.handleDelete}
							/>
						</>
					) : (
						<button
							button
							title="Восстановить"
							className="del-btn"
							onClick={() => props.handleActive(_id)}
							id={_id}
						>
							<img alt="" src={repairIco} className="card-ico" />
						</button>
					)}
				</div>
			</div>

			<div
				className="price"
				id={_id}
				style={{ opacity: deleted ? '0.3' : '1' }}
			>
				{title}
			</div>

			<div
				className="price"
				id={_id}
				style={{ opacity: deleted ? '0.3' : '1' }}
			>
				{many} руб.
			</div>

			<div className="city" id={_id} style={{ opacity: deleted ? '0.3' : '1' }}>
				{cities}
			</div>

			{active && (
				<div className="status good" id={_id}>
					<a href={`/draft/details/${_id}`}>Заказ находится на сайте</a>
				</div>
			)}
			{waiting && (
				<div className="status waiting" id={_id}>
					На модерации
				</div>
			)}
			{deleted && (
				<div className="status deleted" id={_id}>
					Удален
				</div>
			)}
			{wooops && (
				<div className="status wooops" id={_id}>
					Сообщите об этом заказе администраторам
				</div>
			)}
		</Card>
	);
};

export default NavBar;

const Card = styled.div`
	display: flex;
	flex-direction: column;
	width: 31.3%;
	height: 277px;
	background: #f6f6f6;
	border-radius: 14px;
	cursor: pointer;
	padding: 33px 37px;
	z-index: 5;

	color: #333333;
	font-family: 'Roboto', sans-serif;
	font-style: normal;
	font-weight: 400;

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
		width: 47%;
	}
	@media screen and (max-width: 785px) {
		width: 100%;
	}

	@media screen and (max-width: 480px) {
		margin-bottom: 20px;
	}

	:hover {
		border: 1px solid #00aeae;
	}

	.header {
		display: flex;
		justify-content: space-between;
	}

	.title {
		font-weight: 500;
		font-size: 24px;
		color: #00aeae;
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

	.status {
		margin-top: auto;
		font-size: 18px;
	}

	.buttons {
		display: flex;
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
