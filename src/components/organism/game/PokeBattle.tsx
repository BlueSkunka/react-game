import {useContext, useState} from "react";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";
import {GameInterface} from "@interfaces/GameInterface.ts";
import {Button} from "@atom/buttons/Button.tsx";
import {Error404} from "@errors/Error404.tsx";
import {Dashboard} from "@organism/game/Dashboard.tsx";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "@contexts/AuthContext.tsx";

export function PokeBattle() {
    const {isAuthenticated, userId, token} = useContext(AuthContext)
    const {socket, emitEvent, listenEvent, muteEvent} = useContext(SocketContext)
    const navigate = useNavigate()
    const [game, setGame] = useState<GameInterface | null>(null)

    // Controle de connexion
    if (!isAuthenticated() || null === socket) {
        console.error("Not authenticated or socket not initialized")
        navigate('/login')
    }

    const emitEventHandler = async () => {
        console.log("emitting", socket.id)
        emitEvent(PokeBattleSocketEvents.TEST_EVENT, {socketId: socket.id})
    }

    const joinRoom = async () => {
        console.log("joinin", socket.id)
        emitEvent(PokeBattleSocketEvents.GAME_CREATE_ROOM, {from: socket.id})
    }

    const listenEventHandler = async () => {
        console.log("listen event", socket.id)
        listenEvent(PokeBattleSocketEvents.TEST_EVENT, (data: object) => {
            console.log("listened", socket.id, data)
        })
    }

    const muteHandler = async () => {
        console.log("mute event", socket.id)
        muteEvent(PokeBattleSocketEvents.TEST_EVENT)
    }

    // Si pas de partie en cours
    if (game === null) {
        return (
            <>
                <Button label={"Emit"} click={emitEventHandler} />
                <Button label={"Join"} click={joinRoom} />
                <Button label={"Listen"} click={listenEventHandler} />
                <Button label={"Mute"} click={muteHandler} />
                <Dashboard />
            </>
        );
    }

    return (
        <>
            <Error404 />
        </>
    )
}