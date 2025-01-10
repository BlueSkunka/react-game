import {Button} from "@atom/buttons/Button.tsx";
import {useContext} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

export function Logout() {
    const {saveCredentials} = useContext(AuthContext)
    const navigate = useNavigate()
    function logoutUserHandler() {
        saveCredentials(null, null, null)
        navigate("/");
    }
    return (
        <div onClick={logoutUserHandler}>
            <Button level={"danger"} label="Logout" btnWidth="w-16" />
        </div>
    );
}