import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Popper from '@mui/material/Popper';
import { AuthContext } from '../../../../hoc/AuthProvider';
import profileIco from '../../../../img/profile-ico.svg';
import profileIcoOpen from '../../../../img/profile-ico-open.svg';
import { NavMenuProfile } from '../NavMenuProfile/NavMenuProfile';
import classes from './MobileAsidebar.module.css';

export const MobileAsidebar = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const { store } = useContext(AuthContext);
	let navigate = useNavigate();

	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popper' : undefined;

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<div className={classes.wrapper}>
				<img
					src={open ? profileIcoOpen : profileIco}
					alt="openMenu"
					aria-describedby={id}
					onClick={handleClick}
				/>
			</div>
			<Popper
				sx={{
					width: '100%',
					minHeight: '100vh',
					backgroundColor: '#f6f6f6',
					display: 'flex',
					justifyContent: 'center',
					padding: '20px',
					zIndex: 10,
				}}
				id={id}
				open={open}
				anchorEl={anchorEl}
			>
				<div>
					<NavMenuProfile handleClose={handleClose} />
					<div className={classes.action}>
						<button onClick={() => store.logout(navigate)}>Выход</button>
					</div>
				</div>
			</Popper>
		</>
	);
};
