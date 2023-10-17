import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination, PaginationItem, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';

import classes from './Pagination.module.css';

const PaginationPortal = ({
	data,
	changePage,
	page,
	id_group,
	limit,
	prefixUrl,
	setPage,
	inputValue,
	setInputValue,
}) => {
	const navigate = useNavigate();
	const matches = useMediaQuery('(max-width:600px)');

	const handleChangeInput = async (event) => {
		const regex = /^[0-9\b]+$/;
		if (event.target.value === '' || regex.test(event.target.value)) {
			setInputValue(Number(event.target.value));
		}
	};

	const searchPage = () => {
		if (inputValue <= 0) {
			setPage(1);
			navigate(`/${prefixUrl}/1`);
		} else if (inputValue > data) {
			setPage(data);
			navigate(`/${prefixUrl}/${data}`);
			setInputValue(data);
		} else {
			setPage(inputValue);
			navigate(`/${prefixUrl}/${inputValue}`);
		}
	};

	// const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<div className={classes.wrapperItem}>
				<Pagination
					count={data}
					page={parseInt(page)}
					onChange={changePage}
					size={matches ? 'small' : 'large'}
					siblingCount={matches ? 0 : 1}
					showFirstButton
					showLastButton
					renderItem={(item) => (
						<PaginationItem
							sx={{
								'&.Mui-selected': {
									backgroundColor: '#00AEAE',
									color: '#fff',
								},
							}}
							component={Link}
							// to={`${fUrl}/${item.page}/${limit}`}
							to={`/${prefixUrl}/${item.page}`}
							{...item}
						/>
					)}
				/>
			</div>
			<div className={classes.wrapperItem}>
				<TextField
					max={data}
					type="number"
					value={inputValue}
					onChange={handleChangeInput}
					size="small"
					sx={{
						width: '60px',
						'& input:valid:focus + fieldset': {
							border: '1px solid #00aeae', // override inline-style
						},
					}}
				/>
				<Button
					onClick={searchPage}
					sx={{
						backgroundColor: '#00AEAE',
						color: '#fff',

						'&.MuiButton-root:hover': {
							backgroundColor: '#069393',
						},
					}}
				>
					<SearchIcon />
				</Button>
			</div>
		</div>
	);
};

export default PaginationPortal;
