import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { styled as MIstuled } from '@mui/material/styles';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import Asidebar from '../Asidebar';
import MobileMenu from './MobileMenu';
import MobileHeader from './MobileHeader';
import Modal from '../VidiModal';
import User from '../../../services/User';
import docIco from '../../../img/upload-document-ico.svg';
import photoIco from '../../../img/upload-photo-ico.svg';
import deleteIco from '../../../img/delete-ico.svg';
import Orders from '../../../services/Orders';
import citiesData from './cities';

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

const warningPhoto = {
	required: 'Загрузите минимум 1 фото',
	large: 'Фото слишком большие',
	type: 'Недопустимый формат фото',
};

const warningFile = {
	required: 'Загрузите минимум 1 файл',
	large: 'Файлы слишком большие',
	type: 'Недопустимый формат файлов',
};

const addZakazSchema = yup.object({
	title: yup
		.string()
		.required(warningTitle.required)
		.min(2, warningTitle.min)
		.max(50, warningTitle.max),
	details: yup.string().required(warningDetails.required),
	kl: yup.string().required(warningKl.required),
	photo: yup
		.mixed()
		.test('required', warningPhoto.required, (value) => {
			return value && value.length;
		})
		.test('fileSize', warningPhoto.large, (value, context) => {
			if (value.length < 1) return true;
			return value && value[0] && value[0].size <= 2000000;
		})
		.test('type', warningPhoto.type, function (value) {
			if (value.length < 1) return true;
			return (
				value &&
				value[0] &&
				(value[0].type === 'image/jpeg' ||
					value[0].type === 'image/jpg' ||
					value[0].type === 'image/png')
			);
		}),
	file: yup
		.mixed()
		.test('required', warningFile.required, (value) => {
			return value && value.length;
		})
		.test('fileSize', warningFile.large, (value, context) => {
			if (value.length < 1) return true;
			return value && value[0] && value[0].size <= 2000000;
		})
		.test('type', warningFile.type, function (value) {
			if (value.length < 1) return true;
			return (
				value &&
				value[0] &&
				(value[0].type === 'image/jpeg' ||
					value[0].type === 'image/jpg' ||
					value[0].type === 'image/png' ||
					value[0].type === 'image/xls' ||
					value[0].type === 'image/docx' ||
					value[0].type === 'image/doc' ||
					value[0].type === 'image/pdf' ||
					value[0].type === 'image/xlsx')
			);
		}),
});

