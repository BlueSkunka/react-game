import {useContext, useEffect, useState} from "react";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {Error404} from "@errors/Error404.tsx";
import {Dashboard} from "@organism/game/Dashboard.tsx";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {Lobby} from "@organism/game/Lobby.tsx";
import {GameInterface} from "@interfaces/GameInterface.ts";

export function PokeBattle() {
    const {isAuthenticated} = useContext(AuthContext)
    const {socket} = useContext(SocketContext)
    const [game, setGame] = useState<GameInterface | null>(null)
    const navigate = useNavigate()

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

    if (game && game.state == "pending") {
        console.log("PokeBattle.tsx", game)
        return (
            <>
                <Lobby game={game} setGame={setGame}/>
            </>
        )
    }

    return (
        <>
            <Error404 />
        </>
    )
}