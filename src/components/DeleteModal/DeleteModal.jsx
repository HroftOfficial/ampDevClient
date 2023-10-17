import { IconButton, Button, Modal, Box, Typography } from '@mui/material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export const DeleteModal = ({
	open,
	setOpen,
	name,
	subject,
	handleDelete,
	_id,
	fileName,
}) => {
	const handleClose = () => {
		setOpen(false);
	};
	const handleDeleteModal = () => {
		if (_id) {
			handleDelete(_id);
		} else {
			handleDelete(fileName);
		}
		handleClose();
	};
	return (
		<Modal
			open={open}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Удалить {`"${name}"`}
				</Typography>
				{subject === 'file' ? (
					<Typography id="modal-modal-description" sx={{ mt: 1 }}>
						Отменить данное действие будет невозможно
					</Typography>
				) : (
					<Typography id="modal-modal-description" sx={{ mt: 1 }}>
						При восстановлении объявление будет автоматически направлено на
						модерацию
					</Typography>
				)}

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						mt: 1,
					}}
				>
					<Button variant="contained" onClick={handleClose}>
						Отмена
					</Button>
					<Button variant="outlined" color="error" onClick={handleDeleteModal}>
						подтвердить
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};
