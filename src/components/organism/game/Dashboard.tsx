import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {Button} from "@atom/buttons/Button.tsx";
import {gameCreate} from "@repositories/gameRepository.ts";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";

export function Dashboard() {
    const {isAuthenticated, userId, token} = useContext(AuthContext)
    const {socket, emitEvent} = useContext(SocketContext)
    const navigate = useNavigate()

    // Controle de connexion
    if (!isAuthenticated()) {
        navigate('/login')
    }

    const createGame = async () => {
        const response = await gameCreate(userId, token);
        if (response.error) {
            console.error(response.error)
            toast.custom((t) => <Toast t={t} msg={"Erreur lors de la création de la partie"} level={"danger"}/>)
        } else {
            console.log("create game", response)
            emitEvent(PokeBattleSocketEvents.GAME_CREATE_ROOM, response);
        }
    }

    const displayGames = async () => {
    }

    return (
        <>
            <Button  label={'Create game'} click={() => createGame()} />
            <Button label={'Join game'} click={() => displayGames()} />
        </>
    );
}