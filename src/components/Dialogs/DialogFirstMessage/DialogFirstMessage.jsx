import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { FileChip } from '../../Chat/components/FileChip/FileChip';

import classes from './DialogFirsMessage.module.css';

export const DialogFirstMessage = ({
	open,
	onClose,
	textValue,
	setTextValue,
	handleSend,
	title,
	details,
	filesList,
	setFilesList,
	variant,
}) => {
	const handleFileChange = (e) => {
		setFilesList((prevState) => [...prevState, ...e.target.files]);
	};

	const files = filesList ? [...filesList] : [];
	return (
		<>
			<Dialog open={open} onClose={onClose}>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<DialogContentText
						style={{
							paddingBottom: '20px',
							fontWeight: '600',
							fontSize: '1.2rem',
						}}
					>
						{details}
					</DialogContentText>
					<TextareaAutosize
						aria-label="minimum height"
						minRows={12}
						id="text"
						value={textValue}
						onChange={(e) => setTextValue(e.target.value)}
						// placeholder="Minimum 3 rows"
						style={{
							width: '100%',
							border: '1px solid #00AEAE',
							borderRadius: '6px',
							margin: 'auto',
							padding: '10px',
						}}
					/>

					<FileChip files={files} setFiles={setFilesList} />
				</DialogContent>
				<DialogActions
					sx={{
						display: 'flex',
						justifyContent: filesList ? 'space-between' : 'flex-end',
					}}
				>
					{filesList && (
						<div className={classes.filesUpload}>
							<label for="file-input" style={{ cursor: 'pointer' }}>
								<UploadFileIcon />
								ПРИКРЕПИТЬ ФАЙЛ {variant === 1 && '(Макс 5шт)'}
							</label>

							<input
								id="file-input"
								type="file"
								onChange={handleFileChange}
								multiple
								accept=".jpg, .jpeg, .png, .pdf, .doc, .xls"
								// {...getInputProps()}
							/>
						</div>
					)}
					{variant === 1 ? (
						<>
							{files.length > 5 && (
								<p className={classes.warningFile}>До 5 файлов!</p>
							)}
						</>
					) : null}
					<div>
						<Button onClick={onClose}>Отменить</Button>
						<Button
							onClick={handleSend}
							disabled={variant === 1 && files.length > 5 ? true : false}
						>
							Отправить
						</Button>
					</div>
				</DialogActions>
			</Dialog>
		</>
	);
};
