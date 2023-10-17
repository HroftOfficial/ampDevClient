import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import DetailSlider from '../../../../components/DetailSlider/DetailSlider';
import config from '../../../../settings/settings';
import { AuthContext } from '../../../../hoc/AuthProvider';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { DialogFirstMessage } from '../../../../components/Dialogs/DialogFirstMessage/DialogFirstMessage';
import docIco from '../../../../img/doc-ico.svg';
import imgIco from '../../../../img/img-ico.svg';
import PlantNewService from '../../../../services/PlantNewService';
import { postFiles } from '../../../../utils/services';
import { SkeletonPlantDetails } from '../../../../components/Skeletons/SkeletonPlantDetails/SkeletonPlantDetails';

import classes from './PlantDetails.module.css';

import { ChatContext } from '../../../../context/ChatContext';

const { baseUrlUpload, filesUrl } = config;

const PlantDetails = () => {
	const location = useLocation();
	const { store } = useContext(AuthContext);
	const { sendTextMessage } = useContext(ChatContext);
	const navigate = useNavigate();
	const { id } = useParams();

	const [plant, setPlant] = useState([]);
	// const [img, setImg] = useState([]);

	// dialog
	const [open, setOpen] = useState(false);
	// const [zopen, setZopen] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [zOpenDialog, setZopenDialog] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [textValue, setTextValue] = useState('');
	const [filesList, setFilesList] = useState([]);

	const handleClickOpen = () => {
		setOpenDialog(true);
	};

	const handleClickOpenZ = () => {
		setZopenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setTextValue('');
	};

	const handleCloseDialogZ = () => {
		setZopenDialog(false);
		setTextValue('');
		setFilesList([]);
	};

	useEffect(() => {
		const getItemPlant = async (id) => {
			try {
				setIsLoading(true);
				const response = await PlantNewService.fetchItemPlant(id);
				setIsLoading(false);
				setPlant(response?.data?.plantData);
			} catch (error) {
				console.error(error);
			}
		};
		getItemPlant(id);
	}, []);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	// const handleCloseZ = (event, reason) => {
	// 	if (reason === 'clickaway') {
	// 		return;
	// 	}
	// 	setZopen(false);
	// };

	const handleSend = async (e) => {
		try {
			// if (uploadFile.length > 5) return;

			const url = `${config?.mainUrl}${location?.pathname}`;

			const formData = new FormData();

			formData.append('textValue', textValue);
			formData.append('url', url);

			// Object.values(uploadFile).forEach(photo => {
			//   formData.append("uploadFile", photo);
			// });
			store?.setMessage('');
			store?.setLoading(true);
			// await PlantNewService.sendZvk(formData);
			const response = await PlantNewService.sendZvk(formData);
			console.log(response);
			setOpenDialog(false);
			setOpen(true);
			setTextValue('');
		} catch (error) {
			store?.setMessage(error?.response?.data?.message);
			store?.setLoading(false);
		} finally {
			store?.setLoading(false);
		}
	};

	const handleSendZ = async (e) => {
		try {
			// console.log("store isAuth",store.isAuth, store)
			const formData = new FormData();
			formData.append('senderId', store?.user?._id);
			formData.append('title', plant?.name);
			formData.append('text', textValue.trim());
			formData.append('receiverId', plant?.inhereUser?.inhereUserId);
			// for (const key in filesList) {
			// 	if (Object.hasOwnProperty.call(filesList, key)) {
			// 		const element = filesList[key];
			// 		formData.append('files', element);
			// 	}
			// }
			// console.log("plant messages to inhere user", store)
			store?.setMessage('');
			store?.setLoading(true);
			const response = await PlantNewService.firstMessage(formData);

			for (const key in filesList) {
				if (Object.hasOwnProperty.call(filesList, key)) {
					const fData = new FormData();
					const element = filesList[key];
					fData.append('files', element);
					const res = await postFiles(fData);
					// const response = await axios.post(
					// 	`http://localhost:7700/files/multiple`,
					// 	formData
					// );
					const pathFile = `${filesUrl}/files/${res?.data[0]?.filename}`;
					const realNameFile = element?.name;
					sendTextMessage(
						textValue,
						store?.user,
						response?.data.chatId,
						setTextValue,
						pathFile,
						realNameFile
					);
					setFilesList([]);
				}
			}
			// sendTextMessage(textValue.trim(), store?.user, response.data?.chatId, setTextMessage);
			console.log(response);
			setZopenDialog(false);
			setOpen(true);
			setTextValue('');
			setFilesList([]);
		} catch (error) {
			store?.setMessage(error?.response?.data?.message);
			store?.setLoading(false);
		} finally {
			store?.setLoading(false);
		}
	};

	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});
	// enddialog

	// const [uploadFile, setUploadFile] = useState([]);

	if (isLoading) {
		return <SkeletonPlantDetails />;
	}

	return (
		<div className={classes.body}>
			<div className={classes.wrapper}>
				<Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
					<Alert
						onClose={handleClose}
						severity="success"
						sx={{ width: '100%' }}
					>
						Заявка отправлена!
					</Alert>
				</Snackbar>

				{/* dialogform */}

				<DialogFirstMessage
					open={openDialog}
					onClose={handleCloseDialog}
					textValue={textValue}
					setTextValue={setTextValue}
					handleSend={handleSend}
					title="Отправить заявку"
					details="В поле ниже вы можете описать ваше коммерческое предложение по
          заказу"
				/>
				{/* <Dialog open={openDialog} onClose={handleCloseDialog}>
					<DialogTitle>Отправить заявку</DialogTitle>
					<DialogContent>
						<DialogContentText
							style={{
								paddingBottom: '20px',
								fontWeight: '600',
								fontSize: '1.2rem',
							}}
						>
							В поле ниже вы можете описать ваше коммерческое предложение по
							заказу
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
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDialog}>Отменить</Button>
						<Button onClick={handleSend}>Отправить</Button>
					</DialogActions>
				</Dialog> */}

				{/* end dialogform */}

				{/* dialogform */}

				<DialogFirstMessage
					open={zOpenDialog}
					onClose={handleCloseDialogZ}
					textValue={textValue}
					setTextValue={setTextValue}
					handleSend={handleSendZ}
					filesList={filesList}
					setFilesList={setFilesList}
					title="Написать продавцу"
					details="В поле ниже вы можете описать ваши вопросы к продавцу"
				/>

				{/* <Dialog open={zOpenDialog} onClose={handleCloseDialogZ}>
					<DialogTitle>Написать заказчику</DialogTitle>
					<DialogContent>
						<DialogContentText
							style={{
								paddingBottom: '20px',
								fontWeight: '600',
								fontSize: '1.2rem',
							}}
						>
							В поле ниже вы можете описать ваши вопросы к заказчику
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
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDialogZ}>Отменить</Button>
						<Button onClick={handleSendZ}>Отправить</Button>
					</DialogActions>
				</Dialog> */}

				{/* end dialogform */}

				<main className={classes.wrapperContent}>
					<button onClick={() => navigate(-1)} className={classes.buttonBack}>
						Назад
					</button>
					<div className={classes.content}>
						<section className={classes.image}>
							{/* <DetailSlider items={item} /> */}
							<DetailSlider items={plant?.photo_plant} />
							{/* <img
								src={
									!!plant.photo_plant &&
									plant?.photo_plant[plant?.index_photo || 0]?.path?.replace(
										/public/i,
										baseUrlUpload
									)
								}
								className={classes.sliderArea}
							/> */}
							<div className={classes.infoDetails}>
								<h3>Описание</h3>
								<div>{plant.info}</div>
							</div>

							{/* <button onClick={() => navigate(`/telegram/${item._id}`)}>telega</button> */}
						</section>

						<section className={classes.info}>
							<div className={classes.infoNumber}>{plant.number}</div>
							<div className={classes.infoName}>{plant.name}</div>
							<div className={classes.infoItem}>
								Состояние:
								<span className={classes.infoContent}>
									{!!plant.newPlant ? 'Новое' : 'б/у'}
								</span>
							</div>
							<div className={classes.infoItem}>
								Стоимость:
								<span className={classes.infoContent}>
									{!!plant.price ? `${plant.price} руб.` : 'договорная'}
								</span>
							</div>

							<div className={classes.infoItem}>
								Город:
								<span className={classes.infoContent}>
									{plant?.cities
										? ` ${plant?.cities}`
										: ` информация уточняется`}
								</span>
							</div>
							<div className={classes.infoItem}>
								Владелец:{' '}
								<span className={classes.infoContent}>
									<Link
										to={`/partners/details/${plant.inhereUser?.inhereUserId}`}
										className={classes.addInfo}
									>
										{plant.inhereUser?.inhereUserName}
									</Link>
								</span>
							</div>
							{/* <div>Rating</div> */}
							{!!plant?.file_plant?.length && (
								<div className={classes.infoDoc}>
									<span>Документы для скачивания:</span>

									{plant?.file_plant?.map((item, index) => {
										const info = item.filename.split('.').splice(-1, 1)[0];
										return (
											<div className={classes.docItem} key={index}>
												<img
													alt=""
													src={
														info === 'jpg' || info === 'png' ? imgIco : docIco
													}
												/>
												<a
													href={
														config?.baseUrlUpload +
														'/uploads/plant_ap/' +
														item?.filename
													}
													target="_blank"
													rel="noreferrer"
												>
													{item?.filename}
												</a>
											</div>
										);
									})}
								</div>
							)}
							{store?.isAuth && (
								<>
									<button
										type="submit"
										onClick={handleClickOpen}
										className={classes.ampBtn}
									>
										Связь с АМП
									</button>
									<button
										type="submit"
										onClick={handleClickOpenZ}
										className={classes.ampBtn}
									>
										Написать продавцу
									</button>
								</>
							)}
						</section>
					</div>
				</main>
			</div>
		</div>
	);
};

export default observer(PlantDetails);
