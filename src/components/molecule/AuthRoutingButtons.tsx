import {NavLink} from "react-router-dom";
import {ButtonJoin} from "@atom/buttons/ButtonJoin.tsx";
import {ButtonJoinItem} from "@atom/buttons/ButtonJoinItem.tsx";
import {ThemeToggler} from "@molecule/ThemeToggler.tsx";

export function AuthRoutingButtons() {
    return (
        <>
            <div className="flex space-x-6 justify-center items-center">
                <ButtonJoin>
                    <NavLink to="/register">
                        <ButtonJoinItem level="primary" label="Inscription" />
                    </NavLink>
                    <NavLink to="/login">
                        <ButtonJoinItem level={"secondary"} label="Connexion" />
                    </NavLink>
                </ButtonJoin>
                <ThemeToggler />
            </div>
        </>
    );
}