const AddOrder = () => {
	const [ready, setReady] = useState(false);
	const [listVidi, setListVidi] = useState([]);

	const [many, setMany] = useState('');
	const [kl_text, setKl_text] = useState('партия');
	const [max_width, setMax_width] = useState('');
	const [max_d, setMax_d] = useState('');

	const [selected, setSelected] = useState([]);
	const [selectedText, setSelectedText] = useState([]);

	const [lengthFile, setLengthFile] = useState([]);
	const [lengthPhoto, setLengthPhoto] = useState([]);

	const [showModal, setShowModal] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const vidi = await User.getUsersToms();
				// console.log('Vidi >>> ', vidi)

				setListVidi(vidi?.data);
			} catch (e) {
				console.error('Error >>> ', e);
			} finally {
				setReady(true);
			}
		})();
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

	const handleDelete = (e) => {
		// console.log(e)
		const id = e.target.parentElement.children[0].id;
		const name = e.target.parentElement.children[0].innerText;
		// console.log(id)
		// console.log(name)

		const tempSelected = selected.slice();
		const index1 = tempSelected.indexOf(id);
		tempSelected.splice(index1, 1);
		setSelected(tempSelected);

		const tempSelectedText = selectedText.slice();
		const index2 = tempSelectedText.indexOf(name);
		tempSelectedText.splice(index2, 1);
		setSelectedText(tempSelectedText);

		// console.log('DELETED >> ', id)
		// console.log('DELETED >> ', name)
	};

	// console.log('ADD ORDER> selected >>> ', selected)
	// console.log('ADD ORDER> setected TEXT >>> ', selectedText)

	const [previewPhoto, setPreviewPhoto] = useState([]);
	const [previewFile, setPreviewFile] = useState([]);

	const onSelectPhoto = (e) => {
		let arrayofFiles = [];
		for (var i = 0; i < e.target.files.length; i++) {
			const fileExtention = e.target.files[i].name.split('.')[1];
			// console.log(fileExtention)
			let images = [];

			// if (fileExtention == 'png' ||
			// fileExtention == 'jpg' ||
			// fileExtention == 'jpeg'||
			// fileExtention == 'PNG'||
			// fileExtention == 'JPG'||
			// fileExtention == 'JPEG') {
			arrayofFiles.push(e.target?.files[i]);

			arrayofFiles.forEach((item) => {
				const ImageUrl = URL.createObjectURL(item);

				images.push(ImageUrl);
			});
			setPreviewPhoto(images);

			// }
		}

		setNeedPhoto(false);
		setLengthPhoto(arrayofFiles);
	};

	const removePhotoFromArray = (e, indx) => {
		e.preventDefault();

		// console.log(e )
		// console.log(indx )
		const index = e.target.id;

		let newPreview = [...previewPhoto];
		let newLength = [...lengthPhoto];

		newPreview.splice(indx, 1);
		newLength.splice(indx, 1);

		setPreviewPhoto(newPreview);
		setLengthPhoto(newLength);
	};

	const onSelectFile = (e) => {
		let arrayofFiles = [];
		for (var i = 0; i < e.target.files.length; i++) {
			const fileExtention = e.target.files[i].name.split('.')[1];
			// console.log(fileExtention)

			// if (fileExtention == 'pdf' ||
			// fileExtention == 'doc' ||
			// fileExtention == 'docx' ||
			// fileExtention == 'xls' ||
			// fileExtention == 'xlsx' ||
			// fileExtention == 'png' ||
			// fileExtention == 'jpg' ||
			// fileExtention == 'jpeg'||
			// fileExtention == 'PDF'||
			// fileExtention == 'DOC'||
			// fileExtention == 'DOCX'||
			// fileExtention == 'XLS'||
			// fileExtention == 'XLSX'||
			// fileExtention == 'PNG'||
			// fileExtention == 'JPG'||
			// fileExtention == 'JPEG') {
			arrayofFiles.push(e.target?.files[i]);

			setPreviewFile(arrayofFiles);
			// }
		}

		setNeedFile(false);
		setLengthFile(arrayofFiles);
	};

	const removeFileFromArray = (e, indx) => {
		e.preventDefault();

		const index = e.target.id;

		let newPreview = [...previewFile];
		let newLength = [...lengthFile];

		newPreview.splice(indx, 1);
		newLength.splice(indx, 1);

		setPreviewFile(newPreview);
		setLengthFile(newLength);
	};

	const handleFileOpen = (e) => {
		// console.log(e)
	};

	const [isOpenMenu, setIsOpen] = useState(false);
	const [newPreview, setNewPreview] = useState(0);

	const handleNewPreview = (e) => {
		const name = e.target?.id;
		// console.log(name)
		setNewPreview(name);
	};

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
			photo: [],
			file: [],
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

			if (lengthPhoto?.length < 1) {
				setNeedPhoto(true);
				return;
			}
			if (lengthFile.length < 1) {
				setNeedFile(true);
				return;
			}
			if (lengthPhoto?.length > 10) {
				setManyPhoto(true);
				return;
			}
			if (lengthFile?.length > 10) {
				setManyFile(true);
				return;
			}
			setNeedPhoto(false);
			setNeedFile(false);
			setManyPhoto(false);
			setManyFile(false);

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

			Object.values(lengthPhoto).forEach((photo) => {
				formData.append('photo_url', photo);
			});

			Object.values(lengthFile).forEach((file) => {
				formData.append('file_url', file);
			});

			// console.log('Sended from State >> ', data2)
			// console.log('Sended Photo >> ', lengthPhoto)
			// console.log('Sended Files >> ', lengthFile)

			const order = await Orders.addOrder(formData);

			// console.log('Response >>> ', order)

			navigate('/zakazes');
		} catch (e) {
			console.error('Error > ', e);
		}
	};

	const [needPhoto, setNeedPhoto] = useState(false);
	const [needFile, setNeedFile] = useState(false);
	const [manyPhoto, setManyPhoto] = useState(false);
	const [manyFile, setManyFile] = useState(false);

	return (
		<Body>
			{/* <Asidebar/> */}
			{/* <MobileHeader setIsOpen={setIsOpen} isOpen={isOpenMenu}/>
      {isOpenMenu && <MobileMenu setIsOpen={setIsOpen}/>} */}

			{ready && (
				<div className="context-wrapper ">
					<h2>Добавление заказа</h2>

					<Forma
						enctype="multipart/form-data"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="top">
							{/* <input className='long-input' placeholder='Название заказа'/> */}

							<Controller
								control={control}
								name="title"
								rules={{ required: true }}
								render={({ field: { onChange, value } }) => (
									<InputWrapper errorState={!!errors.title}>
										{errors.title ? (
											<ErrMessage> {errors.title.message} </ErrMessage>
										) : null}
										<input
											className="long-input"
											type="text"
											placeholder="Название заказа"
											value={value}
											{...register('title')}
										/>
									</InputWrapper>
								)}
							/>

							<input
								className="long-input"
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
									<InputWrapper errorState={!!errors.kl}>
										{errors.kl ? (
											<ErrMessage> {errors.kl.message} </ErrMessage>
										) : null}
										<input
											className="long-input"
											type="text"
											placeholder="Количество деталей"
											value={value}
											{...register('kl')}
										/>
									</InputWrapper>
								)}
							/>

							<select
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
								className="short-imput"
								placeholder="Max длина (линейный размер)"
								value={max_width}
								onChange={(e) => setMax_width(e.target.value)}
							/>
							<input
								className="short-imput"
								placeholder="Max диаметр"
								value={max_d}
								onChange={(e) => setMax_d(e.target.value)}
							/>

							<CitiesDiv>
								<div
									{...getRootProps()}
									style={{ display: 'flex', width: '100%' }}
								>
									{/* <Label {...getInputLabelProps()}>useAutocomplete</Label> */}
									<InputCities
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
							</CitiesDiv>
						</div>

						{/* <textarea placeholder='Описание заказа'></textarea> */}

						<Controller
							control={control}
							name="details"
							rules={{ required: true }}
							render={({ field: { onChange, value } }) => (
								<InputWrapper errorState={!!errors.details}>
									{errors.details ? (
										<ErrMessage> {errors.details.message} </ErrMessage>
									) : null}
									<textarea
										placeholder="Описание заказа"
										value={value}
										{...register('details')}
									/>
								</InputWrapper>
							)}
						/>

						{selectedText.length > 0 && (
							<div className="toms">
								<h2>Выбранные виды мехобработки:</h2>
								{selectedText?.map((item, index) => (
									<div className="tom" key={index}>
										<div id={index}>{item}</div>
										<div className="close" onClick={handleDelete}>
											&times;
										</div>
									</div>
								))}
							</div>
						)}

						<button className="action-menu" onClick={handleOpenMenu}>
							Добавить виды обработки
						</button>

						<div className="upload">
							<div className="input">
								<label htmlFor="photo-input">
									{lengthPhoto?.length > 0
										? `Выбрано ${lengthPhoto?.length} фото`
										: 'Загрузите до 10 фото заказа. Разрешенные форматы: png, jpg, jpeg.'}
									<img src={photoIco} alt="" />
								</label>

								{/* <input type='file' multiple id='photo-input' onChange={onSelectPhoto}/> */}

								<Controller
									control={control}
									name="photo"
									rules={{ required: false }}
									render={({ field: { onChange, value } }) => (
										<InputWrapper errorState={!!errors.photo}>
											{errors.photo ? (
												<ErrMessage> {errors.photo.message} </ErrMessage>
											) : null}
											<input
												// className="input"
												id="photo-input"
												type="file"
												multiple
												// value={value}
												onInput={onSelectPhoto}
												onChange={onChange}
												accept="image/jpeg,image/png"
												{...register('photo')}
											/>
										</InputWrapper>
									)}
								/>

								{/* {needPhoto && <ErrMessage> Загрузите хотя бы 1 фото </ErrMessage>} */}
								{manyPhoto && (
									<ErrMessage> Много фото, удалите часть </ErrMessage>
								)}
							</div>

							<div className="input">
								<label htmlFor="file-input">
									{lengthFile?.length > 0
										? `Выбрано ${lengthFile?.length} файлов`
										: 'Загрузите до 10 файлов заказа. Разрешенные форматы: pdf, doc, docx, xls, xlsx, png, jpg, jpeg.'}
									<img src={docIco} alt="" />
								</label>

								{/* <input type='file' multiple id='file-input' onChange={onSelectFile}/> */}

								<Controller
									control={control}
									name="file"
									rules={{ required: true }}
									render={({ field: { onChange, value } }) => (
										<InputWrapper errorState={!!errors.file}>
											{errors.file ? (
												<ErrMessage> {errors.file.message} </ErrMessage>
											) : null}
											<input
												// className="input"
												id="file-input"
												type="file"
												multiple
												// value={value}
												onInput={onSelectFile}
												onChange={onChange}
												accept=".pdf,  .doc, .docx, .xls, .xlsx, .png, .jpg, .jpeg"
												{...register('file')}
											/>
										</InputWrapper>
									)}
								/>

								{/* {needFile && <ErrMessage> Загрузите хотя бы 1 файл </ErrMessage>} */}
								{manyFile && (
									<ErrMessage> Много файлов, удалите часть </ErrMessage>
								)}
							</div>
						</div>

						<div className="preview-wrapper">
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
												<img src={deleteIco} alt="" className="delete-btn" />
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
											<img src={deleteIco} alt="" className="delete-btn" />
										</button>
									</div>
								))}
							</div>
						</div>

						<button className="accept-btn" type="submit">
							Отправить
						</button>
					</Forma>
				</div>
			)}

			<VidiModal
				id="vidiModal"
				style={{ display: showModal ? 'block' : 'none' }}
			>
				<Modal
					data={listVidi}
					selected={selected}
					setSelected={setSelected}
					selectedText={selectedText}
					setSelectedText={setSelectedText}
					setShowModal={setShowModal}
				/>
			</VidiModal>
		</Body>
	);
};

