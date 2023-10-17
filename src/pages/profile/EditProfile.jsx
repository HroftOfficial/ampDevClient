import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SkeletonProfileEditInfo } from '../../components/Skeletons/SkeletonProfileEditInfo/SkeletonProfileEditInfo';
import { textUrl, getTagByCount } from '../../utils/services';
import User from '../../services/User';

const EditProfile = () => {
	const navigate = useNavigate();

	const [message, setMessage] = useState('');

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
			tag_count: 0,
			_id: '',
		},
	]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getUser = async () => {
			try {
				setIsLoading(true);
				const user = await User.getUser();
				console.log(user);
				setIsLoading(false);
				setUser(user?.data);
			} catch (e) {
				console.error('Error >>> ', e);
			}
		};
		getUser();
	}, []);

	const handleSubmite = async (e) => {
		try {
			e.preventDefault();

			const photo = e.target.form[0].files;
			// console.log(photo);
			if (!textUrl(user?.html__href)) {
				setMessage('Некорректная ссылка на сайт');
				return;
			}

			if (photo[0] && photo[0]?.size > 1000000) {
				setMessage('Слишком тяжелое фото');
				return;
			}
			// const dataToUpload = { name, org, cities, inn, ogrn, description };
			// console.log(dataToUpload);

			const formData = new FormData();
			// formData.append("name", name);
			// formData.append("org", org);
			// formData.append("inn", inn);
			// formData.append("cities", cities);
			// formData.append("ogrn", ogrn);
			formData.append('description', user?.description);
			formData.append('html__href', user?.html__href);

			Object.values(user?.tag).forEach((file) => {
				formData.append('tag', file);
			});

			Object.values(user?.logo__img).forEach((file) => {
				formData.append('logo__img', file);
			});

			if (user?.tag.length > user?.tag_count) return;

			const responseUser = await User.updateUser(formData);

			// console.log('responseUser >> ', responseUser);

			navigate('/profile');
		} catch (e) {
			console.error('Error >>> ', e);
		}
	};

	const handleChange = (e) => {
		setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleDelete = (index) => {
		const newArr = [...user.tag];
		newArr.splice(index, 1);
		setUser((prev) => ({ ...prev, tag: newArr }));

		// const tempSelectedText = user?.tag.slice();
		// tempSelectedText.splice(id, 1);

		// setTag(tempSelectedText);!!!!
	};

	const handleAddTeg = (e) => {
		e.preventDefault();
		const newTeg = e.target.form[0].value;
		if (user?.tag.length >= user?.tag_count) return;
		if (newTeg < 1) return;
		const newArray = user?.tag.slice();
		newArray.push(newTeg);
		setUser((prev) => ({ ...prev, tag: newArray }));
		// setTag(newArray);
		setInputTegi('');
	};

	const [inputTegi, setInputTegi] = useState('');

	if (isLoading) {
		return <SkeletonProfileEditInfo />;
	}

	return (
		<Body>
			<div className="context-wrapper ">
				<h2>Редактирование данных</h2>
				<Forma>
					<div className="top">
						<input
							type="file"
							title="Загрузите фото до 1 Мб"
							style={{ border: 'none' }}
						/>
						<input
							placeholder="ФИО"
							title="ФИО"
							disabled
							name="name"
							value={`ФИО: ${user?.name}`}
							onChange={handleChange}
						/>
						<input
							placeholder="Организация"
							title="Организация"
							disabled
							name="org"
							value={`Организация: ${user?.org}`}
							onChange={handleChange}
						/>
						<input
							placeholder="Город"
							title="Город"
							name="cities"
							disabled
							value={`Город: ${user?.cities}`}
							onChange={handleChange}
						/>
						{!!user?.inn && (
							<input
								placeholder="ИНН"
								title="ИНН"
								disabled
								name="inn"
								value={`ИНН: ${user?.inn}`}
								onChange={handleChange}
							/>
						)}
						{!!user?.ogrn && (
							<input
								placeholder="ОГРН"
								title="ОГРН"
								disabled
								name="ogrn"
								value={`ОГРН: ${user?.ogrn}`}
								onChange={handleChange}
							/>
						)}

						<input
							placeholder="Сайт: https://www.example.ru"
							title="Сайт"
							name="html__href"
							value={user?.html__href}
							onChange={handleChange}
						/>
					</div>

					<textarea
						placeholder="Описание организации"
						title="Описание организации"
						value={user?.description}
						name="description"
						onChange={handleChange}
					></textarea>

					<p
						style={{
							color: 'red',
							margin: 10,
							fontSize: 20,
							textAlign: 'center',
						}}
					>
						{message}
					</p>

					{user?.tag?.length > 0 && (
						<div className="toms">
							<h3>Ключевые теги компании:</h3>
							{user?.tag?.map((item, index) => (
								<div className="tom">
									<div id={index}>#{item}</div>
									<div className="close" onClick={() => handleDelete(index)}>
										&times;
									</div>
								</div>
							))}
						</div>
					)}
					<h4 style={{ marginTop: '20px' }}>
						Вам доступно {getTagByCount(user?.tag_count - user?.tag?.length)}
						{/* {user?.tag_count - user?.tag?.length == '0' && ' тегов.'}
						{user?.tag_count - user?.tag?.length == '1' && ' тег.'}
						{user?.tag_count - user?.tag?.length == '2' && ' тега.'}
						{user?.tag_count - user?.tag?.length == '3' && ' тега.'}
						{user?.tag_count - user?.tag?.length == '4' && ' тега.'}
						{user?.tag_count - user?.tag?.length > '4' && ' тегов.'} */}
					</h4>

					<h4 style={{ marginTop: '20px' }}>
						По этим уникальным тегам остальные участники ассоциации смогут вас
						найти во вкладке Участники и партнеры.
						<br /> Чтобы получить получить больше тегов напишите нам на почту:
						amp@copartner.ru
					</h4>

					<FormaTega>
						<div className="hashTeg">#</div>
						<input
							className="inputTega"
							placeholder="добавитьТег"
							value={inputTegi}
							onChange={(e) => setInputTegi(e.target?.value)}
						/>
						<button className="buttonTega" onClick={handleAddTeg}>
							Добавить
						</button>
					</FormaTega>

					<button onClick={handleSubmite}>Сохранить</button>
				</Forma>
			</div>
		</Body>
	);
};

