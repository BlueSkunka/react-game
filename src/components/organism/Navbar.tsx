import {ThemeToggler} from "@molecule/ThemeToggler.tsx";
import {NavLink} from "react-router-dom";
import {Logout} from "@organism/authent/Logout.tsx";
import {ImageLogo} from "@atom/images/ImageLogo.tsx";
import {IconUser} from "@atom/icons/IconUser.tsx";
import {useContext} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";

export function Navbar() {
    const {username} = useContext(AuthContext)

    return (
        <>
            <div className="navbar bg-neutral">
                <div className="navbar-start">
                    <NavLink to={"/game/dashboard"}>
                        <ImageLogo />
                    </NavLink>
                </div>
                <div className="navbar-center">
                    <ThemeToggler />
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role={'button'} className="btn btn-ghost btn-circle">
                            <IconUser />
                            {username}
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-neutral z-[1] mt-3 w-52 p-2 shadow">
                            <li>Combat</li>
                            <li>Équipes</li>
                            <li>Historique</li>
                            <div className="divider"/>
                            <li><Logout/></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}