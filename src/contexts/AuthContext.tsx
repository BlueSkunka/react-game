import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(() => sessionStorage.getItem("token") || null);

    // Save the user token in local storage
    useEffect(() => {
        if (token) {
            sessionStorage.setItem("token", token)
        } else {
            sessionStorage.removeItem("token")
        }
    }, [token])

    // Save the new token
    const saveToken = (newToken) => {
        setToken(newToken);
    }

    // Check if user is authenticated
    const isAuthenticated = () => {
        return token != null;
    }

    return (
        <AuthContext.Provider value={{token, saveToken, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}