export default EditProfile;

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
		padding: 98px 66px 42px;
		max-width: 1200px;
		box-sizing: content-box;

		@media screen and (max-width: 768px) {
			padding: 68px 46px 42px;
		}

		@media screen and (max-width: 480px) {
			padding: 48px 16px 42px;
		}
	}

	h2 {
		margin-bottom: 20px;
		font-weight: 500;
		font-size: 24px;
		color: #333333;

		@media screen and (max-width: 480px) {
			font-size: 20px;
		}
	}

	.form-photo {
		display: flex;
		flex-direction: column;

		button {
			display: flex;
			margin-top: 35px;
			font-size: 20px;
			text-align: center;
			text-decoration-line: underline;
			color: #00aeae;
		}
	}
`;

const Forma = styled.form`
	display: flex;
	flex-direction: column;
	margin-top: 30px;

	.toms {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 20px;
		align-items: center;

		.tom {
			display: flex;
			border: 2px solid #bfbfbf;
			padding: 10px 20px;
			border-radius: 5px;
			align-items: center;
			font-size: 18px;
			color: black;
			height: 50px;

			@media screen and (max-width: 480px) {
				font-size: 16px;
			}

			.close {
				color: black;
				float: right;
				font-size: 35px;
				margin-left: 20px;

				@media screen and (max-width: 768px) {
				}
			}

			.close:hover,
			.close:focus {
				color: #00aeae;
				text-decoration: none;
				cursor: pointer;
			}
		}

		h3 {
			font-weight: 500;
			font-size: 22px;
			color: #333333;

			@media screen and (max-width: 480px) {
				font-size: 18px;
			}
		}
	}

	.top {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;

		@media screen and (max-width: 815px) {
			flex-wrap: nowrap;
			flex-direction: column;
			width: 100%;
		}
		@media screen and (max-width: 480px) {
			gap: 0;
		}
	}

	input {
		padding: 20px 30px;
		border: 2px solid #bfbfbf;
		border-radius: 5px;
		outline: none;
		width: 49.1%;
		color: black;

		@media screen and (max-width: 480px) {
			font-size: 16px;
			padding: 10px 20px;
			border: 1px solid #bfbfbf;
			margin-top: 20px;
		}

		@media screen and (max-width: 1660px) {
			width: 49%;
		}
		@media screen and (max-width: 1550px) {
			width: 48.9%;
		}
		@media screen and (max-width: 1460px) {
			width: 48.8%;
		}
		@media screen and (max-width: 1384px) {
			width: 48.7%;
		}
		@media screen and (max-width: 1320px) {
			width: 48.6%;
		}
		@media screen and (max-width: 1268px) {
			width: 48.5%;
		}
		@media screen and (max-width: 1268px) {
			width: 100%;
		}
	}

	textarea {
		padding: 25px 21px;
		font-size: 18px;
		color: black;
		border: 2px solid #bfbfbf;
		border-radius: 5px;
		width: 100%;
		height: 200px;
		margin-top: 20px;
		resize: none;
		outline: none;

		@media screen and (max-width: 480px) {
			font-size: 16px;
			padding: 10px 20px;
			border: 1px solid #bfbfbf;
		}
	}

	button {
		display: flex;
		width: 340px;
		height: 67px;
		align-items: center;
		justify-content: center;
		background: #00aeae;
		border-radius: 5px;
		margin: 0 auto;
		margin-top: 50px;

		font-size: 24px;
		text-align: center;
		color: #ffffff;

		@media screen and (max-width: 480px) {
			width: 240px;
			font-size: 22px;
		}
	}
`;

const FormaTega = styled.form`
	display: flex;
	align-items: center;
	position: relative;
	margin: 0 auto;
	margin-top: 40px;
	font-family: 'Roboto', sans-serif;
	font-style: normal;
	font-weight: 400;

	@media screen and (max-width: 480px) {
		flex-direction: column;
	}

	.inputTega {
		display: flex;
		border: 2px solid #bfbfbf;
		padding: 10px 30px;
		border-radius: 5px;
		align-items: center;
		max-width: 400px;
		width: 100%;
		font-size: 18px;
		color: black;

		@media screen and (max-width: 480px) {
			font-size: 16px;
		}
	}

	.hashTeg {
		position: absolute;
		top: 12px;
		left: 14px;
		font-size: 18px;

		@media screen and (max-width: 480px) {
			font-size: 16px;
			top: 32px;
		}
	}

	.buttonTega {
		height: 42px;
		width: 200px;
		margin: 0;
		margin-left: 30px;

		@media screen and (max-width: 480px) {
			margin-top: 30px;
			margin-left: 0;
		}
	}
`;
