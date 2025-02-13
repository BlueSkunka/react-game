import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {Badge} from "@atom/Badge.tsx";
import {Button} from "@atom/buttons/Button.tsx";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {GameInterface} from "@interfaces/GameInterface.ts";
import {MessageLevelEnum} from "../../../enums/MessageLevelEnum.ts";
import Element = React.JSX.Element;

export function LobbyPlayerInfo(
    {player, setPlayer2, game}: {
        player: string,
        setPlayer2:  React.Dispatch<React.SetStateAction<string>>,
        game: GameInterface | null
    }
) {
    const {listenEvent, muteEvent, emitEvent, bulkMuteEvents, sendToast} = useContext(SocketContext)
    const {userId} = useContext(AuthContext)
    const [isReady, setIsReady] = useState<boolean>(false)

    // Mute all available events on destroy
    useEffect(() => {
        // console.log("LobbyPlayerInfo.tsx rendered")
        return () => {
            console.log("Destroying component")
            bulkMuteEvents(new Map<string, (data: object) => void>([
                [PokeBattleSocketEvents.GAME_PLAYER_JOINED, playerJoinedHandler],
                [PokeBattleSocketEvents.GAME_PLAYER_READY, playerReadyHandler],
                [PokeBattleSocketEvents.GAME_PLAYER_UNREADY, playerUnreadyHandler]
            ]))
            console.log("LobbyPlayerInfo is now destroyed")
        }
    }, []);

    console.log("Lobby player is ", player)
    console.log("Lobby creator is ", game?.creator)

    // Si le joueur n'est pas défini correctement
    if ((!player || "" === player ) && userId != game?.creator) {
        setPlayer2(userId)
    }

    //region Définition des handlers d'events
    function playerReadyHandler(data: object) {
        console.log("player is ready", data)
        if (data.playerId == player) {
            setIsReady(true)
        }
    }

    function playerUnreadyHandler(data: object) {
        console.log("player is unready", data)
        if (data.playerId == player) {
            setIsReady(false)
        }
    }

    function playerJoinedHandler(data: object) {
        console.log("player joined", data);
        sendToast(`Player ${data.player} joined your lobby`, MessageLevelEnum.SUCCESS)
        muteEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINED, playerJoinedHandler)
        setPlayer2(data.player)
    }
    //endregion

    // Si le joueur n'est pas connecté
    if (!player || "" === player) {
        listenEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINED, playerJoinedHandler)
    } else if (player != userId) {
        console.log("player is not user", player, userId)
        // Le joueur est connecté et n'est pas l'utilisateur actuel
        listenEvent(PokeBattleSocketEvents.GAME_PLAYER_READY, playerReadyHandler)
        listenEvent(PokeBattleSocketEvents.GAME_PLAYER_UNREADY, playerUnreadyHandler)
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
        badge = <Badge level={'error'} content={'Player is not ready'} />
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
                        <h2 className="card-title flex flex-col md:lg:flex-row">
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
                        <h2 className="card-title  flex flex-col md:lg:flex-row">
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