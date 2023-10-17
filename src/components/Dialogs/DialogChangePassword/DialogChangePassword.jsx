import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const DialogChangePassword = ({
	open,
	setOpen,
	value,
	setValue,
	handleSubmit,
	variant,
}) => {
	const handleClose = () => {
		setOpen(false);
	};
	const handleClick = async () => {
		handleSubmit();
		setOpen(false);

		setValue('');
	};

	return (
		<>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>
					{variant === 'profile' ? 'Смена пароля' : 'Восстановление пароля'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{variant === 'profile' ? '' : 'Укажите вашу электронную почту.'} По
						этому адресу будет направлено электронное письмо со ссылкой для
						восстановления пароля.
					</DialogContentText>
					<TextField
						value={value}
						onChange={(e) => setValue(e.target.value)}
						autoFocus
						margin="dense"
						id="name"
						label={variant === 'profile' ? '' : 'Почта@mail.ru'}
						type="email"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Отменить</Button>
					<Button onClick={handleClick}>Подтвердить</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
