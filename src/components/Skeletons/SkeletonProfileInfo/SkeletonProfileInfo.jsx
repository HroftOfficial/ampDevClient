import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { skeletonCost } from '../../../utils/skeletonArr';

import classes from './SkeletonProfileInfo.module.css';

export const SkeletonProfileInfo = () => {
	return (
		<Box className={classes.wrapper}>
			<Skeleton width={150} height={45} />
			<Box className={classes.content}>
				{skeletonCost(8).map((el) => {
					return (
						<Skeleton key={el} sx={{ marginTop: '13px', height: '30px' }} />
					);
				})}
			</Box>
			<Skeleton sx={{ marginTop: '75px', height: '30px', width: '200px' }} />

			<Skeleton sx={{ marginTop: '75px', height: '30px', width: '170px' }} />

			<Skeleton className={classes.skeletonItem} />

			<Skeleton sx={{ marginTop: '40px', height: '30px', width: '200px' }} />

			<Skeleton sx={{ marginTop: '75px', height: '30px', maxWidth: '300px' }} />
		</Box>
	);
};
