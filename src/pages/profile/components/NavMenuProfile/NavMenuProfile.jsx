import { menuProfile } from '../../../../utils/menuProfile';
import { NavLink } from 'react-router-dom';
import classes from './NavMenuProfile.module.css';

// className={({ isActive }) => {
// 	const linkClasses = [classes.infoButton];
// 	if (isActive) {
// 		linkClasses.push(classes.active);
// 		return linkClasses.join(' ');
// 	} else {
// 		return linkClasses;
// 	}
// }}

export const NavMenuProfile = ({ handleClose }) => {
	if (handleClose) {
		return (
			<div className={classes.navigation}>
				{menuProfile.map(({ title, to }, index) => {
					return (
						<NavLink
							key={index}
							to={to}
							end={menuProfile[0] ? true : false}
							className={({ isActive }) =>
								isActive
									? `${classes.infoButton} ${classes.active}`
									: `${classes.infoButton} `
							}
							onClick={handleClose}
						>
							{title}
						</NavLink>
					);
				})}
			</div>
		);
	}

	return (
		<div className={classes.navigation}>
			{menuProfile.map(({ title, to }, index) => {
				return (
					<NavLink
						key={index}
						to={to}
						end={menuProfile[0] ? true : false}
						className={({ isActive }) =>
							isActive
								? `${classes.infoButton} ${classes.active}`
								: `${classes.infoButton} `
						}
					>
						{title}
					</NavLink>
				);
			})}
		</div>
	);
};
