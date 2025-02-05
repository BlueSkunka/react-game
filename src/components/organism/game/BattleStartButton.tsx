import {Button} from "@atom/buttons/Button.tsx";
import {useContext, useEffect, useState} from "react";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";
import {ComponentLogEnums} from "../../../enums/ComponentLogEnums.ts";

export function BattleStartButton(
    {creator, player, gameId}:
    {
        creator: string,
        player: string | null,
        gameId: string
    }
) {
    const {listenEvent, bulkMuteEvents, emitEvent} = useContext(SocketContext)
    const [isCreatorReady, setIsCreatorReady] = useState<boolean>(false)
    const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false)

    // Mute all available listener on component destroy
    useEffect(() => {
        console.info(ComponentLogEnums.MOUNTING)
        console.info(ComponentLogEnums.MOUNTED)
        return () => {
            console.info(ComponentLogEnums.DESTROYING)
            bulkMuteEvents(new Map<string, (data: object) => void>([
                [PokeBattleSocketEvents.GAME_PLAYER_READY, playerReadyHandler],
                [PokeBattleSocketEvents.GAME_PLAYER_UNREADY, playerUnreadyHandler],
                [PokeBattleSocketEvents.GAME_PLAYER_DISCONNECT, playerDisconnectHandler],
            ]))
            console.info(ComponentLogEnums.DESTROYED)
        }
    }, []);

    //#region Socket event callback handlers
    function playerReadyHandler(data: object) {
        console.log("Player is ready", data.playerId)
        if (data.playerId === creator) setIsCreatorReady(true)
        if (data.playerId === player) setIsPlayerReady(true)
    }

    function playerUnreadyHandler(data: object) {
        console.log("Player is NOT ready", data.playerId)
        if (data.playerId === creator) setIsCreatorReady(false)
        if (data.playerId === player) setIsPlayerReady(false)
    }

    function playerDisconnectHandler(data: object) {
        console.log("Player disconnected", data.playerId)
        setIsPlayerReady(false)
    }
    //#endregion

    //region Listeners
    // Ecoute du status des joueurs
    listenEvent(PokeBattleSocketEvents.GAME_PLAYER_READY, playerReadyHandler)
    listenEvent(PokeBattleSocketEvents.GAME_PLAYER_UNREADY, playerUnreadyHandler)

    // Déconnexion du joueur 2
    listenEvent(PokeBattleSocketEvents.GAME_PLAYER_DISCONNECT, playerDisconnectHandler)
    //endregion

    // Partie prête à être démarrer
    console.error(isCreatorReady, isPlayerReady)
    const isReadyToStart = isCreatorReady && isPlayerReady
    console.error(isReadyToStart)

    // Définition du bouton de lancement de combat
    const startBattleHandler = () => {
        console.log("Battle start !")
        emitEvent(PokeBattleSocketEvents.GAME_START, {
            gameId: gameId
        })
    }
    // const isStartBattleButtonDisabled = isReadyToStart ? '' : 'btn-disabled';
    const isStartBattleButtonDisabled = '';
    return (
        <>
            <div className="card bg-base-100 w-full shadow-xl flex items-center">
                <Button btnWidth={'btn-wide'}
                        type={'button'}
                        level={'primary'}
                        label={'Start battle !'}
                        click={startBattleHandler}
                        disabled={isStartBattleButtonDisabled}
                />
            </div>
        </>
    );
}