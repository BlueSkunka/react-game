import {useContext, useEffect} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {Navbar} from "@organism/Navbar.tsx";
import {SocketProvider} from "@contexts/SocketContext.tsx";
import "./../../style.css"

export function Layout() {
    const {token, isAuthenticated} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        console.info("isAuthenticated ? ", isAuthenticated())
        if (!isAuthenticated()) {
            navigate("/login")
        }
    }, [isAuthenticated, navigate])

    return (
        <>
            <Navbar/>
            <div className="container px-3 py-3.5 bg-base-200 mx-auto h-full bg-opacity-100">
                <SocketProvider>

                </SocketProvider>
            </div>
        </>
    );
}