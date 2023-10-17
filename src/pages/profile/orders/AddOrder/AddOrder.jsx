import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { styled as MIstuled } from '@mui/material/styles';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import allowedFiles from '../../../../utils/allowedFiles';
import FilesUploadMulti from '../../../../components/FilesUploadMulti/FilesUploadMulti';
import { TomsModal } from '../../TomsModal';
import User from '../../../../services/User';
import Orders from '../../../../services/Orders';
import { CheckFilesQuantity } from '../../components/CheckFilesQuantity/CheckFilesQuantity';
import citiesData from '../cities';

import classes from './AddOrder.module.css';

const Listbox = MIstuled('ul')(() => ({
	width: '100%',
	margin: 0,
	padding: 0,
	zIndex: 1,
	top: 67,
	position: 'absolute',
	listStyle: 'none',
	backgroundColor: 'white',
	overflow: 'auto',
	maxHeight: 200,
	border: '1px solid rgba(0,0,0,.25)',
	[`& li.${autocompleteClasses.focused}`]: {
		backgroundColor: '#00AEAE',
		color: 'white',
		cursor: 'pointer',
	},
	'& li:active': {
		backgroundColor: '#00AEAE',
		color: 'white',
	},
}));

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

const AddOrder = () => {
	// const [ready, setReady] = useState(false);

	const [many, setMany] = useState('');
	const [kl_text, setKl_text] = useState('партия');
	const [max_width, setMax_width] = useState('');
	const [max_d, setMax_d] = useState('');

	const [selected, setSelected] = useState([]);
	// const [selectedText, setSelectedText] = useState([]);
	const [tomsList, setTomsList] = useState([]);

	const [previewPhoto, setPreviewPhoto] = useState([]);
	const [previewFile, setPreviewFile] = useState([]);
	const [isCheckFiles, setIsCheckFiles] = useState({
		needPhoto: false,
		manyPhoto: false,
		manyFiles: false,
	});

	const draftPhoto = [];
	const draftFiles = [];

	const [showModal, setShowModal] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const getTomsList = async () => {
			try {
				const toms = await User.getUsersTomsUnWind();

				setTomsList(toms?.data);
			} catch (e) {
				console.error('Error >>> ', e);
			}
		};
		getTomsList();
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

	const handleDelete = (item) => {
		const id = item.items.id_name;

		setSelected((prevState) => prevState.filter((el) => el !== id));

		// const id = e.target.parentElement.children[0].id;

		// const tempSelected = selected.slice();
		// const index1 = tempSelected.indexOf(id);
		// tempSelected.splice(index1, 1);
		// setSelected(tempSelected);

		// const tempSelectedText = selectedText.slice();
		// const index2 = tempSelectedText.indexOf(name);
		// tempSelectedText.splice(index2, 1);
		// setSelectedText(tempSelectedText);
	};

	const [newPreview, setNewPreview] = useState(0);

	const filteredToms = (arr) => {
		const result = arr.filter((el) =>
			selected.some((tom) => el.items.id_name === tom)
		);
		return result;
	};

	const filteredSelectArray = filteredToms(tomsList);

	const {
		getRootProps,
		getInputLabelProps,
		getInputProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
	} = useAutocomplete({
		id: 'use-autocomplete-demo',
		options: citiesData,
		getOptionLabel: (option) => option.value,
	});

	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(addZakazSchema),
		defaultValues: {
			title: '',
			details: '',
			kl: '',
		},
	});

	const onSubmit = async (data, e) => {
		try {
			// console.log('Sended form React Hook Form > ', data);

			const data2 = {
				many,
				kl_text,
				max_width,
				max_d,
				cities: e.target[6].value,
				newPreview,
				selected,
			};

			if (previewPhoto?.length < 1) {
				setIsCheckFiles({ ...isCheckFiles, needPhoto: true });
				return;
			}
			// if (previewFile.length < 1) {
			// 	setNeedFile(true);
			// 	return;
			// }
			if (previewPhoto?.length > 10) {
				setIsCheckFiles({ ...isCheckFiles, manyPhoto: true });
				return;
			}
			if (previewFile?.length > 10) {
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
			formData.append('cities', e.target[6].value);
			formData.append('details', data.details);
			formData.append('index_photo', newPreview);

			Object.values(selected).forEach((category) => {
				formData.append('work_category', category);
			});

			Object.values(previewPhoto).forEach((photo) => {
				formData.append('photo_url', photo);
			});

			Object.values(previewFile).forEach((file) => {
				formData.append('file_url', file);
			});

			// console.log('Sended from State >> ', data2)
			// console.log('Sended Photo >> ', lengthPhoto)
			// console.log('Sended Files >> ', lengthFile)

			const order = await Orders.addOrder(formData);

			// console.log('Response >>> ', order)

			navigate('/profile/orders');
		} catch (e) {
			console.error('Error > ', e);
		}
	};

	// const [needPhoto, setNeedPhoto] = useState(false);
	// const [needFile, setNeedFile] = useState(false);
	// const [manyPhoto, setManyPhoto] = useState(false);
	// const [manyFile, setManyFile] = useState(false);

	return (
		<main className={classes.main}>
			{/* <Asidebar /> */}
			{/* <MobileHeader setIsOpen={setIsOpen} isOpen={isOpenMenu} />
			{isOpenMenu && <MobileMenu setIsOpen={setIsOpen} />} */}

			<div className={classes.contextWrapper}>
				<h2>Добавление заказа</h2>

				<form
					className={classes.form}
					enctype="multipart/form-data"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className={classes.top}>
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
										className={classes.longInput}
										type="text"
										placeholder="Название заказа"
										value={value}
										{...register('title')}
									/>
								</div>
							)}
						/>

						<input
							className={classes.longInput}
							placeholder="Стоимость"
							value={many}
							onChange={(e) => setMany(e.target.value)}
						/>
						{/* <input className='long-input' placeholder='Количество деталей'/> */}

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
										className={classes.longInput}
										type="text"
										placeholder="Количество деталей"
										value={value}
										{...register('kl')}
									/>
								</div>
							)}
						/>

						<select
							className={classes.select}
							value={kl_text}
							onChange={(e) => setKl_text(e.target.value)}
						>
							<option disabled>Периодичность</option>
							<option value="партия">Партия</option>
							<option value="мес/шт">шт/мес</option>
							<option value="год/шт">шт/год</option>
							<option value="шт.">шт.</option>
						</select>
						<input
							className={classes.shortInput}
							placeholder="Max длина (линейный размер)"
							value={max_width}
							onChange={(e) => setMax_width(e.target.value)}
						/>
						<input
							className={classes.shortInput}
							placeholder="Max диаметр"
							value={max_d}
							onChange={(e) => setMax_d(e.target.value)}
						/>

						<div className={classes.citiesDiv}>
							<div
								{...getRootProps()}
								style={{ display: 'flex', width: '100%' }}
							>
								{/* <Label {...getInputLabelProps()}>useAutocomplete</Label> */}
								<input
									className={classes.inputCities}
									{...getInputProps()}
									placeholder="Город доставки"
								/>
							</div>
							{groupedOptions?.length > 0 &&
							getInputProps().value.length >= 3 ? (
								<Listbox {...getListboxProps()}>
									{groupedOptions.map((option, index) => {
										return (
											<li {...getOptionProps({ option, index })} key={index}>
												{option.value}
											</li>
										);
									})}
								</Listbox>
							) : null}
						</div>
					</div>

					{/* <textarea placeholder='Описание заказа'></textarea> */}

					<Controller
						control={control}
						name="details"
						rules={{ required: true }}
						render={({ field: { onChange, value } }) => (
							<div
								className={classes.textAreaWrapper}
								errorState={!!errors.details}
							>
								{errors.details ? (
									<div className={classes.err}> {errors.details.message} </div>
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

					{filteredSelectArray.length > 0 && (
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
								plant={draftFiles}
								selectIndex={newPreview}
								// setSelectIndex = {setSelectIndex}
								files={previewFile}
								setFiles={setPreviewFile}
								variant={2}
								subject={'заказ'}
								allowedFiles={allowedFiles.draftFiles}
								// deletedPath = {deletedPath}
								// setDeletedPath ={setDeletedPath}
								// handleDeleteFile={handleDeleteFile}
							/>
						</div>

						<div className={classes.fileBlock}>
							<InputLabel>Изображения </InputLabel>

							<small>Разрешенные форматы: png, jpg, jpeg.</small>
							<FilesUploadMulti
								plant={draftPhoto}
								selectIndex={newPreview}
								setSelectIndex={setNewPreview}
								files={previewPhoto}
								setFiles={setPreviewPhoto}
								variant={1}
								subject={'заказ'}
								allowedFiles={allowedFiles.photo}
								// deletedPath = {deletedPath}
								// setDeletedPath ={setDeletedPath}
								// handleDeleteFile={handleDeleteFile}
							/>
						</div>
						{/* <div className="input">
								<label htmlFor="photo-input">
									{previewPhoto?.length > 0
										? `Выбрано ${previewPhoto?.length} фото`
										: 'Загрузите до 10 фото заказа. Разрешенные форматы: png, jpg, jpeg.'}
									<img src={photoIco} alt="" />
								</label>
								<input
									type="file"
									multiple
									id="photo-input"
									onChange={onSelectPhoto}
									accept=".jpg, .jpeg, .png "
								/>
								{needPhoto && (
									<ErrMessage> Загрузите хотя бы 1 фото </ErrMessage>
								)}
								{manyPhoto && (
									<ErrMessage> Много фото, удалите часть </ErrMessage>
								)}
							</div>

							<div className="input">
								<label htmlFor="file-input">
									{previewFile?.length > 0
										? `Выбрано ${previewFile?.length} файлов`
										: 'Загрузите до 10 файлов заказа. Разрешенные форматы: pdf, doc, docx, xls, xlsx, png, jpg, jpeg, dvg, dwg, gif.'}
									<img src={docIco} alt="" />
								</label>
								<input
									type="file"
									multiple
									id="file-input"
									onChange={onSelectFile}
									accept=".pdf, .doc, .docx, .xls, .xlsx, .png, .jpg, .jpeg, .dvg, .dwg, .gif"
								/>
								{needFile && (
									<ErrMessage> Загрузите хотя бы 1 файл </ErrMessage>
								)}
								{manyFile && (
									<ErrMessage> Много файлов, удалите часть </ErrMessage>
								)}
							</div> */}
					</div>

					{/* <div className="preview-wrapper">
							<div className="text-wrapper">
								{previewPhoto?.length === 1 && (
									<div className="text">
										Эта фотография будет фотографией предпросмотра
									</div>
								)}
								{previewPhoto?.length > 1 && (
									<div className="text">Выберете фотографию предпросмотра</div>
								)}

								<div className="preview">
									{previewPhoto?.map((img, index) => (
										<div key={index} className="preview-item">
											{console.log(img)}
											<img
												src={img}
												id={index}
												alt="pic1"
												className="preview-img"
												onClick={handleNewPreview}
												style={{
													border:
														newPreview == index ? 'solid 3px #00AEAE' : 'none',
												}}
											/>
											<button
												id={index}
												key={index}
												onClick={(e) => {
													removePhotoFromArray(e, index);
												}}
											>
												<img
													src={deleteIco}
													alt="delete"
													className="delete-btn"
												/>
											</button>
										</div>
									))}
								</div>
							</div>

							<div className="preview-file">
								{previewFile?.map((file, index) => (
									<div key={index} className="preview-item-file">
										<span onClick={handleFileOpen}>{file.name}</span>
										<button
											id={index}
											key={index}
											onClick={(e) => removeFileFromArray(e, index)}
										>
											<img
												src={deleteIco}
												alt="delete"
												className="delete-btn"
											/>
										</button>
									</div>
								))}
							</div>
						</div> */}
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

			<VidiModal
				id="vidiModal"
				style={{ display: showModal ? 'block' : 'none' }}
			>
				<TomsModal
					selected={selected}
					setSelected={setSelected}
					setShowModal={setShowModal}
				/>
			</VidiModal>
		</main>
	);
};

export default AddOrder;

const VidiModal = styled.div`
	display: none; /* Hidden by default */
	position: fixed; /* Stay in place */
	z-index: 1; /* Sit on top */
	padding-top: 100px; /* Location of the box */
	padding-bottom: 100px; /* Location of the box */
	left: 0;
	top: 0;
	width: 100%; /* Full widtsh */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: #000000ae; /* Black w/ opacity */
`;
