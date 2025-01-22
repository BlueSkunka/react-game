import {Outlet, useNavigate} from "react-router-dom";
import {IconLogo} from "@atom/icons/IconLogo.tsx";
import {TitleMain} from "@atom/titles/TitleMain.tsx";
import {AuthRoutingButtons} from "@molecule/AuthRoutingButtons.tsx";
import {ThemeToggler} from "@molecule/ThemeToggler.tsx";
import {useContext} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";

export function AuthLayout() {
    const {isAuthenticated} = useContext(AuthContext)
    const navigate = useNavigate();

    if (isAuthenticated()) {
        navigate('/game/dashboard')
    }

    return (
        <div className="container px-2 py-2.5 bg-base-200 mx-auto flex flex-col justify-center">
            <ThemeToggler />
            <TitleMain title="Poke Battle" />
            <IconLogo />
            <AuthRoutingButtons/>
            <Outlet />
        </div>
    );
}