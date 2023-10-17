import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import classes from './SkeletonProfileLogo.module.css';

export const SkeletonProfileLogo = () => {
	return (
		<Box className={classes.wrapper}>
			<Skeleton
				sx={{ height: '300px', width: '254px', marginBottom: '45px' }}
				variant="rectangular"
			/>
			<Skeleton width="50%" height={30} />
			<Skeleton width="80%" height="20%" />
			<Skeleton width="40%" />
		</Box>
	);
};
