import {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {GameInterface} from "@interfaces/GameInterface.ts";
import {AuthContext} from "@contexts/AuthContext.tsx";

export function Lobby(
    {game}: {
        game: GameInterface
    }
) {
    const {listenEvent, muteEvent} = useContext(SocketContext)
    const {userId} = useContext(AuthContext)
    const [player2, setPlayer2] = useState(game.player)

    // Ecoute de la connexion à la partie si l'utilisateur est le créateur de la partie
    if (userId === game.creator) {
        listenEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINED, (data: object) => {
            console.log("player joined", data);
            toast.custom((t) => <Toast t={t} msg={`Player ${data.player} joined your lobby !`} />)
            muteEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINED)
            setPlayer2(data.player)

            muteEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINED)
        })
    }

    return (
        <>
            LOBBY <br/>
            ID Partie : {game.id} <br/>
            Créateur : {game.creator} <br/>
            Code partie: {game.joiningCode} <br/>
            Joueur 2 : {player2} <br/>
        </>
    )
}