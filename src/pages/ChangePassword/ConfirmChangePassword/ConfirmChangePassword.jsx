import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { AuthContext } from '../../../hoc/AuthProvider';
import { RegexItem } from '../RegexItem/RegexItem';
import AuthService from '../../../services/AuthService';

import classes from './ConfirmChangePassword.module.css';

export const ConfirmChangePassword = () => {
	const { id } = useParams();
	const { store } = useContext(AuthContext);
	const navigate = useNavigate();
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	const [message, setMessage] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [checkRegex, setCheckRegex] = useState({
		capsLetterCheck: false,
		numberCheck: false,
		pwdLengthCheck: false,
		// specialCharCheck: false,
	});
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const hadleCheckPassword = (event) => {
		const { value } = event.target;
		const capsLetterCheck = /[A-Z]/.test(value);
		const numberCheck = /[0-9]/.test(value);
		const pwdLengthCheck = value.length >= 8;
		// const specialCharCheck = /[!@#$%^&*]/.test(value);
		setCheckRegex({
			capsLetterCheck,
			numberCheck,
			pwdLengthCheck,
			// specialCharCheck,
		});
		setPassword(value);
	};

	const handleChangeEmail = async (event) => {
		event.preventDefault();
		if (!checkRegex.pwdLengthCheck) {
			setMessage('Пароль должен содержать минимум 8 символов');
			return;
		} else if (!checkRegex.capsLetterCheck) {
			setMessage('Пароль должен содержать минимум 1 заглавную букву');
			return;
		} else if (!checkRegex.numberCheck) {
			setMessage('Пароль должен содержать минимум 1 цифру');
			return;
		}

		if (password === passwordRepeat) {
			setMessage('');
			try {
				const formData = new FormData();
				formData.append('password', password);
				if (store.isAuth) {
					const response = await AuthService.postUserNewPassword(formData);
					store.logout();
				} else {
					formData.append('id', id);
					const res = await AuthService.postNewPassword(formData);
				}

				navigate('/login');
			} catch (error) {
				console.error(error);
			}
		} else {
			setMessage('Пароли не совпадают');
		}
	};

	return (
		<div className={classes.body}>
			<div className={classes.wrapper}>
				<div className={classes.main}>
					<section className={classes.section}>
						<h1>Смена пароля</h1>
						<form className={classes.form}>
							<OutlinedInput
								type={showPassword ? 'text' : 'password'}
								className={classes.loginInput}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								placeholder="Введите пароль (8 символов и более)"
								name="password"
								required
								onChange={hadleCheckPassword}
								value={password}
							/>
							<RegexItem
								capsLetterCheck={checkRegex.capsLetterCheck}
								numberCheck={checkRegex.numberCheck}
								pwdLengthCheck={checkRegex.pwdLengthCheck}
								// specialCharCheck={checkRegex.specialCharCheck}
							/>
							<OutlinedInput
								type={showPassword ? 'text' : 'password'}
								className={classes.loginInput}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								placeholder="Подтвердите пароль"
								name="passwordRepeat"
								required
								onChange={(e) => setPasswordRepeat(e.target.value)}
								value={passwordRepeat}
							/>
							<div className="text-red-500 p-y-2 font-semibold">{message}</div>

							<button
								className={classes.btn}
								// onClick={() => store.login(email, password, navigate)}
								// onClick={(e) => handleLogin(e, email, password)}
								onClick={handleChangeEmail}
							>
								Подтвердить
							</button>
						</form>
					</section>
				</div>
			</div>
		</div>
	);
};
