import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PartnerService from '../../services/PartnerService';
import config from '../../settings/settings';
import background from '../../img/draft-background.jpg';

const PartnerDetails = () => {
	const [user, setUser] = useState();
	const [ready, setReady] = useState(false);
	const navigate = useNavigate();
	const {id} = useParams()

	useEffect(() => {
		const getPartner = async(id)=>{
			const response = await PartnerService.getUserInfo(id);
				setUser(response.data);
				setReady(true);
		}

		getPartner(id)
	}, []);

	return (
		<Wrapper1>
			<Wrapper2>
				<Body>
					{ready && (
						<div className="wrapper">
							<div className="header">
								<button onClick={() => navigate(-1)}>Назад</button>
							</div>
							<div className="image">
								{user?.logo__img?.length > 0 && (
									<img
										src={`${config?.baseUrlUpload}/uploads/logo/${user?.logo__img[0]?.filename}`}
										alt=""
									/>
								)}
							</div>
							<div className="info">
								<div className="title"> {user?.org}</div>
								<div className="common">{user?.name}</div>
								<div className="common">{user?.description}</div>
								<div className="common">г. {user?.cities}</div>
								{user?.html__href && (
									<a href={user?.html__href} target="_blank">
										<b>На сайт</b>
									</a>
								)}
							</div>
						</div>
					)}
				</Body>
			</Wrapper2>
		</Wrapper1>
	);
};

export default PartnerDetails;

const Wrapper1 = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	background-image: url(${background});
	background-repeat: no-repeat;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
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
`;

const Body = styled.div`
	display: flex;
	min-height: 15vh;
	color: black;
	justify-content: center;

	.wrapper {
		display: flex;
		flex-direction: column;
		max-width: 1440px;
		width: 100%;
		min-height: 60vh;
		margin: 0 15px;

		.header {
			margin: 30px 0;

			button {
				background: #00aeae;
				border-radius: 5px;
				padding: 10px 30px;

				font-family: 'Roboto', sans-serif;
				font-style: normal;
				font-weight: 400;
				font-size: 30px;
				line-height: 150.19%;
				text-align: center;
				letter-spacing: 0.005em;
				color: #ffffff;
			}
		}

		.image {
			display: flex;
			margin: 50px auto;
			width: 300px;

			img {
				width: 100%;
				margin-bottom: 30px;
			}
		}

		.info {
			display: flex;
			flex-direction: column;
			max-width: 1000px;
			margin: 0 auto;

			.title {
				font-family: 'Roboto', sans-serif;
				font-style: normal;
				font-weight: 500;
				font-size: 28px;
				line-height: 28px;
				color: #333333;
				text-align: center;
			}

			.common,
			.text {
				font-family: 'Roboto', sans-serif;
				font-style: normal;
				font-weight: 400;
				font-size: 22px;
				line-height: 28px;
				color: #525252;
				margin: 0;
				margin-top: 15px;
			}
		}

		a {
			background: #00aeae;
			border-radius: 5px;
			padding: 10px 15px;
			width: 130px;
			margin: 60px auto 100px;

			font-family: 'Roboto', sans-serif;
			font-style: normal;
			font-weight: 400;
			font-size: 22px;
			/* line-height: 19%; */
			text-align: center;
			letter-spacing: 0.005em;
			color: #ffffff;
		}
	}
`;
