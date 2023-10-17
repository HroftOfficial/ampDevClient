import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Collapse,
	Checkbox,
	Radio,
	FormControlLabel,
} from '@mui/material';

export const ListItemStyled = ({
	name,
	subItem,
	id,
	selectGroup,
	setSelectGroup,
	checked,
	setChecked,
}) => {
	const array = subItem?.filter((group) => group.mainId[0] === id);
	const handleClick = () => {
		setSelectGroup(id);
		setChecked([]);
	};

	// const [checked, setChecked] = useState([]);

	// const handleToggle = (value) => () => {
	// 	const currentIndex = checked.indexOf(value);
	// 	const newChecked = [...checked];

	// 	if (currentIndex === -1) {
	// 		newChecked.push(value);
	// 	} else {
	// 		newChecked.splice(currentIndex, 1);
	// 	}

	// 	setChecked(newChecked);
	// };

	const isLocalTrue = () => {
		const res = localStorage.setItem('localTrue', true);
		return Boolean(res);
	};

	const handleToggle = (value, newId) => () => {
		const currentIndex = checked?.findIndex((el) => el === newId);
		if (currentIndex === -1) {
			setChecked((prevState) => [...prevState, newId]);
			if (isLocalTrue) {
				const arr = JSON.parse(localStorage.getItem('subGroup')) || [];
				localStorage.setItem('subGroup', JSON.stringify([...arr, newId]));
			}
		} else {
			setChecked(checked?.filter((el) => el !== newId));
			if (isLocalTrue) {
				const arr = JSON.parse(localStorage.getItem('subGroup'));
				localStorage.setItem(
					'subGroup',
					JSON.stringify(arr.filter((el) => el !== newId))
				);
			}
		}
	};

	return (
		<>
			<ListItemButton onClick={handleClick} id={id}>
				<FormControlLabel
					control={
						<Radio
							sx={{
								color: '#00AEAE',
								'&.Mui-checked': {
									color: '#00AEAE',
								},
							}}
						/>
					}
					checked={selectGroup === id}
					tabIndex={-1}
				/>
				<ListItemText primary={name} />
			</ListItemButton>
			{array?.length > 1 && (
				<Collapse
					in={selectGroup === id ? true : false}
					timeout="auto"
					unmountOnExit
				>
					<List component="div">
						{array.map((item, index) => {
							return (
								<ListItemButton
									onClick={handleToggle(index, item._id)}
									key={item._id}
								>
									<ListItemText
										id={`checkbox-list-label-${index}`}
										primary={item.name}
									/>
									<Checkbox
										// checked={checked.indexOf(index) !== -1}
										checked={Boolean(checked?.find((el) => el === item?._id))}
										inputProps={{
											'aria-labelledby': `checkbox-list-label-${index}`,
										}}
										sx={{
											color: '#00AEAE',
											'&.Mui-checked': {
												color: '#00AEAE',
											},
										}}
									/>
								</ListItemButton>
							);
						})}
					</List>
				</Collapse>
			)}
		</>
	);
};
