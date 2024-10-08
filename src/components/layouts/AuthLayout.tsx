import {Outlet} from "react-router-dom";
import {IconLogo} from "@icons/IconLogo.tsx";
import {TitleMain} from "@atom/titles/TitleMain.tsx";
import {AuthRoutingButtons} from "@molecule/AuthRoutingButtons.tsx";

export function AuthLayout() {
    return (
        <div className="container mx-auto flex flex-col justify-center">
            <TitleMain title="Poke Battle" />
            <IconLogo />
            <AuthRoutingButtons/>
            <Outlet />
        </div>
    );
}