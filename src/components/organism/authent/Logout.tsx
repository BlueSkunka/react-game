import {useContext} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

export function Logout() {
    const {saveCredentials} = useContext(AuthContext)
    const navigate = useNavigate()
    function logoutUserHandler() {
        saveCredentials("", "", "")
        navigate("/");
    }
    return (
        <div onClick={logoutUserHandler} className={'bg-primary hover:bg-secondary'}>
            Logout
        </div>
    );
}