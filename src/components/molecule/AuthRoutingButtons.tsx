import {NavLink} from "react-router-dom";
import {ButtonJoin} from "@atom/buttons/ButtonJoin.tsx";
import {ButtonJoinItem} from "@atom/buttons/ButtonJoinItem.tsx";

export function AuthRoutingButtons() {
    return (
        <>
            <ButtonJoin>
                <NavLink to="/register">
                    <ButtonJoinItem label="Inscription" />
                </NavLink>
                <NavLink to="/login">
                    <ButtonJoinItem label="Connexion" />
                </NavLink>
            </ButtonJoin>
        </>
    );
}