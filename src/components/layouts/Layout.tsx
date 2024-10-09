import {useContext, useEffect} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {Logout} from "@organism/authent/Logout.tsx";

export function Layout() {
    const {token, isAuthenticated} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login")
        }
    }, [isAuthenticated, navigate])

    return (
        <>LAYOUT <Logout /></>
    );
}