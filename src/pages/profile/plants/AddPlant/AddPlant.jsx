import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import PlantNewService from '../../../../services/PlantNewService.js';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Autocomplete from '@mui/material/Autocomplete';
import allowedFiles from '../../../../utils/allowedFiles.js';
import FilesUploadMulti from '../../../../components/FilesUploadMulti/FilesUploadMulti.jsx';
import { cities } from '../../../../utils/cities-name.js';
import { CheckFilesQuantity } from '../../components/CheckFilesQuantity/CheckFilesQuantity';

import classes from './AddPlant.module.css';

// const Listbox = MIstuled('ul')(() => ({
// 	width: '100%',
// 	margin: 0,
// 	padding: 0,
// 	zIndex: 1,
// 	top: 67,
// 	position: 'absolute',
// 	listStyle: 'none',
// 	backgroundColor: 'white',
// 	overflow: 'auto',
// 	maxHeight: 200,
// 	border: '1px solid rgba(0,0,0,.25)',
// 	[`& li.${autocompleteClasses.focused}`]: {
// 		backgroundColor: '#00AEAE',
// 		color: 'white',
// 		cursor: 'pointer',
// 	},
// 	'& li:active': {
// 		backgroundColor: '#00AEAE',
// 		color: 'white',
// 	},
// }));

