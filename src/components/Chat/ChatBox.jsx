import { useRef, useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { AuthContext } from '../../hoc/AuthProvider';
import { ChatContext } from '../../context/ChatContext';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
import { postFiles } from '../../utils/services';
import config from '../../settings/settings';
import { TextFieldEmoji } from './components/TextFieldEmoji/TextFieldEmoji';
import { SkeletonMessages } from '../Skeletons/SkeletonMessages/SkeletonMessages';
import { Message } from './components/Message/Message';
import { FileChip } from './components/FileChip/FileChip';

import classes from './chatBox.module.css';

const { filesUrl } = config;

const skeletonArr = [...Array(3).keys()];

const ChatBox = () => {
	// const { auth } = useContext(AuthContext);
	// const user = { _id: auth.userId, name: auth.fio };
	const { store } = useContext(AuthContext);
	const user = { _id: store?.user?._id, name: store?.user?.name };
	const { currentChat, messages, sendTextMessage, isMessagesLoading } =
		useContext(ChatContext);
	// console.log('ChatBox recipientUser', messages);
	const { recipientUser } = useFetchRecipientUser(currentChat, user);
	const [textMessage, setTextMessage] = useState('');
	const scroll = useRef();

	const [filesList, setFilesList] = useState([]);

	const files = filesList ? [...filesList] : [];

	// const { getRootProps, getInputProps, isDragActive } = useDropzone({
	// 	onDrop: (acceptedFiles, fileRejections) => {
	// 		const newFile = acceptedFiles.map((file) =>
	// 			Object.assign(file, { preview: URL.createObjectURL(file) })
	// 		);
	// 		setFilesList((prevState) => [...prevState, ...newFile]);
	// 	},
	// });

	const handleFileChange = (e) => {
		setFilesList((prevState) => [...prevState, ...e.target.files]);
	};

	const handleSendFiles = async () => {
		try {
			for (const key in filesList) {
				if (Object.hasOwnProperty.call(filesList, key)) {
					const formData = new FormData();
					const element = filesList[key];
					formData.append('files', element);
					const response = await postFiles(formData);
					// const response = await axios.post(
					// 	`http://localhost:7700/files/multiple`,
					// 	formData
					// );
					const pathFile = `${filesUrl}/files/${response?.data[0]?.filename}`;
					const realNameFile = element?.name;
					sendTextMessage(
						textMessage,
						user,
						currentChat._id,
						setTextMessage,
						pathFile,
						realNameFile
					);

					setFilesList([]);
				}
			}
			sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		scroll.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
		});
	}, [messages]);

	const handleSendMessage = () => {
		if (textMessage.trim() && !filesList.length) {
			sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
		} else if (filesList.length) {
			handleSendFiles();
		}
	};

	if (!recipientUser)
		return (
			<p style={{ textAlign: 'center', width: '100%' }}>Выберите диалог...</p>
		);

	return (
		<div className={classes.chatBox}>
			<div className={classes.chatHeader}>
				<strong>
					{recipientUser?.name}-{recipientUser?.org}
				</strong>
			</div>
			<section className={classes.massagesWrapper}>
				<div className={classes.messages}>
					{/* {isDragActive ? (
						<div className={classes.dropZone}>
							<p>Отпустите файл для загрузки</p>
							<UploadIcon />
						</div>
					) : (
						<> */}
					{isMessagesLoading ? (
						<div className={classes.skeletonMessage}>
							{skeletonArr.map((el) => {
								return <SkeletonMessages key={el} />;
							})}
						</div>
					) : (
						<>
							{messages?.map((message) => (
								<div ref={scroll} key={message._id}>
									<Message
										message={message}
										own={message?.senderId === user?._id}
									/>
								</div>
							))}
						</>
					)}
				</div>
				<div>
					<FileChip files={files} setFiles={setFilesList} />
					<div className={classes.messageInput}>
						<div className={classes.filesUpload}>
							<label for="file-input">
								<UploadFileIcon sx={{ cursor: 'pointer' }} />
							</label>

							<input
								id="file-input"
								type="file"
								onChange={handleFileChange}
								multiple
								accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .xls, .docx, .xlsx, .zip, .rar, .7zip"
								// {...getInputProps()}
							/>
						</div>

						<TextFieldEmoji value={textMessage} setValue={setTextMessage} />

						<Button
							aria-label="send"
							variant="contained"
							onClick={handleSendMessage}
							sx={{
								backgroundColor: '#00aeae',
								height: '90%',
								marginRight: '5px',

								'&.MuiButton-root:hover': {
									backgroundColor: '#069393',
								},
							}}
						>
							<EmailIcon sx={{ fontSize: '30px' }} />
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ChatBox;
