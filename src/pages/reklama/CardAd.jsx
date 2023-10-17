import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import config from '../../settings/settings';
import { useEffect } from 'react';
import ReklamaService from '../../services/Reklama';

const AdCard = (props) => {
	const navigate = useNavigate();
	// console.log('AdCard >>> ', props)
	const [ready, setReady] = useState(false);
	const [thisAd, setThisAd] = useState();

	// console.log(props)

	useEffect(() => {
		(async () => {
			const response = await ReklamaService.getReklamas();
			// console.log(response)
			for (let item of response.data) {
				if (item.card_place !== 0 && item.enabled == true) {
					setThisAd(item);
					// console.log('Card AD >>>>>>>>>> ', item)
				}
			}
		})();
		setReady(true);
	}, []);

	const handleAdv = (e) => {
		e.preventDefault();
		const _id = e.target.parentElement.id;
		// console.log(e)
		// console.log(_id)
		navigate(`/advertising/${props.id}`);
	};

	return (
		<>
			{ready && (
				<Card onClick={handleAdv} id={props.id}>
					<div className="adv-overlay">{props.overlay}</div>

					{props.preview_url && (
						<div className="img-div">
							<img
								src={`${config?.baseUrlUpload}/uploads/ad/${props.photo[0].filename}`}
								alt="card"
							/>
						</div>
					)}

					<div className="bottom">
						<div className="title">{props.title}</div>
						<div className="details">{props.card_text}</div>
						<div className="more">Подробнее</div>
					</div>
				</Card>
			)}
		</>
	);
};

export default AdCard;

const Card = styled.div`
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #f6f6f6;
	height: 440px;
	max-width: 368px;
	cursor: pointer;
	position: relative;
	-webkit-box-shadow: 0px 0px 7px 4px rgba(34, 60, 80, 0.2);
	-moz-box-shadow: 0px 0px 7px 4px rgba(34, 60, 80, 0.2);
	box-shadow: 0px 0px 7px 4px rgba(34, 60, 80, 0.2);

	font-family: 'Roboto', sans-serif;
	font-weight: 400;
	font-size: 18px;
	color: #333333;

	/* border-radius: ${(props) => (props.dash ? '5px' : null)}; */

	.line {
		text-decoration: underline;
	}

	@media screen and (max-width: 639px) {
		max-width: 380px;
	}

	@media screen and (max-width: 711px) {
		margin-bottom: 12px;
		border-radius: 10px;
		-webkit-box-shadow: 0px 0px 5px 0px rgba(34, 60, 80, 0.3);
		-moz-box-shadow: 0px 0px 5px 0px rgba(34, 60, 80, 0.3);
		box-shadow: 0px 0px 5px 0px rgba(34, 60, 80, 0.3);
	}

	.img-div {
		display: flex;
		width: 100%;
		/* height: 100%; */
		max-height: 230px;
		justify-content: center;
	}

	img {
		/* width: 100%; */
		height: 100%;
		/* max-height: 200px; */
	}

	.adv-overlay {
		display: flex;
		position: absolute;
		text-align: center;

		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		color: white;
		// background-color: #00000028;
		background-color: rgba(0, 0, 0, 0.4);
		align-items: center;
		justify-content: center;
		opacity: 0;
		cursor: pointer;
		font-size: 20px;

		:hover {
			opacity: 1;
		}
	}

	.bottom {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px;

		.title {
			display: flex;
			font-weight: 500;
			text-align: center;
			margin-top: 38px;
			max-height: 55px;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2; /* количество строк */
			-webkit-box-orient: vertical;
			display: -webkit-box;
		}

		.details {
			display: flex;
			text-align: center;
			font-weight: 300;
			font-size: 14px;
			margin-top: 15px;
			max-height: 45px;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2; /* количество строк */
			-webkit-box-orient: vertical;
			display: -webkit-box;
		}

		.more {
			display: flex;
			font-weight: 300;
			font-size: 18px;
			text-align: center;
			text-decoration-line: underline;
			color: #bfbfbf;
			margin-top: 22px;
		}
	}
`;
