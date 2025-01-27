import * as React from "react";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";
import {useContext} from "react";
import {SocketContext} from "@contexts/SocketContext.tsx";

export function LobbyPlayerInfo(
    {player, setPlayer2}: {
        player: string,
        setPlayer2:  React.Dispatch<React.SetStateAction<string>>
    }
) {
    const {listenEvent, muteEvent} = useContext(SocketContext)

    console.log("Lobby player is ", player)

    if (!player) {
        listenEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINED, (data: object) => {
            console.log("player joined", data);
            toast.custom((t) => <Toast t={t} msg={`Player ${data.player} joined your lobby !`} />)
            muteEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINED)
            setPlayer2(data.player)

            muteEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINED)
        })
    }

    if (player) {
        return (
            <>
                <div className="card bg-base-100 w-1/2 shadow-xl">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Player : {player}</h2>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="card bg-base-100 w-1/2 shadow-xl">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">
                            Waiting for player to join
                            <span className="loading loading-dots loading-sm"></span>
                        </h2>
                    </div>
                </div>
            </>
        );
    }
}