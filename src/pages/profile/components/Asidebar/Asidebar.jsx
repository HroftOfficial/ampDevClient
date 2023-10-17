import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../hoc/AuthProvider';
import User from '../../../../services/User';
import config from '../../../../settings/settings';
import rob from '../../../../img/profile-ico-big.svg';
import { SkeletonProfileLogo } from '../../../../components/Skeletons/SkeletonProfileLogo/SkeletonProfileLogo';
import { NavMenuProfile } from '../NavMenuProfile/NavMenuProfile';

import classes from './Asidebar.module.css';

const { baseUrlUpload } = config;

const Asidebar = () => {
	let navigate = useNavigate();
	const { store } = useContext(AuthContext);
	const [user, setUser] = useState([
		{
			logo__img: [],
			name: '',
			org: '',
			cities: '',
		},
	]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getUser = async () => {
			try {
				setIsLoading(true);
				const user = await User.getUser();
				setIsLoading(false);
				setUser(user?.data);
			} catch (e) {
				console.error('Error >>> ', e);
			}
		};
		getUser();
	}, []);

	return (
		<div className={classes.wrapper}>
			<div className={classes.infoWrapper}>
				{isLoading ? (
					<SkeletonProfileLogo />
				) : (
					<>
						<div className={classes.imgWrapper}>
							<img
								src={
									!user?.logo__img?.length
										? rob
										: `${baseUrlUpload}/uploads/logo/${user?.logo__img[0]?.filename}`
								}
								alt="logo"
							/>
						</div>
						<div className={classes.fio}>{user?.name}</div>
						<div className={classes.company}>{user?.org}</div>
						<div className={classes.city}>г. {user?.cities}</div>
					</>
				)}

				<NavMenuProfile />

				<div className={classes.action}>
					<button onClick={() => store.logout(navigate)}>Выход</button>
				</div>
			</div>
		</div>
	);
};

export default Asidebar;
