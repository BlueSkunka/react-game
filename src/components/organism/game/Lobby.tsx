import {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {GameInterface} from "@interfaces/GameInterface.ts";

export function Lobby(
    {game}: {
        game: GameInterface
    }
) {
    const {listenEvent, muteEvent} = useContext(SocketContext)
    const [player2, setPlayer2] = useState("")

    useEffect(() => {
        return () => {
            muteEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINED)
        }
    }, []);

    // Ecoute de la connexion à la partie
    listenEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINED, (data: object) => {
        console.log("player joined", data);
        toast.custom((t) => <Toast t={t} msg={`Player ${data.player} joined your lobby !`} />)
        muteEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINED)
        setPlayer2(data.player)
    })


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