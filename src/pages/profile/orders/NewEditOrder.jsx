import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MobileMenu from './MobileMenu';
import MobileHeader from './MobileHeader';
import config from '../../../settings/settings';
import Asidebar from '../Asidebar';
import Modal from '../VidiModal';
import User from '../../../services/User';
import Orders from '../../../services/Orders';
import docIco from '../../../img/upload-document-ico.svg';
import photoIco from '../../../img/upload-photo-ico.svg';
import deleteIco from '../../../img/delete-ico.svg';

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
		// .test('required', warningPhoto.required, (value) =>{
		//   return value && value.length
		// } )
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
		// .test('required', warningFile.required, (value) =>{
		//   return value && value.length
		// } )
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

const EditOrder = () => {
	const [ready, setReady] = useState(false);
	const [mainOrder, setMainOrder] = useState([]); // большой главный заказ
	const [showModal, setShowModal] = useState(false); // скрыть моказать модалку мехобработок

	const [listVidi, setListVidi] = useState([]); // загружает в модалку виды мехобработки

	const [selected, setSelected] = useState([]); // хранится массив выбранных ID мехобработок, из модалки
	const [selectedText, setSelectedText] = useState([]); // хранится массив выбранных имен мехобработок, из модалки

	const [lengthFile, setLengthFile] = useState([]); // стейт выбранных файлов
	const [lengthPhoto, setLengthPhoto] = useState([]); // стейт выбранных фото

	const [title, setTitle] = useState(''); // загружает заголовок ..
	const [many, setMany] = useState('');
	const [kl, setKl] = useState('');
	const [kl_text, setKl_text] = useState('партия');
	const [max_width, setMax_width] = useState('');
	const [max_d, setMax_d] = useState('');
	const [cities, setCities] = useState('');
	const [details, setDetail] = useState('');

	const [work_category, setWork_category] = useState(mainOrder.work_category);

	const [previewLoadPhoto, setPreviewLoadPhoto] = useState([]); // устанавливает массив для превью фото
	const [previewLoadFile, setPreviewLoadFile] = useState([]); // устанавливает массив для првью файлов

	const [deletedArrayPhoto, setDeletedArrayPhoto] = useState([]); // массив с ID удаленных фото, для отправки на сервер
	const [deletedArrayFile, setDeletedArrayFile] = useState([]); // массив с ID удаленных файлов, для отправки на сервер

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const orders = await Orders.getOrders();
				const vidi = await User.getUsersToms();

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
						setNewPreview(item?.index_photo);
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

						const array = [];
						item?.work_info.forEach((item) => {
							array.push(item.name);
						});
						// console.log(array)
						setSelectedText(array);
					}
				}

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
		const id = e.target?.parentElement.children[0].id;
		const name = e.target?.parentElement.children[0].innerText;

		const tempSelected = selected.slice();
		tempSelected.splice(id, 1);
		setSelected(tempSelected);

		const tempSelectedText = selectedText.slice();
		const index2 = tempSelectedText.indexOf(name);
		tempSelectedText.splice(index2, 1);
		setSelectedText(tempSelectedText);

		// console.log('DELETED >> ', id)
		// console.log('DELETED >> ', name)
	};

	const [previewPhoto, setPreviewPhoto] = useState([]);
	const [previewFile, setPreviewFile] = useState([]);

	const onSelectPhoto = (e) => {
		let arrayofFiles = [];
		for (var i = 0; i < e.target?.files.length; i++) {
			const fileExtention = e.target?.files[i]?.name.split('.')[1];
			// console.log(fileExtention)
			let images = [];

			//   if (fileExtention == 'png' ||
			//   fileExtention == 'jpg' ||
			//   fileExtention == 'jpeg'||
			//   fileExtention == 'PNG'||
			//   fileExtention == 'JPG'||
			//   fileExtention == 'JPEG') {
			arrayofFiles.push(e.target?.files[i]);

			arrayofFiles.forEach((item) => {
				const ImageUrl = URL.createObjectURL(item);

				images.push(ImageUrl);
			});
			setPreviewPhoto(images);

			//   }
		}
		setLengthPhoto(arrayofFiles);
	};

	const removePhotoFromArray = (e, indx) => {
		e.preventDefault();

		// console.log(e )
		// console.log(indx )
		const index = e.target?.id;

		let newPreview = [...previewPhoto];
		let newLength = [...lengthPhoto];

		newPreview.splice(indx, 1);
		newLength.splice(indx, 1);

		setPreviewPhoto(newPreview);
		setLengthPhoto(newLength);
	};

	const handleSelectFirst = (e) => {
		e.preventDefault();
		const index = e.target.id;

		let newPreview = [...previewPhoto];
		let newLength = [...lengthPhoto];

		const item1 = newPreview?.splice(index, 1);
		const item2 = newLength?.splice(index, 1);

		newPreview?.unshift(item1[0]);
		newLength?.unshift(item2[0]);

		setPreviewPhoto(newPreview);
		setLengthPhoto(newLength);
	};

	const onSelectFile = (e) => {
		let arrayofFiles = [];
		for (var i = 0; i < e.target?.files.length; i++) {
			const fileExtention = e.target?.files[i].name.split('.')[1];
			// console.log(fileExtention)

			//   if (fileExtention == 'pdf' ||
			//   fileExtention == 'doc' ||
			//   fileExtention == 'docx' ||
			//   fileExtention == 'xls' ||
			//   fileExtention == 'xlsx' ||
			//   fileExtention == 'png' ||
			//   fileExtention == 'jpg' ||
			//   fileExtention == 'jpeg'||
			//   fileExtention == 'PDF'||
			//   fileExtention == 'DOC'||
			//   fileExtention == 'DOCX'||
			//   fileExtention == 'XLS'||
			//   fileExtention == 'XLSX'||
			//   fileExtention == 'PNG'||
			//   fileExtention == 'JPG'||
			//   fileExtention == 'JPEG') {
			arrayofFiles.push(e.target?.files[i]);

			setPreviewFile(arrayofFiles);
			//   }
		}
		setLengthFile(arrayofFiles);
	};

	const removeFileFromArray = (e, indx) => {
		e.preventDefault();

		const index = e.target.id;

		let newPreview = [...previewFile];
		let newLength = [...lengthFile];

		newPreview?.splice(indx, 1);
		newLength?.splice(indx, 1);

		setPreviewFile(newPreview);
		setLengthFile(newLength);
	};

	const removePhotoFromDownloads = (e, indx) => {
		e.preventDefault();
		// console.log(e)

		if (indx == newPreviewPhoto) return;
		if (indx < newPreviewPhoto) setNewPreview((s) => s - 1);
		const fileName =
			e.target?.parentElement.parentElement.children[0].currentSrc
				.split('/')
				.splice(-1, 1)[0];
		// console.log(fileName)

		const index = e.target?.id;

		let newPreview = [...previewLoadPhoto];
		let newDeletedPhoto = [...deletedArrayPhoto];
		// let newDeletedFile = [...deletedArrayPhoto];

		newPreview?.splice(indx, 1);
		newDeletedPhoto?.push(fileName);

		setPreviewLoadPhoto(newPreview);
		setDeletedArrayPhoto(newDeletedPhoto);
	};

	const removeFileFromDownloads = (e, indx) => {
		e.preventDefault();
		// console.log(e)
		const fileName =
			e.target?.parentElement.parentElement.children[0].innerText;
		// console.log(fileName)
		const index = e.target?.id;

		let newPreview = [...previewLoadFile];
		let newDeletedFile = [...deletedArrayFile];

		newPreview?.splice(indx, 1);
		newDeletedFile?.push(fileName);

		setPreviewLoadFile(newPreview);
		setDeletedArrayFile(newDeletedFile);
	};

	const handleFileOpen = (e) => {
		// console.log(e)
	};

	const [isOpenMenu, setIsOpen] = useState(false);
	const [newPreviewPhoto, setNewPreview] = useState();

	const handleNewPreview = (e) => {
		const name = e.target.id;
		// console.log(name)
		setNewPreview(name);
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
			photo: [],
			file: [],
		},
	});

	const [needPhoto, setNeedPhoto] = useState(false);
	const [needFile, setNeedFile] = useState(false);
	const [manyPhoto, setManyPhoto] = useState(false);
	const [manyFile, setManyFile] = useState(false);

	const onSubmit = async (data, e) => {
		try {
			e.preventDefault();

			// console.log(e)
			// console.log(data)

			// const form = e.target?.form;
			// const title = form[0]?.value;
			// const many = form[1]?.value;
			// const kl = form[2]?.value;
			// const kl_text = form[3]?.value;
			// const max_width = form[4]?.value;
			// const max_d = form[5]?.value;
			// const cities = form[6]?.value;
			// const details = form[7]?.value;
			const photos = lengthPhoto;
			const files = lengthFile;

			const deletedFilesTitle = [
				...deletedArrayFile.flat(),
				...deletedArrayPhoto.flat(),
			];

			if (photos?.length + previewLoadPhoto?.length < 1) {
				setNeedPhoto(true);
				return;
			}
			if (files?.length + previewLoadFile?.length < 1) {
				setNeedFile(true);
				return;
			}
			if (photos?.length + previewLoadPhoto?.length > 10) {
				setManyPhoto(true);
				return;
			}
			if (files?.length + previewLoadFile?.length > 10) {
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
			formData.append('cities', cities);
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

			// console.log('Sended from HookForm >> ', data)
			// console.log('Sended from state >> ', data2)
			// console.log('Sended Photo >> ', photos)
			// console.log('Sended Files >> ', files)

			const order = await Orders.editOrderAll(mainOrder._id, formData);

			//   console.log('Response editOrder >>> ', order)
			//
			navigate('/zakazes');
		} catch (e) {
			console.error('Error >>> ', e);
		}
	};

	return (
		<Body>
			{/* <Asidebar/>
      <MobileHeader setIsOpen={setIsOpen} isOpen={isOpenMenu}/>
      {isOpenMenu && <MobileMenu setIsOpen={setIsOpen}/>} */}
			{ready && (
				<div className="context-wrapper ">
					<h2>
						Редактирование заказа: {mainOrder?.number} {mainOrder?.title}
					</h2>

					<Forma
						enctype="multipart/form-data"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="top">
							{/* <input value={title} onChange={(e) => setTitle(e.target?.value)} placeholder='Название заказа'/> */}

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
											type="text"
											placeholder="Название заказа"
											value={value}
											{...register('title')}
										/>
									</InputWrapper>
								)}
							/>

							<input
								value={many}
								onChange={(e) => setMany(e.target?.value)}
								placeholder="Стоимость"
							/>

							{/* <input value={kl} onChange={(e) => setKl(e.target?.value)} placeholder='Количество деталей'/> */}

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
											type="text"
											placeholder="Количество деталей"
											value={value}
											{...register('kl')}
										/>
									</InputWrapper>
								)}
							/>

							<select
								className="empty"
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
								className="short-imput"
								placeholder="Max длина (линейный размер)"
							/>
							<input
								value={max_d}
								onChange={(e) => setMax_d(e.target?.value)}
								className="short-imput"
								placeholder="Max диаметр"
							/>
							<input
								value={cities}
								onChange={(e) => setCities(e.target?.value)}
								className="short-imput"
								placeholder="Город доставки"
							/>
						</div>

						<div className="bottom">
							{/* <textarea value={details} onChange={(e) => setDetail(e.target?.value)} placeholder='Описание заказа'></textarea> */}

							<Controller
								control={control}
								name="details"
								rules={{ required: true }}
								render={({ field: { onChange, value } }) => (
									<InputWrapper errorState={!!errors.kl}>
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
						</div>

						{selectedText?.length > 0 && (
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

						<button className="action" onClick={handleOpenMenu}>
							Добавить виды обработки
						</button>

						{previewLoadPhoto.length > 0 && (
							<div className="preview-wrapper">
								<div className="preview-place-photo">
									* отмечена фотография предпросмотра. В режиме редактирования,
									вы можете выбрать новую фотографию предпросмотра только из уже
									загруженных фотографий. Для того чтобы выбрать фотографию
									предпросмотра из новых фотографий - сначала загрузите их, а
									после установите здесь.
									{previewLoadPhoto?.map((img, index) => {
										return (
											<div key={index} className="preview-item-photo">
												<img
													src={`${config?.baseUrlUpload}/uploads/${img?.filename}`}
													id={index}
													alt="pic1"
													className="preview-img"
													onClick={handleNewPreview}
													style={{
														border:
															newPreviewPhoto == index
																? 'solid 3px #00AEAE'
																: 'none',
													}}
												/>
												<a
													href={`${config?.baseUrlUpload}/uploads/${img?.filename}`}
													target="_blank"
													noreferel="true"
												>
													Посмотреть
												</a>
												<button
													id={index}
													key={index}
													onClick={(e) => {
														removePhotoFromDownloads(e, index);
													}}
												>
													<img src={deleteIco} alt="" className="delete-btn" />
												</button>
											</div>
										);
									})}
								</div>

								<div className="preview-place-file">
									{previewLoadFile?.map((file, index) => (
										<div key={index} className="preview-item-file">
											{/* <span onClick={handleFileOpen}>{file.filename}</span> */}
											<a
												href={`${config?.baseUrlUpload}/uploads/${file?.filename}`}
												target="_blank"
												noreferel="true"
											>
												<span>{file?.filename}</span>
											</a>
											<button
												id={index}
												key={index}
												onClick={(e) => removeFileFromDownloads(e, index)}
											>
												<img src={deleteIco} alt="" className="delete-btn" />
											</button>
										</div>
									))}
								</div>
							</div>
						)}

						<div className="upload">
							<div className="input">
								<label htmlFor="photo-input">
									{lengthPhoto?.length > 0
										? `Выбрано ${lengthPhoto?.length} фото`
										: `Загрузите до ${
												10 - previewLoadPhoto?.length
										  } фото заказа. Разрешенные форматы: png, jpg, jpeg.`}
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

								{/* {needPhoto && <ErrMessage> Загрузите фото </ErrMessage>} */}
								{manyPhoto && (
									<ErrMessage> Много фото, удалите часть </ErrMessage>
								)}
							</div>

							<div className="input">
								<label htmlFor="file-input">
									{lengthFile?.length > 0
										? `Выбрано ${lengthFile?.length} файлов`
										: `Загрузите до ${10 - previewLoadFile?.length} 
              файлов заказа. Разрешенные форматы: pdf, doc, docx, xls, xlsx, png, jpg, jpeg.`}
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
												accept=".pdf,  .doc, .docx, .xls, .xlsx, .png, .jpg, .jpeg"
												onInput={onSelectFile}
												onChange={onChange}
												{...register('file')}
											/>
										</InputWrapper>
									)}
								/>

								{/* {needFile && <ErrMessage> Загрузите файл </ErrMessage>} */}
								{manyFile && (
									<ErrMessage> Много файлов, удалите часть </ErrMessage>
								)}
							</div>
						</div>

						<div className="preview-wrapper">
							<div className="preview-place-photo">
								{previewPhoto?.map((img, index) => (
									<div key={index} className="preview-item-photo">
										<img
											src={img}
											id={index}
											alt="pic1"
											className="preview-img"
											onClick={(e) => handleSelectFirst(e)}
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

							<div className="preview-place-file">
								{previewFile?.map((file, index) => (
									<div key={index} className="preview-item-file">
										<span onClick={handleFileOpen}>{file?.name}</span>
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

			{showModal && (
				<VidiModal id="vidiModal">
					<Modal
						data={listVidi}
						selected={selected}
						setSelected={setSelected}
						selectedText={selectedText}
						setSelectedText={setSelectedText}
						setShowModal={setShowModal}
					/>
				</VidiModal>
			)}
		</Body>
	);
};

export default EditOrder;

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const ErrMessage = styled.p`
	color: red;
	margin-bottom: 10px;
	margin-top: -5px;
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
		padding: 98px 66px 42px;
		max-width: 1200px;
		box-sizing: content-box;

		@media screen and (max-width: 768px) {
			padding: 68px 46px 42px;
		}

		@media screen and (max-width: 480px) {
			padding: 48px 16px 42px;
		}

		h2 {
			font-weight: 500;
			font-size: 24px;
			color: #333333;

			@media screen and (max-width: 480px) {
				font-size: 20px;
			}
		}
	}
`;

const Forma = styled.form`
	display: flex;
	flex-direction: column;
	margin-top: 30px;

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
			text-align: center;
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

	.action {
		display: flex;
		margin-top: 35px;
		font-size: 20px;
		text-decoration-line: underline;
		color: #00aeae;
	}

	.preview-wrapper {
		display: flex;
		justify-content: space-between;
		margin-top: 60px;

		.delete-btn {
			width: 18px;
			height: 20px;
			margin-top: 10px;
		}

		.preview-place-photo {
			display: flex;
			flex-wrap: wrap;
			gap: 15px;
			margin-top: 10px;
			max-width: 50%;

			@media screen and (max-width: 768px) {
				font-size: 14px;
			}

			.preview-item-photo {
				display: flex;
				flex-direction: column;
				align-items: center;
				height: 180px;
			}

			.preview-img {
				height: 130px;
				cursor: pointer;
				border: 1px solid #8e000021;
			}
		}

		.preview-place-file {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			width: 49%;
			gap: 15px;
			max-height: 400px;

			.preview-item-file {
				display: flex;
				flex-direction: column;
				align-items: center;
				max-height: 200px;
			}

			span {
				font-size: 17px;
				text-decoration-line: underline;
				color: #7c7c7c;
				cursor: pointer;
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
			height: 45px;

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

	.short-imput {
		max-width: 386px;
		width: 100%;
		@media screen and (max-width: 1750px) {
			max-width: none;
		}
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
		}

		@media screen and (max-width: 480px) {
			font-size: 16px;
			padding: 10px 20px;
			border: 1px solid #bfbfbf;
		}
	}

	.top {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;

		@media screen and (max-width: 1750px) {
			flex-direction: column;
		}
	}

	input {
		padding: 20px 30px;
		border: 2px solid #bfbfbf;
		border-radius: 5px;
		outline: none;
		width: 100%;
		max-width: 590px;
		color: black;

		@media screen and (max-width: 1750px) {
			max-width: none;
		}

		@media screen and (max-width: 480px) {
			font-size: 16px;
			padding: 10px 20px;
			border: 1px solid #bfbfbf;
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
