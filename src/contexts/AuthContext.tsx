import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(() => sessionStorage.getItem("token") || null);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('')

    // Save the user credentials in local storage
    useEffect(() => {
        if (token && username && userId) {
            sessionStorage.setItem("token", token)
            sessionStorage.setItem("username", username)
            sessionStorage.setItem("userId", userId)
        } else {
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("username")
            sessionStorage.removeItem("userId")
        }
    }, [token, username, userId])

    // Save the new token
    const saveCredentials = (newToken, newUserId, newUsername) => {
        setToken(newToken);
        setUsername(newUsername);
        setUserId(newUserId);
    }

    // Check if user is authenticated
    const isAuthenticated = () => {
        return token != null;
    }

    return (
        <AuthContext.Provider value={{token, saveCredentials, isAuthenticated, username, userId}}>
            {children}
        </AuthContext.Provider>
    )
}