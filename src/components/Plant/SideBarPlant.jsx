import styled from 'styled-components';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { List } from '@mui/material';
import { ListItemStyled } from './ListItemStyled';

import classes from './SideBarPlant.module.css';

const SideBarPlant = ({
	mainGroup,
	subGroup,
	selectGroup,
	setSelectGroup,
	// handlerChange,
	checkedGroup,
	setCheckedGroup,
}) => {
	// console.log('sub', subGroup);

	const plantActiveGroup = subGroup.filter((el) => el.enabled === true);
	const plantActiveMainGroup = [
		mainGroup[0],
		...mainGroup.filter((el) => el.enabled === true),
	];

	// console.log('activesb', plantActiveGroup);
	// let index = [];

	// for (let key in stateMeh) {
	// 	if (stateMeh[key] === true) index.push(key);
	// }

	return (
		<div className={classes.wrapper}>
			<FormControl style={{ width: '100%' }}>
				<FormLabel
					style={{
						color: 'black',
						fontWeight: 700,
						fontSize: '1.4rem',
						paddingLeft: '10px',
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<span>Категории:</span>{' '}
				</FormLabel>

				<List
					style={{
						color: 'black',
						paddingLeft: '10px',
						display: 'flex',
						flexDirection: 'column',
					}}
					aria-labelledby="controlled-radio-buttons-group"
					name="controlled-radio-buttons-group"
					component={RadioGroup}
					// onChange={handlerChange}
				>
					{plantActiveMainGroup?.map(({ name, _id }) => {
						return (
							<ListItemStyled
								key={_id}
								name={name}
								id={_id}
								subItem={plantActiveGroup}
								selectGroup={selectGroup}
								setSelectGroup={setSelectGroup}
								checked={checkedGroup}
								setChecked={setCheckedGroup}
							/>
						);
					})}
				</List>
			</FormControl>
		</div>
	);
};

export default SideBarPlant;

const Modal = styled.div`
	background-color: #fefefe;
	margin: auto;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	animation-name: animatetop;
	animation-duration: 0.5s;
	z-index: 40;

	@media screen and (max-width: 710px) {
		display: flex;
		padding: 20px 40px;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		position: fixed;
	}

	@-webkit-keyframes animatetop {
		from {
			left: -300px;
			opacity: 0;
		}
		to {
			left: 0;
			opacity: 1;
		}
	}

	@keyframes animatetop {
		from {
			left: -300px;
			opacity: 0;
		}
		to {
			left: 0;
			opacity: 1;
		}
	}

	.close {
		color: black;
		float: right;
		font-size: 40px;
		font-weight: bold;
		margin-right: 40px;

		@media screen and (max-width: 710px) {
			margin-right: 0px;
			margin-top: 0px;
		}
		@media screen and (min-width: 710px) {
			display: none;
		}
	}

	.close:hover,
	.close:focus {
		color: #00aeae;
		text-decoration: none;
		cursor: pointer;
	}
`;
