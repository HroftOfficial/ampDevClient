import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../hoc/AuthProvider';
import MenuList from '../Menu/MenuList';
import menuData from '../../utils/menu';
import menuDataPrivate from '../../utils/menu__private';
import CustomLink from '../CustomLink/CustomLink';
import logo from '../../img/logo.svg';
import styled from 'styled-components';
import phoneIco from '../../img/phone.svg';
import mailIco from '../../img/email.svg';
import telegrammIco from '../../img/telegramm.svg';

const Footer = () => {
	const { store } = useContext(AuthContext);
	let navigate = useNavigate();

	return (
		<FooterWraper>
			<FooterDecktop>
				<Link to="/">
					<img src={logo} alt="" />
				</Link>

				<div className="footer__center">
					{store.isAuth ? (
						<MenuList data={menuDataPrivate} />
					) : (
						<MenuList data={menuData} />
					)}

					{/* <div className="self-end lg:text-sm lg:pr-4 lg:py-4 xl:text-lg">
                    <Link to="/lk" className="text-green-450">
                        <span className="inline-block">
                            <img src="/img/lk.svg" alt="" className="w-4"/>
                        </span>
                        Вход в ЛК
                    </Link>
                </div> */}
				</div>

				<div className="footer__info">
					<div className="info__line">
						<AlternateEmailOutlinedIcon sx={{ marginRight: '5px' }} />
						{/* <img src={mailIco} alt="" /> */}
						amp@copartner.ru
					</div>

					<div className="info__line">
						<img src={phoneIco} alt="" />
						+7 (863) 204-22-00
					</div>

					<div className="info__line">
						{/* <div className="inline-block">
                        <a href="/" className="py-2 inline-block">
                            <img src="/img/facebook.svg" alt="" className="w-6 md:w-7"/>
                        </a>
                    </div> */}
						<div className="info__telegramm">
							<a href="https://t.me/ampcanel_2021">
								<img src={telegrammIco} alt="" />
							</a>
						</div>
					</div>
					{store.isAuth ? (
						<Button
							variant="outlined"
							startIcon={<LogoutIcon sx={{ color: 'white' }} />}
							sx={{
								color: '#00AEAE',
								border: '1px solid #00AEAE',
								'&.MuiButton-root:hover': {
									border: '1px solid #00AEAE',
								},
							}}
							onClick={() => store.logout(navigate)}
						>
							Выход
						</Button>
					) : (
						<Button
							variant="outlined"
							startIcon={<LoginIcon sx={{ color: 'white' }} />}
							sx={{
								color: '#00AEAE',
								border: '1px solid #00AEAE',
								'&.MuiButton-root:hover': {
									border: '1px solid #00AEAE',
								},
							}}
							onClick={() => navigate('/login')}
						>
							Вход
						</Button>
					)}
				</div>
			</FooterDecktop>

			<FooterTablet>
				<div className="footer__center">
					{store.isAuth ? (
						<MenuList data={menuDataPrivate} />
					) : (
						<MenuList data={menuData} />
					)}

					{/* <div className="self-end lg:text-sm lg:pr-4 lg:py-4 xl:text-lg">
                    <Link to="/lk" className="text-green-450">
                        <span className="inline-block">
                            <img src="/img/lk.svg" alt="" className="w-4"/>
                        </span>
                        Вход в ЛК
                    </Link>
                </div> */}
				</div>
				<div className="bottomTablet">
					<Link to="/">
						<img src={logo} alt="" className="logo" />
					</Link>

					<div className="footer__info">
						<div className="info__line">
							<img src={mailIco} alt="" />
							amp@copartner.ru
						</div>

						<div className="info__line">
							<img src={phoneIco} alt="" />
							+7 (863) 204-22-00
						</div>

						<div className="info__line">
							{/* <div className="inline-block">
                            <a href="/" className="py-2 inline-block">
                                <img src="/img/facebook.svg" alt="" className="w-6 md:w-7"/>
                            </a>
                        </div> */}
							<div className="info__telegramm">
								<a href="https://t.me/ampcanel_2021">
									<img src={telegrammIco} alt="" />
								</a>
							</div>
						</div>
						{store.isAuth ? (
							<Button
								variant="outlined"
								startIcon={<LogoutIcon sx={{ color: 'white' }} />}
								sx={{
									color: '#00AEAE',
									border: '1px solid #00AEAE',
									'&.MuiButton-root:hover': {
										border: '1px solid #00AEAE',
									},
								}}
								onClick={() => store.logout(navigate)}
							>
								Выход
							</Button>
						) : (
							<Button
								variant="outlined"
								startIcon={<LoginIcon sx={{ color: 'white' }} />}
								sx={{
									color: '#00AEAE',
									border: '1px solid #00AEAE',
									'&.MuiButton-root:hover': {
										border: '1px solid #00AEAE',
									},
								}}
								onClick={() => navigate('/login')}
							>
								Вход
							</Button>
						)}
					</div>
				</div>
			</FooterTablet>

			<FooterMobile>
				<div className="mb-10">
					<img src={logo} alt="" className="w-50" />
				</div>

				<div className="contact">
					<img src={phoneIco} alt="" className="w-6" />
					+7 (863) 204-22-00
				</div>

				<div className="contact">
					<img src={mailIco} alt="" className="w-6" />
					amp@copartner.ru
				</div>

				{store.isAuth ? (
					<Button
						variant="outlined"
						startIcon={<LogoutIcon sx={{ color: 'white' }} />}
						sx={{
							color: '#00AEAE',
							border: '1px solid #00AEAE',
							'&.MuiButton-root:hover': {
								border: '1px solid #00AEAE',
							},
						}}
						onClick={() => store.logout(navigate)}
					>
						Выход
					</Button>
				) : (
					<Button
						variant="outlined"
						startIcon={<LoginIcon sx={{ color: 'white' }} />}
						sx={{
							color: '#00AEAE',
							border: '1px solid #00AEAE',
							'&.MuiButton-root:hover': {
								border: '1px solid #00AEAE',
							},
						}}
						onClick={() => navigate('/login')}
					>
						Вход
					</Button>
				)}

				{/* <div className="py-4">
                <a href="/" className="text-xl">
                    <span className="inline-block">
                        <img src={mailIco} alt="" className="w-6" />
                    </span>
                    amp@copartner.ru
                </a>
            </div> */}

				{/* <!-- in --> */}
				{/* <div className="py-4">
                <a href="/" className="text-xl text-green-450">
                    <span className="inline-block">
                        <img src="/img/lk.svg" alt="" className="w-5" />
                    </span>
                    Вход в ЛК
                </a>
            </div> */}
				{/* <!-- telegram  -->
            <!-- fb --> */}

				<a href="https://t.me/ampcanel_2021" className="telega-wraper">
					<img src={telegrammIco} alt="" className="w-12" />
				</a>

				<div className="flex items-center flex-wrap pt-8 lg:hidden">
					<ul className="flex-col items-center justify-between text-base space-y-2">
						{menuData.map((p) => (
							<li key={p.id}>
								<CustomLink
									className="inline-block pr-2 hover:text-green-200"
									to={p.url}
								>
									{p.title}
								</CustomLink>
							</li>
						))}
					</ul>
				</div>
			</FooterMobile>
		</FooterWraper>
	);
};

