import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { skeletonCost } from '../../utils/skeletonArr';
import Partners from './Partners';

const PartnersList = ({ data, isLoading }) => {
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-850 px-8">
				{skeletonCost(12).map((el) => {
					return (
						<Box
							key={el}
							sx={{ width: 290, marginRight: 0.5, my: 5 }}
							className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col 
    justify-around items-center p-8 h-full"
						>
							<Skeleton variant="rectangular" width={210} height={118} />
							<Skeleton width="60%" />
							<Skeleton width="60%" />
						</Box>
					);
				})}
			</div>
		);
	}

	if (!data.length) {
		return (
			<div className="container ">
				<h2 className="text-xl font-bold text-center tracking-tight text-gray-900 sm:text-2xl my-20">
					Данные отсутствуют..
				</h2>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-850 px-8">
			{data.map((p) => (
				<Partners key={p._id} dataCard={p} />
			))}
		</div>
	);
};

export default PartnersList;
