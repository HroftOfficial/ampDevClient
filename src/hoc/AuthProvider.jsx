import React, {createContext, useState} from 'react'
import Store from "../store/store";

export const store = new Store();

// export const AuthContext = createContext(store,);
export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const persist = true;
    // const [user, setUser] = useState(null);

    // const signin = (newUser, cb) =>{
    //     setUser(newUser);
    //     cb();
    // }
    // const signout = (cb) =>{
    //     setUser(null);
    //     cb();
    // }

    // const value = {user, signin, signout}
    // console.log("auth store", auth)
    return <AuthContext.Provider value={{auth, setAuth, persist, store}}>
        {children}
    </AuthContext.Provider>
}