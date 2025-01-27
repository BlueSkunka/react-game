import {useContext, useState} from "react";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {GameInterface} from "@interfaces/GameInterface.ts";
import {Error404} from "@errors/Error404.tsx";
import {Dashboard} from "@organism/game/Dashboard.tsx";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {Lobby} from "@organism/game/Lobby.tsx";

export function PokeBattle() {
    const {isAuthenticated} = useContext(AuthContext)
    const {socket} = useContext(SocketContext)
    const navigate = useNavigate()
    const [game, setGame] = useState<GameInterface | null>(null)

    // Controle de connexion
    if (!isAuthenticated() || null === socket) {
        console.error("Not authenticated or socket not initialized")
        navigate('/login')
    }

    // Si pas de partie en cours
    if (game === null) {
        return (
            <>
                <Dashboard setGame={setGame} />
            </>
        );
    }

    if (game) {
        console.log("PokeBattle.tsx", game)
        return (
            <>
                <Lobby game={game} />
            </>
        )
    }

    return (
        <>
            <Error404 />
        </>
    )
}