export default AddOrder;

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const ErrMessage = styled.p`
	color: red;
	margin-bottom: -15px;
	margin-top: 10px;
`;

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
		padding: 98px 66px 72px;
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
		font-weight: 500;
		font-size: 24px;
		color: #333333;

		@media screen and (max-width: 480px) {
			font-size: 20px;
		}
	}

	.action-menu {
		display: flex;
		margin-top: 35px;
		font-size: 20px;
		text-decoration-line: underline;
		color: #00aeae;
	}

	.action {
		display: flex;
		width: 320px;
		justify-content: flex-end;
		margin-top: 95px;

		font-size: 18px;
		text-decoration-line: underline;
		color: #bfbfbf;
	}
`;

const InputCities = styled.input`
	padding: 20px 30px;
	border: 2px solid #bfbfbf;
	border-radius: 5px;
	outline: none;
	width: 386px;
	color: black;

	@media screen and (max-width: 1750px) {
		width: 100%;
		margin-top: 25px;
	}

	@media screen and (max-width: 480px) {
		font-size: 16px;
		padding: 10px 20px;
		border: 1px solid #bfbfbf;
		margin-top: 15px;
	}
`;

const CitiesDiv = styled.div`
	display: flex;
	max-width: 386px;
	position: relative;

	@media screen and (max-width: 1750px) {
		max-width: 100%;
	}
