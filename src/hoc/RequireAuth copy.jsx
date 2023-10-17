import React,{useEffect, useContext} from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from './useAuth';
import { AuthContext } from './AuthProvider';


const RequireAuth = ({children}) => {
  const store = useContext(AuthContext)
  const location = useLocation();
  // const {user} = useAuth();
  const {isAuth} = useAuth();

// console.log(store.store.isAuth)
  useEffect(() => {
    if (localStorage.getItem('token')) {
        store?.store?.checkAuth()
    }
}, [])

// isAuth =true
  // if(!user) {
    // if(!store.store.isAuth) {
    return (store.store.isAuth
      ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
    // <Navigate to="/login" state={{from: location}} />
  // }
  // return children
}

export default RequireAuth