const AddPlant = () => {
	const [plant, setPlant] = useState({
		mainGroup: '',
		plantGroup: '',
		name: '',
		newPlant: false,
		price: '',
		info: '',
	});
	const [isCheckFiles, setIsCheckFiles] = useState({
		needPhoto: false,
		manyPhoto: false,
		manyFiles: false,
	});

	const [plantGroup, setPlantGroup] = useState([]);

	const [mainGroup, setMainGroup] = useState([]);

	// console.log('group', plantGroup, mainGroup);

	const [message, setMessage] = useState('');
	const [listUsers, setListUsers] = useState([]);
	// const [idWorkUser, setIdWorkUser] = useState([]);
	// const [nameWorkUser, setNameWorkUser] = useState([]);

	const [inputValue, setInputValue] = useState('');

	///files
	const [plantPhoto, setPlantPhoto] = useState([]);
	const [plantFiles, setplantFiles] = useState([]);
	const [selectIndex, setSelectIndex] = useState(0);
	const [pfiles, setPfiles] = useState([]); //photo add draft
	const [files, setFiles] = useState([]); //files add draft
	const [errMsg, setErrMsg] = useState('');

	///files

	const navigate = useNavigate();

	useEffect(() => {
		getPlantGroup();
	}, []);

	const handleChange = (e) => {
		setPlant((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

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

	async function createPlantGroup(e) {
		try {
			e.preventDefault();

			if (pfiles?.length < 1) {
				setIsCheckFiles({ ...isCheckFiles, needPhoto: true });
				return;
			}
			// if (previewFile.length < 1) {
			// 	setNeedFile(true);
			// 	return;
			// }
			if (pfiles?.length > 10) {
				setIsCheckFiles({ ...isCheckFiles, manyPhoto: true });
				return;
			}
			if (files?.length > 10) {
				setIsCheckFiles({ ...isCheckFiles, manyFiles: true });
				return;
			}
			if (!plant.plantGroup) {
				setMessage('Укажите Основную группу, а затем Подгруппу');
				return;
			}
			setIsCheckFiles({ needPhoto: false, manyPhoto: false, manyFiles: false });
			setMessage('');
			const f_data = new FormData();
			Object.values(pfiles).forEach((item) => {
				f_data.append('photo_plant', item);
			});
			Object.values(files).forEach((item) => {
				f_data.append('file_plant', item);
			});

			f_data.append('index_photo', selectIndex);
			f_data.append('name', plant.name);
			// f_data.append('plantGroupAp', plant.mainGroup);
			f_data.append('plantGroup', plant.plantGroup);
			f_data.append('newPlant', plant.newPlant);
			f_data.append('price', plant.price);
			f_data.append('info', plant.info);
			f_data.append('cities', inputValue);
			// console.log(inhere_user) такого вида 62da51812f17db0012df17e6
			// console.log(inhere_user_name) такого вида Сагдинов Александр Николаевич
			// f_data.append('inhere_user', idWorkUser);
			// f_data.append('inhere_user_name', nameWorkUser);
			// const response = await PlantGroupService.createPlantGroupWitchFile(f_data);
			await PlantNewService.createPlant(f_data);

			navigate('/profile/plants');
		} catch (error) {
			setMessage(error?.response?.data?.message);
			console.error(error?.response?.data?.message);
		}
	}

	const [inputText, setInputText] = useState('');
	const inputHandler = (e) => {
		//convert input text to lower case
		const lowerCase = e.target?.value?.toLowerCase();
		setInputText(lowerCase);
	};

	const filteredData = listUsers.filter((el) => {
		//if no input the return the original
		if (inputText === '') {
			return el;
		}
		//return the item which contains the user input
		else {
			return el.org?.toLowerCase().includes(inputText);
		}
	});

	return (
		<div className={classes.body}>
			{/* <Asidebar /> */}
			<div className={classes.newUser}>
				<h1 className={classes.newUserTitle}>Добавить объявление</h1>
				<div className={classes.newUserForm}>
					<form className={classes.newUserForm} onSubmit={createPlantGroup}>
						<div className={classes.newUserFormItem}>
							<div className={classes.newUserItem}>
								<InputLabel id="mainGroup">Основная группа</InputLabel>
								<Select
									labelId="mainGroup"
									id="mainGroup"
									name="mainGroup"
									value={plant.mainGroup}
									label="mainGroup"
									onChange={handleChange}
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
								<InputLabel id="plantGroup">Подгруппа</InputLabel>
								<Select
									labelId="plantGroup"
									id="plantGroup"
									name="plantGroup"
									disabled={plant.mainGroup ? false : true}
									value={plant.plantGroup}
									label="plantGroup"
									onChange={handleChange}
									required
								>
									{plantGroup
										?.filter(
											(item) =>
												item.mainId[0] === plant.mainGroup &&
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
									<MenuItem value="false">Нет</MenuItem>
									<MenuItem value="true">Да</MenuItem>
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
								<InputLabel id="info">Населенный пункт</InputLabel>
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
											label="Выберите город"
											inputProps={{
												...params.inputProps,
												autoComplete: 'new-cities', // disable autocomplete and autofill
											}}
										/>
									)}
								/>
							</div>

							{/* <div className={classes.newUserItem}>
							<InputLabel>Фото</InputLabel>
							<input
								accept="image/*"
								style={{ display: 'none' }}
								id="images"
								type="file"
								onChange={(e) => setImages(e.target?.files[0])}
								required
							/>
							<label htmlFor="images">
								<Button
									variant="contained"
									component="span"
									className={classes.imageButton}
								>
									Загрузить
								</Button>
							</label>
						</div> */}
						</div>
						<div className={classes.plantInfoWrapper}>
							<div className={classes.plantInfo}>
								<InputLabel id="info">Дополнительная информация</InputLabel>
								<TextareaAutosize
									aria-label="info"
									minRows={3}
									name="info"
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
									// handleDeleteFile={handleDeleteFile}
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
									// handleDeleteFile={handleDeleteFile}
								/>
							</div>
							<CheckFilesQuantity
								needPhoto={isCheckFiles.needPhoto}
								manyPhoto={isCheckFiles.manyPhoto}
								manyFiles={isCheckFiles.manyFiles}
							/>
						</div>

						{/* <div className={classes.oweners}>
							<div className={classes.ownName}>
								<h3 style={{ width: '100px' }}>Владелец</h3>
								<TextField
									id="nameWork"
									variant="standard"
									required
									fullWidth
									value={nameWorkUser}
									InputProps={{
										disableUnderline: true, // <== added this
									}}
									sx={{
										display: 'block',
									}}
								/>
							</div>
							<div className={classes.search}>
								<TextField
									id="outlined-basic"
									onChange={inputHandler}
									variant="outlined"
									fullWidth
									label="Поиск по организации"
									sx={{ paddingBottom: 1 }}
								/>
							</div>
							<div className={classes.ownWrapper}>
								<div className={classes.ownList}>
									{filteredData.map((item) => {
										if (item?.deleted == false && item?.enabled == true)
											return (
												<div key={item?._id} className={classes.ownListLable}>
													<input
														id={item?._id}
														type="radio"
														name="common"
														onClick={() => {
															console.log(item);
															setNameWorkUser(item?.org);
															setIdWorkUser(item?._id);
														}}
													/>
													<label htmlFor={item?._id}>{item?.org}</label>
												</div>
											);
									})}
								</div>
							</div>
						</div> */}

						<div className={classes.newUserItem}>
							<button
								className={classes.newUserButton}
								type="submit"
								// onClick={(e) => createPlantGroup(e)}
							>
								Создать
							</button>
						</div>
					</form>
				</div>

				<div className={classes.newUserErrorMessage}>{message}</div>
			</div>
		</div>
	);
};

export default AddPlant;
