import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { skeletonCost } from '../../../utils/skeletonArr';

import classes from './SkeletonProfileEditInfo.module.css';

export const SkeletonProfileEditInfo = () => {
	return (
		<Box className={classes.wrapper}>
			<Skeleton width={200} height={45} />
			<Box className={classes.content}>
				{skeletonCost(7).map((el) => {
					return <Skeleton key={el} />;
				})}
			</Box>
			<Skeleton sx={{ margin: '35px', height: '30px', width: '200px' }} />

			<Skeleton
				sx={{
					height: '50px',
					width: '250px',
					margin: '0 auto',
				}}
				variant="rectangular"
			/>
		</Box>
	);
};
