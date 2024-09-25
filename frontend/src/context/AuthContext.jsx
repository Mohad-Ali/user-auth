import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext =()=> useContext(AuthContext);


export const AuthContextProvider = ({children})=>{
    const [authUser, setauthUser] = useState(JSON.parse(localStorage.getItem("user-system")) || null)
    
    return (
    <AuthContext.Provider value={{authUser,setauthUser}}>
        {children}
    </AuthContext.Provider>)
}


