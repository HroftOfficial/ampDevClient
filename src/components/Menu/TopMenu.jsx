import { AuthContext } from '../../hoc/AuthProvider';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import email from '../../img/email.svg';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import phone from '../../img/phone.svg';
import telegramm from '../..//img/telegramm.svg';
import styled from 'styled-components';
import Notifications from '../Chat/Notifications';

const TopMenu = () => {
	const { store } = useContext(AuthContext);

	return (
		<Body>
			<div>
				{/* <img src={email} alt="" /> */}
				<AlternateEmailOutlinedIcon sx={{ marginRight: '5px' }} />
				amp@copartner.ru
			</div>
			<div>
				<img src={phone} alt="" />
				+7 (863) 204-22-00
			</div>
			<Link to="registration" className="header__zayavka">
				Оставить заявку
			</Link>
			<a href="https://t.me/ampcanel_2021" className="header__telegramm">
				<img src={telegramm} alt="" className="tele-ico" />
			</a>
			{store.isAuth && <Notifications />}
		</Body>
	);
};

export default TopMenu;

const Body = styled.div`
	display: flex;
	color: white;
	align-items: center;
	justify-content: space-around;
	padding: 0 15px;
	gap: 10px;
	position: relative;

	div {
		display: flex;
	}

	img {
		margin-right: 10px;
	}

	a {
		color: #fdb97c;
		text-decoration-line: underline;
	}

	.tele-ico {
		width: 33px;
		height: 33px;
		margin: 0;
	}

	@media screen and (max-width: 992px) {
		flex-wrap: wrap;
		gap: 10px;

		::after {
			content: '';
			display: flex;
			width: 100%;
			height: 2px;
			background-color: white;
		}
	}

	@media screen and (max-width: 550px) {
		font-size: 14px;

		::after {
			height: 1px;
		}
	}
`;
