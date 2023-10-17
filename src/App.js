import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import './app.css';
import { AuthProvider } from './hoc/AuthProvider';
import { AuthContext } from './hoc/AuthProvider';
import RequireAuth from './hoc/RequireAuth';

import Home from './pages/home/Main';
import About from './pages/about/About';
import NotFound from './pages/notFound/NotFound';
import Layout from './components/Layout/Layout';
import Login from './pages/login/Login';
import Registration from './components/RegistrationForm/RegistrationForm';
import { ConfirmChangePassword } from './pages/ChangePassword/ConfirmChangePassword/ConfirmChangePassword';

import News from './pages/NewsPage/news';
import NewsDetails from './pages/NewsPage/news__details';

import Engineering from './pages/Enginer/Engineering';
import Partners from './pages/Partners/Partners';
import PartnersDetails from './pages/Partners/PartnerDetails';
import PartnersDetailsNew from './pages/Partners/PartnersDetailsNew';

import Plant from './pages/Plant/Plant';
import PlantDetails1 from './pages/Plant/Components/PlantDetails/PlantDetails';

import Draft from './pages/Draft/Draft';
import DraftDetails from './pages/Draft/DraftDetails';

// import AvitoDraft from './pages/Avito/AvitoDraft';

import { ProfileLayout } from './pages/profile/ProfileLayout';
import Profile from './pages/profile/Profile';
import MyOrders from './pages/profile/orders/AllOrders';
import Waiting from './pages/profile/orders/Waiting';
import Active from './pages/profile/orders/Active';
import Deleted from './pages/profile/orders/Deleted';
import MyPlants from './pages/profile/plants/MyPlants';
import AddPlant from './pages/profile/plants/AddPlant/AddPlant';
import EditPlant from './pages/profile/plants/EditPlant/EditPlant';

import AddOrder from './pages/profile/orders/AddOrder/AddOrder';
import EditOrder from './pages/profile/orders/EditOrder/EditOrder';

import Favorite from './pages/profile/Favorite';
import FavoritePlants from './pages/profile/FavoritePlants/FavoritePlants';
import Messages from './pages/profile/Messages';
import EditProfile from './pages/profile/EditProfile';

import Advertising from './pages/reklama/Advertising';
import AdvertisingDetails from './pages/reklama/AdvertisingDetails';

import ScrollToTop from './utils/ScrollToTop';

import { ChatContextProvider } from './context/ChatContext';
import PersistLogin from './components/PersistLogin';
import Chat from './pages/Chat/Chat';
import RequireAuthNo from './hoc/RequireAuthNo';

function App() {
	// const { auth } = useContext(AuthContext);
	// const user = { _id: auth.userId, name: auth.fio };
	const { store } = useContext(AuthContext);
	const user = { _id: store?.user?._id, name: store?.user?.name };
	return (
		<ChatContextProvider user={user}>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route element={<RequireAuthNo />}>
						<Route element={<PersistLogin />}>
							<Route index element={<Home />} />
							<Route path="*" element={<NotFound />} />
							<Route path="login" element={<Login />} />
							<Route path="registration" element={<Registration />} />
							{/* <Route
								path="change_password"
								element={<ConfirmChangePassword />}
							/> */}
							<Route
								path="change_password/:id"
								element={<ConfirmChangePassword />}
							/>
							<Route path="about" element={<About />} />
							<Route
								path="about-us"
								element={<Navigate to="/about" replace />}
							/>
							<Route path="news/:page" element={<News />} />
							<Route path="news/:page/:id" element={<NewsDetails />} />
							<Route path="news" element={<Navigate to="/news/1" replace />} />
							<Route path="engineering" element={<Engineering />} />
							<Route
								path="partners"
								element={<Navigate to="/partners/1" replace />}
							/>
							<Route path="partners/:page" element={<Partners />} />
							<Route
								path="partners/details/:id"
								element={<PartnersDetails />}
							/>
							<Route
								path="partners/detailsnew/:id"
								element={<PartnersDetailsNew />}
							/>{' '}
							{/*<<<<< раздел в разработке*/}
							{/* <Route path='plantandservice/plant' element={<Plant />} /> */}
							{/* <Route path='plantandservice/plant/:idGroup' element={<PlantGroup />} /> */}
							{/* <Route path='plantandservice/plant/details/:id' element={<PlantDetails />} /> */}
							{/* <Route path="plantandservice" element={<PlantAndService />} />{' '} */}
							{/*<<<<< раздел в разработке*/}
							{/* <Route
								path="plantandservice/cuttingplant"
								element={<CuttingPlant />}
							/>
							<Route
								path="plantandservice/lubricatingcoolants"
								element={<LubricatingCoolants />}
							/>
							<Route path="plantandservice/repairs" element={<Repairs />} />
							<Route path="plantandservice/materials" element={<Materials />} />
							<Route path="plantandservice/metal" element={<Metal />} /> */}
							{/* <Route path='opendraft' element={<Navigate to="/opendraft/1" replace />} />         <<<<< раздел в разработке */}
							{/* <Route path='opendraft/:page' element={<OpenDraft />} /> */}
							{/* <Route path='opendraft/:page/details/:id' element={<OpenDraftDetails />} /> */}
							{/* <Route path="poligon" element={<AvitoDraft />} /> */}
							{/* <Route path='telegram/:id' element={<DraftDetailsTelegram />} /> */}
							{/* <Route path="plant" element={<Plant />} /> */}
							{/* <Route path="plant/" element={<Plant />} />
          <Route path="plant/:idGroup" element={<PlantGroup />} />
          <Route path="plant/details/:id" element={<PlantDetails />} /> */}
							{/* <Route element={<RequireAuthNo />}>
            <Route element={<PersistLogin />}> */}
							<Route
								path="plant"
								element={<Navigate to="/plant/1" replace />}
							/>
							<Route path="plant/:page" element={<Plant />} />
							<Route path="plant/details/:id" element={<PlantDetails1 />} />
						</Route>
					</Route>
					<Route element={<RequireAuth />}>
						<Route element={<PersistLogin />}>
							<Route
								path="draft"
								element={<Navigate to="/draft/1" replace />}
							/>
							<Route path="draft/:page" element={<Draft />} />
							<Route path="draft/details/:id" element={<DraftDetails />} />

							<Route path="profile" element={<ProfileLayout />}>
								<Route index element={<Profile />} />
								<Route path="addorder" element={<AddOrder />} />
								<Route path="favorite" element={<Favorite />} />

								<Route path="messages" element={<Messages />} />
								<Route path="edit" element={<EditProfile />} />
								<Route path="orders" element={<MyOrders />} />
								<Route path="orders/:id" element={<EditOrder />} />
								{/* <Route path="orders/active" element={<Active />} /> */}
								{/* <Route path="orders/waiting" element={<Waiting />} /> */}
								{/* <Route path="orders/deleted" element={<Deleted />} /> */}

								<Route path="plants" element={<MyPlants />} />
								<Route path="addplant" element={<AddPlant />} />
								<Route path="plants/:id" element={<EditPlant />} />
								<Route path="favoritePlants" element={<FavoritePlants />} />

								<Route path="chat" element={<Chat />} />
							</Route>
						</Route>
						<Route path="advertising" element={<Advertising />} />
						<Route path="advertising/:id" element={<AdvertisingDetails />} />
					</Route>
				</Route>
			</Routes>
		</ChatContextProvider>
	);
}

// export default observer(App);
export default App;
