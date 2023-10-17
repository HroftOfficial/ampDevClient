import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import { SkeletonProfileInfo } from '../../components/Skeletons/SkeletonProfileInfo/SkeletonProfileInfo';
import User from '../../services/User';
import { TomsModal } from './TomsModal';

const Profile = () => {
	const [tomsList, setTomsList] = useState([]);
	const [selected, setSelected] = useState([]);

	const [user, setUser] = useState([
		{
			logo__img: [],
			name: '',
			org: '',
			cities: '',
			inn: '',
			ogrn: '',
			email: '',
			html__href: '',
			description: '',
			tag: [],
			_id: '',
		},
	]);

	const [isLoading, setIsLoading] = useState(false);

	const matches = useMediaQuery('(max-width:1000px)');

	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const getInfo = async () => {
			try {
				setIsLoading(true);

				const toms = await User.getUsersTomsUnWind();
				const user = await User.getUser();
				// console.log('Vidi >>> ', vidi)
				// console.log('User >>> ', user);
				// store.setUserInfo(vidi.data);
				setIsLoading(false);
				setTomsList(toms.data);
				setUser(user?.data);
				setSelected(user.data.work_category);
				// store.setIsLoading(true);
			} catch (e) {
				console.error('Error >>> ', e);
			}
		};
		getInfo();
	}, []);

	const handleOpenMenu = (e) => {
		e.preventDefault();
		setShowModal(true);
	};

	window.onclick = (e) => {
		const modal = document.getElementById('vidiModal');
		if (e.target == modal) {
			setShowModal(false);
		}
	};

	// const filteredSelectArray = useMemo(() => {
	// 	const result = [];
	// 	listVidi?.forEach((group) =>
	// 		group.items.forEach((groupItem) => {
	// 			if (selected?.includes(groupItem?.id_name)) {
	// 				result.push(groupItem);
	// 			}
	// 		})
	// 	);
	// 	return result;
	// }, [selected]);

	const filteredToms = (arr) => {
		const result = arr.filter((el) =>
			selected.some((id) => el.items.id_name === id)
		);

		return result;
	};

	const filteredSelectArray = filteredToms(tomsList);

	if (isLoading) {
		return <SkeletonProfileInfo />;
	}

	return (
		<Body>
			<div className="context-wrapper">
				<div className="user-info">
					<h2>Профиль:</h2>
					<div className="info-wrapper">
						<div className="info-title">
							{user?.name && (
								<div className="title border">
									<span style={{ paddingRight: '10px' }}>
										<strong>Ответственное лицо:</strong>
									</span>
									<span className="title">{user.name}</span>
								</div>
							)}
							{user?.org && (
								<div className="title border">
									<span style={{ paddingRight: '10px' }}>
										<strong>Организация:</strong>
									</span>
									<span className="title">{user.org}</span>
								</div>
							)}
							{user?.cities && (
								<div className="title border">
									<span style={{ paddingRight: '10px' }}>
										<strong>Город:</strong>
									</span>
									<span className="title">{user.cities}</span>
								</div>
							)}
							{user?.inn && (
								<div className="title border">
									<span style={{ paddingRight: '10px' }}>
										<strong>ИНН:</strong>
									</span>
									<span className="title">{user.inn}</span>
								</div>
							)}
							{user?.ogrn && (
								<div className="title border">
									<span style={{ paddingRight: '10px' }}>
										<strong>ОГРН:</strong>
									</span>
									<span className="title">{user.ogrn}</span>
								</div>
							)}
							{user?.email && (
								<div className="title border">
									<span style={{ paddingRight: '10px' }}>
										<strong>Email:</strong>
									</span>{' '}
									<span className="title">{user.email}</span>
								</div>
							)}
							{user?.html__href && (
								<div className="title border">
									<span style={{ paddingRight: '10px' }}>
										<strong>Сайт:</strong>
									</span>
									<span className="title">{user.html__href}</span>
								</div>
							)}
						</div>
					</div>

					<div className="title">
						<span style={{ paddingRight: '10px' }}>
							<strong>Описание:</strong>
						</span>
						{user?.description}
					</div>
					<div className="title">
						<span style={{ paddingRight: '10px' }}>
							<strong>Ключевые теги:</strong>
						</span>
					</div>

					<div className="list-tegi">
						{user?.tag?.map((teg, index) => (
							<div key={index}>#{teg}</div>
						))}
					</div>

					<Link to="/profile/edit" className="action">
						Редактировать данные
					</Link>
					<Link
						className="action"
						style={{ color: '#00aeae' }}
						to={`/change_password/${user._id}`}
					>
						Сменить пароль
					</Link>
				</div>
				<div className="vidi-wrapper">
					<h2>Выполняемые виды мехобработки:</h2>

					<div className="list">
						{filteredSelectArray.map((el) => {
							return (
								<Chip
									label={el?.items?.name}
									variant="outlined"
									key={el?.items?.id_name}
								/>
							);
						})}
					</div>

					<VidiModal
						id="vidiModal"
						style={{ display: showModal ? 'block' : 'none' }}
					>
						<TomsModal
							selected={selected}
							setSelected={setSelected}
							setShowModal={setShowModal}
							postUsersToms={User.postUsersToms}
						/>
					</VidiModal>
					<button className="action" onClick={handleOpenMenu}>
						Редактировать виды мехобработки
					</button>
					<div className="bottom-label">
						Правильно установленные виды мехобработки помогают другим участникам
						найти Вас.
					</div>
				</div>
			</div>
		</Body>
	);
};

