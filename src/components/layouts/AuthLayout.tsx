import {Outlet} from "react-router-dom";
import {IconLogo} from "@atom/icons/IconLogo.tsx";
import {TitleMain} from "@atom/titles/TitleMain.tsx";
import {AuthRoutingButtons} from "@molecule/AuthRoutingButtons.tsx";
import {ThemeToggler} from "@molecule/ThemeToggler.tsx";

export function AuthLayout() {
    return (
        <div className="container mx-auto flex flex-col justify-center">
            <ThemeToggler />
            <TitleMain title="Poke Battle" />
            <IconLogo />
            <AuthRoutingButtons/>
            <Outlet />
        </div>
    );
}