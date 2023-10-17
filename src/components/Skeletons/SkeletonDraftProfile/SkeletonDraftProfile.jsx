import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { skeletonCost } from '../../../utils/skeletonArr';

import classes from './SkeletonDraftProfile.module.css';

export const SkeletonDraftProfile = () => {
	return (
		<Box className={classes.wrapper}>
			<Skeleton width={200} height={45} />
			<Box className={classes.nav}>
				{skeletonCost(4).map((el) => {
					return <Skeleton key={el} sx={{ height: '50px', width: '100px' }} />;
				})}
			</Box>
			<Skeleton width={200} height={45} />
			<Box className={classes.content}>
				{skeletonCost(7).map((el, index) => {
					return (
						<Skeleton
							key={el}
							className={index === 0 ? classes.item1 : classes.items}
						/>
					);
				})}
			</Box>
		</Box>
	);
};
