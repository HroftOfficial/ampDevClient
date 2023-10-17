import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, useMatch } from 'react-router-dom';
import './layout.css';
import CustomLink from '../CustomLink/CustomLink';
import useAuth from '../../hoc/useAuth';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Mheader from '../Mheader/Mheader';
import DefHeader from '../DefHeader/DefHeader';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../../hoc/AuthProvider';

const Layout = () => {
	const store = useContext(AuthContext);

	useEffect(() => {
		const checkedAuth = () => {
			try {
				if (localStorage.getItem('token')) {
					store?.store?.checkAuth();
				}
			} catch (error) {
				console.log(error);
			}
		};
		checkedAuth();
	}, []);

	const navigate = useNavigate();
	const location = useLocation();
	const { signout } = useAuth();

	// const match = useMatch('/');
	// const engin = useMatch('/engineering');
	const pname = location?.pathname;
	// console.log(location);
	let Header = '';

	switch (pname) {
		case '/':
			Header = <Mheader />;
			break;

		case '/engineering':
			Header = '';
			break;

		default:
			Header = <DefHeader />;
			break;
	}
	return (
		<div className="wrapper">
			{Header}

			{/* {match ? <Mheader /> :(      
            <header>
                <nav className="z-30 top-0 py-8 w-full bg-gray-450">
                    <Navbar />
                </nav>                
        </header>
        )} */}
			<main className="main text-white">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