`;

const Forma = styled.form`
	display: flex;
	flex-direction: column;
	margin-top: 30px;

	@media screen and (max-width: 480px) {
		margin-top: 0;
	}

	.upload {
		display: flex;
		justify-content: space-between;
		margin-top: 40px;

		.input {
			text-align: center;
			height: 175px;
			width: 49%;
			border: 2px solid #bfbfbf;
			border-radius: 5px;

			@media screen and (max-width: 480px) {
				font-size: 16px;
				padding: 10px 20px;
				border: 1px solid #bfbfbf;
				margin-top: 15px;
			}
		}

		label {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			padding: 0 20%;
			font-size: 16px;
			color: #bfbfbf;
			cursor: pointer;

			@media screen and (max-width: 480px) {
				font-size: 16px;
				padding: 0;
			}

			img {
				margin-top: 10px;
				width: 40px;
			}
		}

		input {
			width: 0.1px;
			height: 0.1px;
			opacity: 0;
			overflow: hidden;
			position: absolute;
			z-index: -1;
		}
	}

	.preview-wrapper {
		display: flex;
		justify-content: space-between;
		margin-top: 60px;

		.text-wrapper {
			display: flex;
			flex-direction: column;
			width: 49%;

			.text {
				margin: 0;

				font-size: 18px;
				text-align: justify;
				color: #7c7c7c;
			}
		}
		.preview-file {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			width: 49%;
			gap: 15px;
			margin-top: 10px;

			.preview-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				height: 135px;
			}

			.preview-item-file {
				display: flex;
				flex-direction: column;
				align-items: center;
				height: 135px;
			}

			.preview-img {
				height: 110px;
				cursor: pointer;
				border: 1px solid #00000022;
			}

			span {
				font-size: 18px;
				text-align: justify;
				text-decoration-line: underline;
				color: #7c7c7c;
				cursor: pointer;
			}

			.delete-btn {
				width: 18px;
				height: 20px;
				margin-top: 10px;
			}
		}

		.preview {
			display: flex;
			flex-wrap: wrap;
			gap: 15px;
			margin-top: 10px;

			.preview-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				height: 135px;
			}

			.preview-item-file {
				display: flex;
				flex-direction: column;
				align-items: center;
				height: 135px;
			}

			.preview-img {
				height: 110px;
				cursor: pointer;
				border: 1px solid #00000022;
			}

			.delete-btn {
				width: 18px;
				height: 20px;
				margin-top: 10px;
			}
		}
	}

	.toms {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 20px;

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
				font-size: 40px;
				margin-left: 20px;
			}

			.close:hover,
			.close:focus {
				color: #00aeae;
				text-decoration: none;
				cursor: pointer;
			}
		}
	}

	.top {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		width: 100%;
		position: relative;

		@media screen and (max-width: 1750px) {
			display: block;
			flex-direction: column;
		}

		.short-imput {
			padding: 20px 30px;
			border: 2px solid #bfbfbf;
			border-radius: 5px;
			outline: none;
			max-width: 590px;
			color: black;
			max-width: 386px;
			width: 100%;

			@media screen and (max-width: 1750px) {
				max-width: none;
				margin-top: 25px;
			}
			@media screen and (max-width: 480px) {
				font-size: 16px;
				padding: 10px 20px;
				border: 1px solid #bfbfbf;
				margin-top: 15px;
			}
		}

		.input-cities {
			width: 32.3%;
			position: absolute;
			right: 0px;
			bottom: -65px;
		}

		select {
			padding: 20px 30px;
			border: 2px solid #bfbfbf;
			border-radius: 5px;
			outline: none;
			width: 100%;
			max-width: 590px;
			color: black;
			background-color: white;

			@media screen and (max-width: 1750px) {
				max-width: none;
				margin-top: 25px;
			}

			@media screen and (max-width: 480px) {
				font-size: 16px;
				padding: 10px 20px;
				border: 1px solid #bfbfbf;
				margin-top: 15px;
			}
		}
	}

	.long-input {
		padding: 20px 30px;
		border: 2px solid #bfbfbf;
		border-radius: 5px;
		outline: none;
		width: 100%;
		max-width: 590px;
		color: black;
		font-size: 18px;

		@media screen and (max-width: 1750px) {
			max-width: none;
			margin-top: 25px;
		}

		@media screen and (max-width: 480px) {
			font-size: 16px;
			padding: 10px 20px;
			border: 1px solid #bfbfbf;
			margin-top: 15px;
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
			margin-top: 15px;
		}
	}

	.accept-btn {
		display: flex;
		width: 340px;
		height: 67px;
		align-items: center;
		justify-content: center;
		background: #00aeae;
		border-radius: 5px;
		margin: 0 auto;
		margin-top: 89px;
		font-size: 24px;
		color: #ffffff;

		@media screen and (max-width: 480px) {
			width: 240px;
			font-size: 22px;
			margin-top: 50px;
		}
	}
`;

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
