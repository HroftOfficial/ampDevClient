// import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
// import CircularProgress from '@mui/material/CircularProgress';
// import { AuthContext } from '../../hoc/AuthProvider';
import Asidebar from './components/Asidebar/Asidebar';
import { MobileAsidebar } from './components/MobileAsidebar/MobileAsidebar';
import classes from './ProfileLayout.module.css';

export const ProfileLayout = () => {
	const matches = useMediaQuery('(min-width:1000px)');
	return (
		<div className={classes.wrapper}>
			{matches ? <Asidebar /> : <MobileAsidebar />}

			<div className={classes.outlet}>
				<Outlet />
			</div>
		</div>
	);
};
