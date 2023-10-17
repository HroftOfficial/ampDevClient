import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputLabel, Autocomplete, Box, TextField } from '@mui/material';
import FilesUploadMulti from '../../../../components/FilesUploadMulti/FilesUploadMulti';
import allowedFiles from '../../../../utils/allowedFiles';
import config from '../../../../settings/settings';
import { TomsModal } from '../../TomsModal';
import User from '../../../../services/User';
import Orders from '../../../../services/Orders';
import { CheckFilesQuantity } from '../../components/CheckFilesQuantity/CheckFilesQuantity';
import citiesData from '../cities';

import classes from './EditOrder.module.css';

const { uploadDraftPhoto } = config;

const warningTitle = {
	max: 'Максимальная длина заголовка 50 символов',
	min: 'Минимальная длина заголовка 2 символа',
	required: 'Заголовок не может быть пустым',
};

const warningDetails = {
	required: 'Заполните описание',
};

const warningKl = {
	required: 'Укажите количество',
};

const addZakazSchema = yup.object({
	title: yup
		.string()
		.required(warningTitle.required)
		.min(2, warningTitle.min)
		.max(50, warningTitle.max),
	details: yup.string().required(warningDetails.required),
	kl: yup.string().required(warningKl.required),
});

const EditOrder = () => {
	const [ready, setReady] = useState(false);
	const [mainOrder, setMainOrder] = useState([]); // большой главный заказ
	const [showModal, setShowModal] = useState(false); // скрыть моказать модалку мехобработок

	const [tomsList, setTomsList] = useState([]); // загружает в модалку виды мехобработки

	const [selected, setSelected] = useState([]); // хранится массив выбранных ID мехобработок, из модалки
	// const [selectedText, setSelectedText] = useState([]); // хранится массив выбранных имен мехобработок, из модалки

	const [previewPhoto, setPreviewPhoto] = useState([]); // стейт выбранных фото
	const [previewFile, setPreviewFile] = useState([]); // стейт выбранных файлов

	const [title, setTitle] = useState(''); // загружает заголовок ..
	const [many, setMany] = useState('');
	const [kl, setKl] = useState('');
	const [kl_text, setKl_text] = useState('партия');
	const [max_width, setMax_width] = useState('');
	const [max_d, setMax_d] = useState('');
	const [cities, setCities] = useState('');
	const [details, setDetail] = useState('');

	const [newPreviewPhoto, setNewPreviewPhoto] = useState(0);

	const [inputValue, setInputValue] = useState('');

	const [work_category, setWork_category] = useState(mainOrder.work_category);

	const [previewLoadPhoto, setPreviewLoadPhoto] = useState([]); // устанавливает массив для превью фото
	const [previewLoadFile, setPreviewLoadFile] = useState([]); // устанавливает массив для првью файлов

	const [deletedArrayPhoto, setDeletedArrayPhoto] = useState([]); // массив с ID удаленных фото, для отправки на сервер
	const [deletedArrayFile, setDeletedArrayFile] = useState([]); // массив с ID удаленных файлов, для отправки на сервер
	const [isCheckFiles, setIsCheckFiles] = useState({
		needPhoto: false,
		manyPhoto: false,
		manyFiles: false,
	});

	const filteredToms = (arr) => {
		const result = arr.filter((el) =>
			selected.some((tom) => el.items.id_name === tom)
		);
		return result;
	};

	const filteredSelectArray = filteredToms(tomsList);

	const navigate = useNavigate();

	useEffect(() => {
		const getInfo = async () => {
			try {
				const orders = await Orders.getOrders();
				const toms = await User.getUsersTomsUnWind();

				// console.log('All orders >>> ', orders)
				// console.log('All vidi >>> ', vidi)

				const idFromUrl = window.location.pathname.split('/').splice(-1, 1)[0];

				for (let item of orders.data) {
					if (item?._id === idFromUrl) {
						// console.log('Order to EDIT >>> ',   item)
						setMainOrder(item);

						setTitle(item?.title);
						setMany(item?.many);
						setKl(item?.kl);
						setKl_text(item?.kl_text);
						setMax_width(item?.max_width);
						setMax_d(item?.max_d);
						setCities(item?.cities);
						setDetail(item?.details);
						setNewPreviewPhoto(item?.index_photo);
						setWork_category(item?.work_category);
						setSelected(item?.work_category);
						// console.log('Work_category >> ', item.work_category)
						// console.log('Work_info >> ', item.work_info)

						setValue('title', item?.title);
						setValue('kl', item?.kl);
						setValue('details', item?.details);

						setPreviewLoadPhoto(item?.photo_url);
						setPreviewLoadFile(item?.file_url);

						// console.log('LengthPhoto >> ', lengthPhoto);
						// console.log('LengthFile >> ', lengthFile);

						// const array = [];
						// item?.work_info.forEach((item) => {
						// 	array.push(item.name);
						// });
						// // console.log(array)
						// setSelectedText(array);
					}
				}

				setTomsList(toms?.data);
			} catch (e) {
				console.error('Error >>> ', e);
			} finally {
				setReady(true);
			}
		};
		getInfo();
	}, []);
	// console.log(selected)

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

	const handleDelete = (item) => {
		// console.log(e)
		// const id = e.target?.parentElement.children[0].id;
		// const name = e.target?.parentElement.children[0].innerText;

		// const tempSelected = selected.slice();
		// tempSelected.splice(id, 1);
		// setSelected(tempSelected);

		const id = item.items.id_name;

		setSelected((prevState) => prevState.filter((el) => el !== id));

		// const tempSelectedText = selectedText.slice();
		// const index2 = tempSelectedText.indexOf(name);
		// tempSelectedText.splice(index2, 1);
		// setSelectedText(tempSelectedText);

		// console.log('DELETED >> ', id)
		// console.log('DELETED >> ', name)
	};

	const handleDeleteFile = async (values) => {
		setDeletedArrayFile((prevState) => [...prevState, values]);
		setPreviewLoadFile((prevState) =>
			prevState.filter((el) => values !== el.filename)
		);
	};

	const handleDeletePhoto = async (values) => {
		setDeletedArrayPhoto((prevState) => [...prevState, values]);
		setPreviewLoadPhoto((prevState) =>
			prevState.filter((el) => values !== el.filename)
		);
	};

	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(addZakazSchema),
		defaultValues: {
			title: title,
			details: details,
			kl: kl,
		},
	});

	// const [needPhoto, setNeedPhoto] = useState(false);
	// const [needFile, setNeedFile] = useState(false);
	// const [manyPhoto, setManyPhoto] = useState(false);
	// const [manyFile, setManyFile] = useState(false);

	const onSubmit = async (data, e) => {
		try {
			e.preventDefault();

			const photos = previewPhoto;
			const files = previewFile;

			const deletedFilesTitle = [
				...deletedArrayFile.flat(),
				...deletedArrayPhoto.flat(),
			];

			if (photos?.length + previewLoadPhoto?.length < 1) {
				setIsCheckFiles({ ...isCheckFiles, needPhoto: true });
				return;
			}
			// if (files?.length + previewLoadFile?.length < 1) {
			// 	setNeedFile(true);
			// 	return;
			// }
			if (photos?.length + previewLoadPhoto?.length > 10) {
				setIsCheckFiles({ ...isCheckFiles, manyPhoto: true });
				return;
			}
			if (files?.length + previewLoadFile?.length > 10) {
				setIsCheckFiles({ ...isCheckFiles, manyFiles: true });
				return;
			}
			setIsCheckFiles({ needPhoto: false, manyPhoto: false, manyFiles: false });
			// setNeedPhoto(false);
			// setNeedFile(false);
			// setManyPhoto(false);
			// setManyFile(false);
			const formData = new FormData();

			formData.append('title', data.title);
			formData.append('many', many);
			formData.append('kl', data.kl);
			formData.append('kl_text', kl_text);
			formData.append('max_width', max_width);
			formData.append('max_d', max_d);
			if (inputValue) {
				formData.append('cities', inputValue);
			} else {
				formData.append('cities', cities);
			}
			formData.append('details', data.details);
			formData.append('index_photo', newPreviewPhoto);

			Object.values(deletedFilesTitle).forEach((title) => {
				formData.append('delete_files', title);
			});

			Object.values(selected).forEach((category) => {
				formData.append('work_category', category);
			});

			Object.values(photos).forEach((photo) => {
				formData.append('photo_url', photo);
			});

			Object.values(files).forEach((file) => {
				formData.append('file_url', file);
			});

			const data2 = {
				id: mainOrder._id,
				many,
				kl_text,
				max_width,
				max_d,
				cities,
				selected,
				deletedFilesTitle,
				newPreviewPhoto,
			};

			const order = await Orders.editOrderAll(mainOrder._id, formData);

			//
			navigate('/profile/orders');
		} catch (e) {
			console.error('Error >>> ', e);
		}
	};

	return (
		<main className={classes.main}>
			<div className={classes.contextWrapper}>
				<h2>
					Редактирование заказа: {mainOrder?.number} {mainOrder?.title}
				</h2>

				<form
					className={classes.form}
					enctype="multipart/form-data"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className={classes.top}>
						{/* <input value={title} onChange={(e) => setTitle(e.target?.value)} placeholder='Название заказа'/> */}

						<Controller
							control={control}
							name="title"
							rules={{ required: true }}
							render={({ field: { onChange, value } }) => (
								<div
									className={classes.inputWrapper}
									errorState={!!errors.title}
								>
									{errors.title ? (
										<div className={classes.err}> {errors.title.message} </div>
									) : null}
									<input
										type="text"
										placeholder="Название заказа"
										className={classes.shortInput}
										value={value}
										{...register('title')}
									/>
								</div>
							)}
						/>

						<input
							value={many}
							onChange={(e) => setMany(e.target?.value)}
							placeholder="Стоимость"
							className={classes.shortInput}
						/>

						{/* <input value={kl} onChange={(e) => setKl(e.target?.value)} placeholder='Количество деталей'/> */}

						<Controller
							control={control}
							name="kl"
							rules={{ required: true }}
							render={({ field: { onChange, value } }) => (
								<div className={classes.inputWrapper} errorState={!!errors.kl}>
									{errors.kl ? (
										<div className={classes.err}> {errors.kl.message} </div>
									) : null}
									<input
										type="text"
										placeholder="Количество деталей"
										value={value}
										className={classes.shortInput}
										{...register('kl')}
									/>
								</div>
							)}
						/>

						<select
							className={classes.longInput}
							value={kl_text}
							onChange={(e) => setKl_text(e.target?.value)}
						>
							<option disabled>Периодичность</option>
							<option value="партия">Партия</option>
							<option value="мес/шт">шт/мес</option>
							<option value="год/шт">шт/год</option>
							<option value="шт.">шт.</option>
						</select>
						<input
							value={max_width}
							onChange={(e) => setMax_width(e.target?.value)}
							placeholder="Max длина (линейный размер)"
							className={classes.shortInput}
						/>
						<input
							value={max_d}
							onChange={(e) => setMax_d(e.target?.value)}
							className={classes.shortInput}
							placeholder="Max диаметр"
						/>
						{/* <input
							value={cities}
							onChange={(e) => setCities(e.target?.value)}
							className={classes.shortInput}
							placeholder="Город доставки"
						/> */}
						<div className={classes.citiesDiv}>
							<Autocomplete
								id="cities"
								name="cities"
								sx={{ width: '100%' }}
								inputValue={inputValue}
								onInputChange={(event, newInputValue) => {
									setInputValue(newInputValue);
								}}
								options={citiesData}
								autoHighlight
								getOptionLabel={(option) => option.value}
								renderOption={(props, option) => (
									<Box component="li" {...props}>
										{option.value}
									</Box>
								)}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder="Выберите город"
										label={cities}
										className={classes.inputCities}
										inputProps={{
											...params.inputProps,
											autoComplete: 'new-cities', // disable autocomplete and autofill
										}}
									/>
								)}
							/>
						</div>
					</div>

					<div>
						{/* <textarea value={details} onChange={(e) => setDetail(e.target?.value)} placeholder='Описание заказа'></textarea> */}

						<Controller
							control={control}
							name="details"
							rules={{ required: true }}
							render={({ field: { onChange, value } }) => (
								<div className={classes.inputWrapper} errorState={!!errors.kl}>
									{errors.details ? (
										<div className={classes.err}>{errors.details.message} </div>
									) : null}
									<textarea
										className={classes.textArea}
										placeholder="Описание заказа"
										value={value}
										{...register('details')}
									/>
								</div>
							)}
						/>
					</div>

					{filteredSelectArray?.length > 0 && (
						<div className={classes.toms}>
							<h2>Выбранные виды мехобработки:</h2>
							{filteredSelectArray?.map((item, index) => (
								<div className={classes.tom} key={index}>
									<div id={index}>{item?.items.name}</div>
									<div
										className={classes.close}
										onClick={() => handleDelete(item)}
									>
										&times;
									</div>
								</div>
							))}
						</div>
					)}

					<button className={classes.actionMenu} onClick={handleOpenMenu}>
						Добавить виды обработки
					</button>

					<div className={classes.upload}>
						<div className={classes.fileBlock}>
							<InputLabel>Файлы </InputLabel>
							<small>
								Разрешенные форматы: pdf, doc, docx, xls, xlsx, png, jpg, jpeg,
								dvg, dwg, gif.
							</small>
							<FilesUploadMulti
								plant={previewLoadFile}
								files={previewFile}
								setFiles={setPreviewFile}
								variant={2}
								subject={'заказ'}
								allowedFiles={allowedFiles.draftFiles}
								// deletedPath = {deletedPath}
								// setDeletedPath ={setDeletedPath}
								handleDeleteFile={handleDeleteFile}
							/>
						</div>

						<div className={classes.fileBlock}>
							<InputLabel>Изображения </InputLabel>

							<small>Разрешенные форматы: png, jpg, jpeg.</small>
							<FilesUploadMulti
								plant={previewLoadPhoto}
								selectIndex={newPreviewPhoto}
								setSelectIndex={setNewPreviewPhoto}
								files={previewPhoto}
								setFiles={setPreviewPhoto}
								variant={1}
								subject={'заказ'}
								allowedFiles={allowedFiles.photo}
								handleDeleteFile={handleDeletePhoto}
								pathFileUpload={uploadDraftPhoto}
							/>
						</div>
					</div>

					<CheckFilesQuantity
						needPhoto={isCheckFiles.needPhoto}
						manyPhoto={isCheckFiles.manyPhoto}
						manyFiles={isCheckFiles.manyFiles}
					/>

					<button className={classes.acceptBtn} type="submit">
						Отправить
					</button>
				</form>
			</div>

			{showModal && (
				<VidiModal id="vidiModal">
					<TomsModal
						selected={selected}
						setSelected={setSelected}
						setShowModal={setShowModal}
					/>
				</VidiModal>
			)}
		</main>
	);
};

export default EditOrder;

const VidiModal = styled.div`
	display: block; /* Hidden by default */
	position: fixed; /* Stay in place */
	z-index: 1; /* Sit on top */
	padding: 100px 0; /* Location of the box */
	left: 0;
	top: 0;
	width: 100%; /* Full widtsh */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: #000000ae; /* Black w/ opacity */
`;
