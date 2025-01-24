import {createContext, useEffect, useState} from "react";

interface AuthContextInterface {
    token: string,
    saveCredentials: (newToken: string, newUserId: string, newUsername: string) => void,
    isAuthenticated: () => boolean,
    username: string,
    userId: string
}

export const AuthContext = createContext<AuthContextInterface>({
    token: "",
    saveCredentials: (newToken: string, newUserId: string, newUsername: string) => {},
    isAuthenticated: () => {return false},
    username: "",
    userId: ""
});

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(() => sessionStorage.getItem("token") || "");
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('')

    // Save the user credentials in local storage
    useEffect(() => {
        if ("" != token && "" != username && "" != userId) {
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
    const saveCredentials = (newToken: string, newUserId: string, newUsername: string) => {
        setToken(newToken);
        setUsername(newUsername);
        setUserId(newUserId);
    }

    // Check if user is authenticated
    const isAuthenticated: () => boolean = (): boolean => {
        return token != "";
    }

    return (
        <AuthContext.Provider value={{token, saveCredentials, isAuthenticated, username, userId}}>
            {children}
        </AuthContext.Provider>
    )
}