import React from 'react';
import styled from 'styled-components';
import starIco from '../../img/star-active-white.svg';
import starIco2 from '../../img/star-white.svg';

const FindBlock = ({
	handleAutoFind,
	query,
	handlerQuery,
	stateMeh,
	xTotal,
	isAutofind,
	path,
	subject,
}) => {
	const modal = document.getElementById('findModal');

	const handleOpenMenu = (e) => {
		if (modal) {
			modal.style.display = 'block';
		}
	};

	let index = [];

	for (let key in stateMeh) {
		if (stateMeh[key] === true) index.push(key);
	}

	const needFavorite = window.location.pathname.split('/').splice(-2, 1)[0];

	return (
		<Body>
			{subject ? (
				<></>
			) : (
				<>
					<Form>
						<input
							type="text"
							placeholder="Введите название, номер заявки или город"
							onChange={handlerQuery}
							value={query}
							id="form-input"
						/>
					</Form>
					<Filters>
						{isAutofind && <div className="index-auto">✓</div>}
						<button
							title="Для автоматического подбора нам нужно знать ваши предпочтения. Становитесь нашим партнером и мы сможем рекомендовать вам интересующие вас группы заказов."
							onClick={handleAutoFind}
							className={needFavorite == 'opendraft' && 'disabled'}
							disabled={needFavorite == 'opendraft' && true}
						>
							Автоматический подбор
						</button>
						<button onClick={handleOpenMenu}>Поиск вручную</button>
						{index?.length > 0 && !isAutofind ? (
							<div className="index">{index?.length}</div>
						) : null}
					</Filters>
				</>
			)}

			<FindedBlock>
				<Finded>
					<span>Найдено &nbsp;</span> {xTotal} элементов
				</Finded>
				{needFavorite !== 'opendraft' ? (
					<a className="favorite-btn" href={`/profile/${path}`}>
						<div className="favorite-img" />
						Избранное
					</a>
				) : null}
			</FindedBlock>
		</Body>
	);
};

export default FindBlock;

const FindedBlock = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
	align-items: center;

	.favorite-btn {
		display: flex;
		background: #00aeae;
		cursor: pointer;
		font-size: 18px;
		align-items: center;
		padding: 8px 15px;
		justify-content: center;

		.favorite-img {
			display: flex;
			background-image: url(${starIco});
			background-size: cover;
			height: 25px;
			width: 25px;
			margin-right: 10px;

			:hover {
				background-image: url(${starIco2});
			}

			@media screen and (max-width: 480px) {
				height: 20px;
				width: 20px;
			}
		}

		@media screen and (max-width: 480px) {
			font-size: 16px;
		}
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	padding: 40px 0 20px;

	@media screen and (max-width: 830px) {
		padding: 24px 0;
	}
`;

const Filters = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	position: relative;

	#auto-btn {
		background: #808080;
		cursor: auto;
	}

	button {
		background: #00aeae;
		cursor: pointer;
		font-family: 'Ubuntu', sans-serif;
		width: 48%;
		height: 49px;
		margin-top: 18px;

		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		line-height: 21px;
		text-align: center;
		color: #ffffff;

		@media screen and (max-width: 480px) {
			font-size: 16px;
		}
	}

	.disabled {
		background: gray;
		cursor: auto;
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
		top: 3px;
		right: -15px;
		padding-left: 1px;
	}

	.index-auto {
		display: flex;
		height: 30px;
		width: 30px;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		background: tomato;
		position: absolute;
		top: 3px;
		left: -15px;
		padding-left: 1px;
	}
`;

const Form = styled.form`
	display: flex;
	width: 100%;

	input {
		width: 100%;
		padding: 14px 14px 14px 33px;
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

	button {
		width: 25%;
		background: #00aeae;

		font-family: 'Ubuntu', sans-serif;
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		line-height: 21px;
		text-align: center;
		color: #ffffff;
	}
`;

const Finded = styled.div`
	display: flex;
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

	@media screen and (max-width: 480px) {
		flex-direction: column;
	}
`;
