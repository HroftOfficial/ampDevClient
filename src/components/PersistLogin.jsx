import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hoc/useAuth';
import { AuthContext } from "../hoc/AuthProvider";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    // const { auth, persist } = useAuth();
    const { auth, persist } = useContext(AuthContext);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.log(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
        return () => isMounted = false;
    }, [])
    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin