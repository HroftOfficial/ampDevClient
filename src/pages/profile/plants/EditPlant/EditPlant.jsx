import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import config from '../../../../settings/settings';
import allowedFiles from '../../../../utils/allowedFiles';
import PlantNewService from '../../../../services/PlantNewService';
import FilesUploadMulti from '../../../../components/FilesUploadMulti/FilesUploadMulti';
import { cities } from '../../../../utils/cities-name.js';
import { CheckFilesQuantity } from '../../components/CheckFilesQuantity/CheckFilesQuantity';
import classes from './EditPlant.module.css';
// import Button from '@mui/material/Button';
// import {observer} from "mobx-react-lite";
// import { MultiUploader, SingleUploader } from "../../components/uploader/uploader";

const { uploadPlantPhoto } = config;

const EditPlant = () => {
	const { id } = useParams();

	const [plant, setPlant] = useState({
		plantGroup: '',
		name: '',
		newPlant: false,
		cities: '',
		price: '',
		info: '',
	});

	const [isCheckFiles, setIsCheckFiles] = useState({
		needPhoto: false,
		manyPhoto: false,
		manyFiles: false,
	});
	// const plantCities = cities.find((el) => el.name === plant.cities);
	const [plantMainGroup, setPlantMainGroup] = useState('');

	const [message, setMessage] = useState('');
	const [plantGroup, setPlantGroup] = useState([]);
	const [mainGroup, setMainGroup] = useState([]);

	const [inputValue, setInputValue] = useState('');

	///files
	const [plantPhoto, setPlantPhoto] = useState([]);
	const [plantFiles, setPlantFiles] = useState([]);
	const [selectIndex, setSelectIndex] = useState(0);
	const [pfiles, setPfiles] = useState([]); //photo add draft
	const [files, setFiles] = useState([]); //files add draft
	const [errMsg, setErrMsg] = useState('');

	///files

	const navigate = useNavigate();

	const handleChange = (e) => {
		setPlant((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	useEffect(() => {
		getItemPlant(id);
		getPlantGroup();
	}, [id]);

	async function getItemPlant(id) {
		try {
			const response = await PlantNewService.fetchItemPlant(id);
			// console.log('editData', response.data);
			setPlant(response?.data?.plantData);
			setPlantPhoto(response?.data?.plantData.photo_plant);
			setPlantFiles(response?.data?.plantData.file_plant);
			setPlantMainGroup(response?.data?.mainGroup?.plantGroupAp);
			setSelectIndex(response?.data?.plantData?.index_photo);
		} catch (error) {
			console.error(error?.response?.data?.message);
		}
	}

	async function getPlantGroup() {
		try {
			const response = await PlantNewService.fetchPlantNewGroup();
			const mainGroup = await PlantNewService.fetchPlantNewMainGroups();
			setMainGroup(mainGroup?.data);
			setPlantGroup(response?.data);
		} catch (error) {
			setMessage(error?.response?.data?.message);
			console.error(error?.response?.data?.message);
		}
	}

	async function updatePlantGroupAll(e) {
		try {
			e.preventDefault();

			if (pfiles?.length + plantPhoto?.length < 1) {
				setIsCheckFiles({ ...isCheckFiles, needPhoto: true });
				return;
			}
			// if (previewFile.length < 1) {
			// 	setNeedFile(true);
			// 	return;
			// }
			if (pfiles?.length + plantPhoto?.length > 10) {
				setIsCheckFiles({ ...isCheckFiles, manyPhoto: true });
				return;
			}
			if (files?.length + plantFiles?.length > 10) {
				setIsCheckFiles({ ...isCheckFiles, manyFiles: true });
				return;
			}
			if (!plant.plantGroup) {
				setMessage('Укажите Основную группу, а затем Подгруппу');
				return;
			}
			setIsCheckFiles({ needPhoto: false, manyPhoto: false, manyFiles: false });
			// console.log(images, name, sortNumber, enabled, newPlant, info);
			const f_data = new FormData();
			f_data.append('name', plant.name);
			f_data.append('plantGroup', plant.plantGroup);
			f_data.append('newPlant', plant.newPlant);
			f_data.append('price', plant.price);
			f_data.append('info', plant.info);
			f_data.append('cities', inputValue);
			f_data.append('index_photo', selectIndex);
			Object.values(pfiles).forEach((item) => {
				f_data.append('photo_plant', item);
			});
			Object.values(files).forEach((item) => {
				f_data.append('file_plant', item);
			});
			// console.log(idWorkUser) такого вида 62da51812f17db0012df17e6
			// console.log(nameWorkUser) такого вида Сагдинов Александр Николаевич
			// const response = await PlantGroupService.updateAll(f_data,id);
			await PlantNewService.updatePlant(f_data, id);
			navigate('/profile/plants');
			// setAvatar(response?.data[0]?.path?.replace(/public/i, process.env.REACT_APP_API_URL))
		} catch (error) {
			setMessage(error?.response?.data?.message);
			console.error(error?.response?.data?.message);
		}
	}

	const handleDeleteFile = async (values) => {
		// console.log('data', ...f_data);
		let isMounted = true;
		const controller = new AbortController();
		try {
			const f_data = new FormData();
			f_data.append('filename', values);
			console.log('fornData', ...f_data);
			await PlantNewService.deletePlantFile(id, f_data);
			isMounted && getItemPlant(id);
			// console.log("delete handler",response.data.photo_url)
			// setDrafts(response?.data?.userData?.photo_url);
			// setDraftsFiles(response?.data?.userData?.file_url);
		} catch (err) {
			// if (!err?.response) {
			// 	setErrMsg('Нет ответа сервера');
			// } else if (err.response?.status === 500) {
			// 	setErrMsg(`Ошибка: ${err?.response?.data?.message}`);
			// } else if (err.response?.status === 401) {
			// 	navigate('/login', { state: { from: location }, replace: true });
			// } else if (err.response?.status === 400) {
			// 	setErrMsg(`Ошибка: ${err?.response?.data?.message}`);
			// } else {
			// 	setErrMsg('Неизвестная ошибка');
			// }
			// errRef.current.focus();
			console.error(err);
		} finally {
			isMounted = false;
		}
	};

	return (
		<div div className={classes.body}>
			{/* <Asidebar /> */}

			<div className={classes.user}>
				<div className={classes.userUpdate}>
					<span className={classes.userUpdateTitle}>
						Редактировать объявление
					</span>
					<div className={classes.userUpdateForm}>
						<div className={classes.newUserFormItem}>
							<div className={classes.newUserItem}>
								<InputLabel id="mainGroup">Основная группа</InputLabel>
								<Select
									labelId="mainGroup"
									id="mainGroup"
									name="mainGroup"
									value={plantMainGroup}
									label="mainGroup"
									onChange={(event) => setPlantMainGroup(event.target.value)}
								>
									{mainGroup
										?.filter((el) => el.enabled === true)
										.map((item) => (
											<MenuItem key={item?._id} value={item?._id}>
												{item?.name}
											</MenuItem>
										))}
								</Select>
							</div>
							<div className={classes.newUserItem}>
								<InputLabel id="group">Подгруппа</InputLabel>
								<Select
									labelId="group"
									id="group"
									name="plantGroup"
									value={plant.plantGroup}
									label="group"
									onChange={handleChange}
								>
									{plantGroup
										?.filter(
											(item) =>
												item.mainId[0] === plantMainGroup &&
												item.enabled === true
										)
										.map((item) => (
											<MenuItem key={item?._id} value={item?._id}>
												{item?.name}
											</MenuItem>
										))}
								</Select>
							</div>

							<div className={classes.newUserItem}>
								<InputLabel id="name">Название</InputLabel>
								<TextField
									id="name"
									name="name"
									variant="outlined"
									onChange={handleChange}
									required
									value={plant.name}
								/>
							</div>

							<div className={classes.newUserItem}>
								<InputLabel id="newPlant">Состояние (новое?)</InputLabel>
								<Select
									labelId="newPlant"
									id="newPlant"
									name="newPlant"
									value={plant.newPlant}
									label="newPlant"
									onChange={handleChange}
								>
									<MenuItem value="false">нет</MenuItem>
									<MenuItem value="true">да</MenuItem>
								</Select>
							</div>
							<div className={classes.newUserItem}>
								<InputLabel id="price">Стоимость</InputLabel>
								<TextField
									id="price"
									name="price"
									variant="outlined"
									onChange={handleChange}
									value={plant.price}
								/>
							</div>
							<div className={classes.newUserItem}>
								<InputLabel id="cities">Населенный пункт</InputLabel>
								<Autocomplete
									id="cities"
									name="cities"
									inputValue={inputValue}
									onInputChange={(event, newInputValue) => {
										setInputValue(newInputValue);
									}}
									options={cities}
									autoHighlight
									getOptionLabel={(option) => option.name}
									renderOption={(props, option) => (
										<Box component="li" {...props}>
											{option.name}
										</Box>
									)}
									renderInput={(params) => (
										<TextField
											{...params}
											label={plant.cities}
											inputProps={{
												...params.inputProps,
												autoComplete: 'new-cities', // disable autocomplete and autofill
											}}
										/>
									)}
								/>
							</div>
						</div>
						<div className={classes.plantInfoWrapper}>
							<div className={classes.plantInfo}>
								<InputLabel id="info">Дополнительная информация</InputLabel>
								<TextareaAutosize
									aria-label="info"
									name="info"
									minRows={3}
									required
									onChange={handleChange}
									value={plant.info}
								/>
							</div>
						</div>
						<div className={classes.newUserFormItem}>
							<div className={classes.fileBlock}>
								<InputLabel>Файлы </InputLabel>
								<small>
									Разрешенные форматы: pdf, doc, docx, xls, xlsx, png, jpg,
									jpeg, gif.
								</small>
								<FilesUploadMulti
									plant={plantFiles}
									selectIndex={selectIndex}
									// setSelectIndex = {setSelectIndex}
									files={files}
									setFiles={setFiles}
									variant={2}
									subject={'объявления'}
									allowedFiles={allowedFiles.plantFiles}
									// deletedPath = {deletedPath}
									// setDeletedPath ={setDeletedPath}
									handleDeleteFile={handleDeleteFile}
								/>
							</div>
							<div className={classes.fileBlock}>
								<InputLabel>Изображения </InputLabel>
								<small>Разрешенные форматы: png, jpg, jpeg.</small>
								<FilesUploadMulti
									plant={plantPhoto}
									selectIndex={selectIndex}
									setSelectIndex={setSelectIndex}
									files={pfiles}
									setFiles={setPfiles}
									variant={1}
									allowedFiles={allowedFiles.photo}
									subject={'объявления'}
									// deletedPath = {deletedPath}
									// setDeletedPath ={setDeletedPath}
									handleDeleteFile={handleDeleteFile}
									pathFileUpload={uploadPlantPhoto}
								/>
							</div>
							<CheckFilesQuantity
								needPhoto={isCheckFiles.needPhoto}
								manyPhoto={isCheckFiles.manyPhoto}
								manyFiles={isCheckFiles.manyFiles}
							/>
						</div>

						<button
							className={classes.userUpdateButton}
							onClick={(e) => updatePlantGroupAll(e)}
						>
							Сохранить изменения
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditPlant;
