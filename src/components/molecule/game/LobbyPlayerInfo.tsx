import * as React from "react";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";
import {useContext, useState} from "react";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {Badge} from "@atom/Badge.tsx";
import {Button} from "@atom/buttons/Button.tsx";
import Element = React.JSX.Element;
import {AuthContext} from "@contexts/AuthContext.tsx";
import {GameInterface} from "@interfaces/GameInterface.ts";

export function LobbyPlayerInfo(
    {player, setPlayer2, game}: {
        player: string,
        setPlayer2:  React.Dispatch<React.SetStateAction<string>>,
        game: GameInterface | null
    }
) {
    const {listenEvent, muteEvent, emitEvent} = useContext(SocketContext)
    const {userId} = useContext(AuthContext)
    const [isReady, setIsReady] = useState<boolean>(false)

    console.log("Lobby player is ", player)
    console.log("Lobby creator is ", game?.creator)

    // Si le joueur n'est pas définit correctement
    if ((!player || "" === player ) && userId != game?.creator) {
        setPlayer2(userId)
    }

    // Si le joueur n'est pas connecté
    if (!player || "" === player) {
        listenEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINED, (data: object) => {
            console.log("player joined", data);
            toast.custom((t) => <Toast t={t} msg={`Player ${data.player} joined your lobby !`} />)
            muteEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINED)
            setPlayer2(data.player)

            muteEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINED)
        })
    } else if (player != userId) {
        console.log("player is not user", player, userId)
        // Le joueur est connecté et n'est pas l'utilisateur actuel
        listenEvent(PokeBattleSocketEvents.GAME_PLAYER_READY, (data: object) => {
            console.log("player is ready", data)
            if (data.playerId == player) {
                setIsReady(true)
            }
        })

        listenEvent(PokeBattleSocketEvents.GAME_PLAYER_UNREADY, (data: object) => {
            console.log("player is unready", data)
            if (data.playerId == player) {
                setIsReady(false)
            }
        })

    }

    // Envoie du statut du joueur
    const isReadyButtonHandler = () => {
        const playerReady = !isReady;
        console.log("player ready", playerReady)
        emitEvent(
            playerReady ? PokeBattleSocketEvents.GAME_PLAYER_READY : PokeBattleSocketEvents.GAME_PLAYER_UNREADY, {
                gameId: game.id,
                playerId: userId
            }
        )
        setIsReady(playerReady)
    }

    // Définition du badge du joueur (prêt ou non)
    let badge: Element;
    let readyButton: Element;
    if (!isReady) {
        badge = <Badge level={'danger'} content={'Player is not ready'} />
        readyButton = <Button btnWidth={'btn-sm'}
                              type={'button'}
                              level={'primary'}
                              label={'Ready'}
                              click={isReadyButtonHandler}
                              disabled={''} />
    } else {
        badge = <Badge level={'success'} content={'Player is ready'} />
        readyButton = <Button btnWidth={'btn-sm'}
                              type={'button'}
                              level={'secondary'}
                              label={'Not ready'}
                              click={isReadyButtonHandler}
                              disabled={''} />
    }

    // Si le joueur est l'utilisateur
    if (player && player === userId) {
        return (
            <>
                <div className="card bg-base-100 w-1/2 shadow-xl">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">
                            Player : {player}
                            {badge}
                        </h2>
                        <div className="card-actions">
                            {readyButton}
                        </div>
                    </div>
                </div>
            </>
        );
    } else if (player) {
        // Sinon si le joueur est connecté (second joueur)
        return (
            <>
                <div className="card bg-base-100 w-1/2 shadow-xl">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">
                            Player : {player}
                            {badge}
                        </h2>
                    </div>
                </div>
            </>
        );
    } else {
        // Sinon il n'y a pas de second joueur
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