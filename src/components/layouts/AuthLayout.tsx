import {Outlet, useNavigate} from "react-router-dom";
import {AuthRoutingButtons} from "@molecule/AuthRoutingButtons.tsx";
import {useContext} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import pokebattle from "@asset/pokebattle.png";
import {PokemonRandom} from "@atom/PokemonRandom.tsx";

export function AuthLayout() {
    const {isAuthenticated} = useContext(AuthContext)
    const navigate = useNavigate();

    if (isAuthenticated()) {
        navigate('/game')
    }

    return (
        <div className="container px-2 py-2.5 bg-base-200 mx-auto flex flex-col justify-center items-center">
            <img className="w-2/3" src={pokebattle} alt="PokeBattle"/>
            <div className="flex">
                <PokemonRandom />
                <section className={'basis-1/2'}>
                    <AuthRoutingButtons/>
                    <Outlet />
                </section>
            </div>
        </div>
    );
}