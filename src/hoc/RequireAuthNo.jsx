import React, { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
// import useAuth from './useAuth';
import { AuthContext } from './AuthProvider';

const RequireAuthNo = () => {
	const { store } = useContext(AuthContext);
	// const token = localStorage.getItem('token')
	// const location = useLocation()
	useEffect(() => {
		const checkToken = () => {
			try {
				if (localStorage.getItem('token')) {
					store?.checkAuth();
				}
			} catch (error) {
				console.log(error);
			}
		};

		checkToken();
	}, []);
	return (
		<Outlet />
		// token
		//     ? <Outlet />
		//     : <Navigate to="/login" state={{ from: location }} replace />
	);
};
export default RequireAuthNo;