export default Profile;

const Body = styled.section`
	display: flex;
	color: #333333;
	font-family: 'Roboto', sans-serif;
	font-style: normal;
	font-weight: 400;

	@media screen and (max-width: 1200px) {
		flex-direction: column;
	}

	.info-wrapper {
		display: flex;

		.info-title {
			display: flex;
			flex-direction: column;
			padding-right: 30px;

			@media screen and (max-width: 480px) {
				padding-right: 10px;
			}
		}

		.info-content {
			display: flex;
			flex-direction: column;
		}

		.border {
			border: none;
			position: relative;

			::after {
				content: '';
				background-color: #bdbdbd;
				position: absolute;
				left: 0;
				bottom: 0;
				width: 210px;
				height: 1px;

				@media screen and (max-width: 550px) {
					display: none;
				}
			}
		}
	}

	.context-wrapper {
		display: flex;
		flex-direction: column;
		padding: 98px 66px 42px;
		max-width: 1200px;
		box-sizing: content-box;

		@media screen and (max-width: 768px) {
			padding: 68px 46px 42px;
		}

		@media screen and (max-width: 480px) {
			padding: 48px 16px 42px;
		}

		.user-info {
			display: flex;
			flex-direction: column;
			margin-bottom: 40px;
			font-size: 18px;

			.title {
				margin-top: 15px;
			}
		}

		.vidi-wrapper {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100%;
		}

		h2 {
			font-weight: 500;
			font-size: 24px;
		}

		.list-tegi {
			padding-top: 20px;
			column-count: 4;

			@media screen and (max-width: 860px) {
				column-count: 2;
			}

			@media screen and (max-width: 670px) {
				column-count: 1;
			}
		}

		.list {
			padding-top: 33px;
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
		}

		.action {
			display: flex;
			margin-top: 75px;
			font-size: 18px;
			text-align: center;
			text-decoration-line: underline;
			color: #bfbfbf;
		}

		.bottom-label {
			display: flex;
			margin-top: 30px;
			font-size: 18px;
			text-align: left;
			color: #bfbfbf;
		}
	}
`;

const VidiModal = styled.div`
	display: none; /* Hidden by default */
	position: fixed; /* Stay in place */
	z-index: 1; /* Sit on top */
	padding-top: 100px; /* Location of the box */
	left: 0;
	top: 0;
	width: 100%; /* Full widtsh */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: #000000ae; /* Black w/ opacity */
`;

const ItemLebel = styled.div`
	font-size: 18px;
	color: #525252;
	height: 42px;
`;