export default Footer;

const FooterWraper = styled.footer`
	width: 100%;
	background: #4b525c;
	color: white;
	padding: 70px 26px;
	justify-content: center;
	display: flex;

	@media screen and (max-width: 480px) {
		padding: 50px 26px;
	}
`;

const FooterDecktop = styled.div`
	display: flex;
	max-width: 1440px;
	width: 100%;
	justify-content: space-between;
	.footer__center {
		display: flex;
		flex-direction: column;
		/* margin: 0 auto; */
		max-width: 900px;
		box-sizing: content-box;
		width: 100%;
		padding: 0 20px;
		margin-top: 10px;
	}
	.footer__logo {
		width: 100%;
		max-width: 208px;
	}

	.footer__info {
		display: flex;
		flex-direction: column;
		width: 195px;

		font-family: 'Ubuntu', sans-serif;
		font-style: normal;
		font-weight: 500;
		font-size: 18px;
		line-height: 21px;

		div img {
			margin-right: 10px;
		}
	}

	.info__line {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 9px;
		width: 195px;
	}

	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const FooterMobile = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media screen and (min-width: 480px) {
		display: none;
	}

	.contact {
		margin: 0 auto;
		display: flex;
		margin-bottom: 30px;
		font-size: 18px;

		img {
			margin-right: 10px;
		}
	}

	.telega-wraper {
		margin: 0 auto;
		/* margin-right: auto; */
		width: 33px;
		height: 33px;
		margin-top: 30px;
	}

	.logo {
		width: 300px;
	}
`;

const FooterTablet = styled.div`
	display: none;
	flex-direction: column;
	justify-content: center;

	.bottomTablet {
		display: flex;
		justify-content: space-around;
		margin-top: 30px;
	}

	@media (min-width: 480px) and (max-width: 768px) {
		display: flex;
	}

	.footer__info {
		display: flex;
		flex-direction: column;
		width: 195px;

		font-family: 'Ubuntu', sans-serif;
		font-style: normal;
		font-weight: 500;
		font-size: 18px;
		line-height: 21px;

		div img {
			margin-right: 10px;
		}
	}

	.info__line {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 9px;
		width: 195px;
	}

	.logo {
		width: 200px;
	}
`;
