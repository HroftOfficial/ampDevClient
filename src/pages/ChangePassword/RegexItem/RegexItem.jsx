import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import classes from './RegexItem.module.css';

export const RegexItem = ({
	capsLetterCheck,
	numberCheck,
	pwdLengthCheck,
	// specialCharCheck,
}) => {
	return (
		<Box sx={{ margin: 2, width: '100%' }}>
			<Paper sx={{ padding: 2 }}>
				<h5 className={classes.title}>Пароль должен содержать:</h5>
				<ul className={classes.regexList}>
					<li
						className={
							pwdLengthCheck ? classes.regexCheckItem : classes.regexItem
						}
					>
						минимум 8 символов <strong>(a-z)</strong>
					</li>
					<li
						className={
							capsLetterCheck ? classes.regexCheckItem : classes.regexItem
						}
					>
						минимум 1 заглавную букву <strong>(A-Z)</strong>
					</li>
					<li
						className={numberCheck ? classes.regexCheckItem : classes.regexItem}
					>
						минимум 1 цифру <strong>(1-9)</strong>
					</li>
					{/* <li
						className={
							specialCharCheck ? classes.regexCheckItem : classes.regexItem
						}
					>
						минимум 1 специальный символ
					</li> */}
				</ul>
			</Paper>
		</Box>
	);
};
