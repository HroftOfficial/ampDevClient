import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { skeletonCost } from '../../../utils/skeletonArr';

import classes from './SkeletonPlantDetails.module.css';

export const SkeletonPlantDetails = () => {
	return (
		<Box sx={{ width: '100%' }}>
			<Box className={classes.wrapper}>
				<Box className={classes.img}>
					<Skeleton variant="rectangular" width="100%" height={300} />
					<Skeleton
						sx={{ marginTop: '40px', height: '30px', width: '200px' }}
					/>
					<Skeleton
						sx={{ marginTop: '5px', height: '100px', maxWidth: '500px' }}
					/>
				</Box>

				<Box className={classes.content}>
					<Skeleton variant="rectangular" width={140} height={75} />
					{skeletonCost(8).map((el) => {
						return (
							<Skeleton
								key={el}
								sx={{ marginTop: '13px', height: '30px', width: '60%' }}
							/>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
};
