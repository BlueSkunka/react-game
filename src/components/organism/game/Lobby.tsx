import {useContext, useEffect, useState} from "react";
import {GameInterface} from "@interfaces/GameInterface.ts";
import {LobbyPlayerInfo} from "@molecule/game/LobbyPlayerInfo.tsx";
import {BattleStartButton} from "@organism/game/BattleStartButton.tsx";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {Button} from "@atom/buttons/Button.tsx";
import {Error500} from "@errors/Error500.tsx";
import {PokeBattleGameState} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleGameState";
import {MessageLevelEnum} from "../../../enums/MessageLevelEnum.ts";

export function Lobby(
    {game, setGame} :
    {
        game: GameInterface | null,
        setGame:  React.Dispatch<React.SetStateAction<GameInterface | null>>
    }
) {
    const {emitEvent, muteEvent, listenEvent, bulkMuteEvents, sendToast} = useContext(SocketContext);
    const {userId} = useContext(AuthContext)

    // Mute available on destroy
    useEffect(() => {
        // console.info(ComponentLogEnums.MOUNTING)
        // console.info(ComponentLogEnums.MOUNTED)
        return () => {
            // console.info(ComponentLogEnums.DESTROYING)
            bulkMuteEvents(new Map<string, (data: object) => void>([
                [PokeBattleSocketEvents.DISCONNECT, playerDisconnectedHandler],
                [PokeBattleSocketEvents.GAME_START, gameStartHandler]
            ]) )
            // console.info(ComponentLogEnums.DESTROYED)
        }
    }, []);

    // Check if is defined
    if (null == game) {
        sendToast('Unable to process game', MessageLevelEnum.FATAL)
        return (
            <>
                <Error500 />
            </>
        )
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [player2, setPlayer2] = useState<string>(game.player)

    //region Event callback handlers
    function playerDisconnectedHandler(data: object) {
        console.log("player left", data)

        // Si le joueur qui déconnecte est le créateur
        // Sinon le joueur 2 a quitté la partie
        if (game?.creator == data.playerId) {
            sendToast('La partie est annulée', MessageLevelEnum.DANGER)
            setGame(null)
        } else {
            setPlayer2("");
        }
    }


    const gameStartHandler = (data: object) => {
        console.log("Game start", data)
        muteEvent(PokeBattleSocketEvents.GAME_START, gameStartHandler)

        setGame(data.game)
    }
    //endregion

    // Leave game handler
    const leaveGame = () => {
        console.log("Leave game");
        emitEvent(PokeBattleSocketEvents.GAME_PLAYER_DISCONNECT, {
            playerId: userId,
            gameId: game.id
        })
        muteEvent(PokeBattleSocketEvents.GAME_PLAYER_DISCONNECT, playerDisconnectedHandler)
        setGame(null)
    }

    // Player disconnect handler
    listenEvent(PokeBattleSocketEvents.GAME_PLAYER_DISCONNECT, playerDisconnectedHandler)
    listenEvent(PokeBattleSocketEvents.GAME_START, gameStartHandler)

    // Display battle start button or game screen
    let component;
    switch (game.state) {
        case PokeBattleGameState.PLAYING:
            component = "prout"
            break;
        default :
            component = <BattleStartButton creator={game.creator} player={player2} gameId={game.id}/>
            break;
    }

    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="card bg-base-100 w-full shadow-xl">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Partie : {game.id}</h2>
                        <p>Joining code : {game.joiningCode}</p>
                    </div>
                    <div className="absolute top-1 right-1">
                        <Button
                            btnWidth={'btn-lg'}
                            type={'button'}
                            level={'danger'}
                            label={'Leave game'}
                            click={leaveGame}
                            disabled={''}
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <LobbyPlayerInfo player={game.creator} setPlayer2={setPlayer2} game={game} />
                    <LobbyPlayerInfo player={player2} setPlayer2={setPlayer2} game={game} />
                </div>
                {component}
            </div>
        </>
    )
}