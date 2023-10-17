import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../../hoc/useAuth';
import { AuthContext } from '../../hoc/AuthProvider';
import AuthService from '../../services/AuthService';
import background from '../../img/draft-background.jpg';
import { DialogChangePassword } from '../../components/Dialogs/DialogChangePassword/DialogChangePassword';
import { ChatContext } from '../../context/ChatContext';
import $api from '../../http';

import classes from './Login.module.css';

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { signin } = useAuth();

	const fromPage = location.state?.from?.pathname || '/';

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const user = form.username.value;

		signin(user, () => navigate(fromPage, { replace: true }));
	};

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [recoveryEmail, setRecoveryEmail] = useState('');
	const [dialogOpen, setDialogOpen] = useState(false);
	const { store, setAuth } = useContext(AuthContext);
	const [errCookie, setErrCookie] = useState(false);

	const { setNotifications } = useContext(ChatContext);

	const checkCookie = () => {
		if (!navigator.cookieEnabled) {
			setErrCookie(true);
			setMessage('Работа с cookie отключена');
		}
	};

	useEffect(() => {
		checkCookie();
	}, []);

	const newMessage = async () => {
		try {
			const response = await $api.get('/messages/init');
			// console.log("<<<new Message>>>", response.data);
			if (response?.data.length > 0) {
				const notes = response.data.map((el) => {
					const newNote = {
						date: el.createdAt,
						isRead: false,
						senderId: el.senderId,
					};
					return newNote;
				});
				setNotifications((prev) => [...prev, ...notes]);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleLogin = async (e, email, password) => {
		try {
			e.preventDefault();
			setMessage('');
			store.isLoading = true;
			if (email.trim() && password.trim()) {
				const response = await AuthService.login(email, password);

				const email2 = response.data?.user?.email;
				const fio = response.data?.user?.name;
				const userId = response.data?.user?._id;
				localStorage.setItem('token', response.data.accessToken);
				store.setAuth(true);
				store.setUser(response?.data?.user);
				setAuth({ email2, fio, userId });
				// store.newMessage();
				newMessage();
				navigate('/draft/1');
			}
		} catch (error) {
			if (error?.response?.status === 429) {
				setMessage(
					'С вашего IP адреса поступило много неверных сведений. Доступ к авторизации заблокирован на 1 минуту.'
				);
			} else if (error?.response?.status === 400) {
				setMessage('Неверный логин или пароль');
			} else {
				setMessage(error?.response?.data?.message);
			}
		} finally {
			store.isLoading = false;
		}
	};

	const handleRecoverEmail = async () => {
		const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (regex.test(recoveryEmail)) {
			try {
				const formData = new FormData();
				formData.append('email', recoveryEmail);
				const response = await AuthService.postChangePassword(formData);
				setMessage(response?.data?.message);
			} catch (error) {
				console.error(error);
			}
		} else {
			setMessage('Неккоректный адрес почты');
		}
	};

	const handleClickOpen = () => {
		setDialogOpen(true);
	};

	return (
		<div className={classes.body}>
			<DialogChangePassword
				open={dialogOpen}
				setOpen={setDialogOpen}
				value={recoveryEmail}
				setValue={setRecoveryEmail}
				handleSubmit={handleRecoverEmail}
			/>
			<div className={classes.wrapper}>
				<div className={classes.main}>
					<section className={classes.section}>
						<h1>вход в личный кабинет</h1>
						<form className={classes.form}>
							<input
								type="email"
								className={classes.loginInput}
								placeholder="Введите email"
								inputMode="email"
								name="email"
								required
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>

							<input
								type="password"
								className={classes.loginInput}
								placeholder="Введите пароль"
								name="password"
								required
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
							<p className={classes.registrationLink} onClick={handleClickOpen}>
								Забыли пароль?
							</p>

							<button
								className={classes.btn}
								// onClick={() => store.login(email, password, navigate)}
								disabled={errCookie}
								onClick={(e) => handleLogin(e, email?.trim(), password?.trim())}
							>
								Вход
							</button>
							<div className="text-red-500 p-y-2 font-semibold">{message}</div>
						</form>
						<div className={classes.registrationBlock}>
							<p>Нет аккаунта?</p>
							<Link to="/registration" className={classes.registrationLink}>
								Зарегистрируйтесь
							</Link>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Login;

