import {useContext, useEffect} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

export function Dashboard() {
    const {token} = useContext(AuthContext)

    return (
        <>DASHBOARD: {token} </>
    );
}