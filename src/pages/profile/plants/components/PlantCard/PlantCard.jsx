import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import deleteIco from '../../../../../img/delete-ico.svg';
import repairIco from '../../../../../img/repair-ico.svg';
import editIco from '../../../../../img/edit-ico.svg';
import { DeleteModal } from '../../../../../components/DeleteModal/DeleteModal';
import config from '../../../../../settings/settings';

import classes from './PlantCard.module.css';

export const PlantCard = ({
	_id,
	name,
	cities,
	price,
	number,
	deleted,
	enabled,
	handleViewOrder,
	// handleActive,
	handleDelete,
	handleRestore,
}) => {
	const navigate = useNavigate();
	/**modal */
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

	const handleOpen = () => setIsOpenDeleteModal(true);
	/**modal */

	const active = !deleted && enabled;
	const waiting = !deleted && !enabled;
	const isDeleted = deleted && !enabled;
	const wooops = deleted && enabled;

	return (
		<div className={classes.wrapper} id={_id} onClick={handleViewOrder}>
			<div className={classes.header} id={_id}>
				<p
					className={classes.title}
					id={_id}
					style={{ opacity: deleted ? '0.3' : '1' }}
				>
					{name}
				</p>

				<div className={classes.buttons}>
					{!deleted && (
						<button
							button
							title="Редактировать"
							className={classes.editBtn}
							onClick={() => navigate(`/profile/plants/${_id}`)}
							id={_id}
						>
							<img
								alt="Редактировать"
								src={editIco}
								className={classes.cardIco}
							/>
						</button>
					)}
					{!deleted ? (
						<>
							<button
								button
								title="Удалить"
								className={classes.delBtn}
								onClick={handleOpen}
								id={_id}
							>
								<img
									alt="Удалить"
									src={deleteIco}
									className={classes.cardIco}
								/>
							</button>
							<DeleteModal
								open={isOpenDeleteModal}
								setOpen={setIsOpenDeleteModal}
								name={name}
								_id={_id}
								handleDelete={handleDelete}
							/>
						</>
					) : (
						<button
							button
							title="Восстановить"
							className={classes.delBtn}
							onClick={() => handleRestore(_id)}
							id={_id}
						>
							<img
								alt="восстановить"
								src={repairIco}
								className={classes.cardIco}
							/>
						</button>
					)}
				</div>
			</div>

			<div
				className={classes.price}
				id={_id}
				style={{ opacity: deleted ? '0.3' : '1' }}
			>
				№{number}
			</div>

			<div
				className={classes.price}
				id={_id}
				style={{ opacity: deleted ? '0.3' : '1' }}
			>
				{price} руб.
			</div>

			<div
				className={classes.city}
				id={_id}
				style={{ opacity: deleted ? '0.3' : '1' }}
			>
				{cities}
			</div>

			{active && (
				<div className={`${classes.status} ${classes.good}`} id={_id}>
					<a href={`/plant/details/${_id}`}>Объявление находится на сайте</a>
				</div>
			)}
			{waiting && (
				<div className={`${classes.status} ${classes.waiting}`} id={_id}>
					На модерации
				</div>
			)}
			{isDeleted && (
				<div className={`${classes.status} ${classes.deleted}`} id={_id}>
					Удален
				</div>
			)}
			{wooops && (
				<div className={`${classes.status} ${classes.wooops}`} id={_id}>
					Сообщите об этом объявлении администраторам
				</div>
			)}
		</div>
	);
};

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
