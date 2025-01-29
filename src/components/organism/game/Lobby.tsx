import {useContext, useState} from "react";
import {GameInterface} from "@interfaces/GameInterface.ts";
import {LobbyPlayerInfo} from "@molecule/game/LobbyPlayerInfo.tsx";
import {BattleScreen} from "@organism/game/BattleScreen.tsx";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";
import {AuthContext} from "@contexts/AuthContext.tsx";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";
import {Button} from "@atom/buttons/Button.tsx";
import {Error500} from "@errors/Error500.tsx";

export function Lobby(
    {game, setGame} :
    {
        game: GameInterface | null,
        setGame:  React.Dispatch<React.SetStateAction<GameInterface | null>>
    }
) {
    const {emitEvent, muteEvent, listenEvent} = useContext(SocketContext);
    const {userId} = useContext(AuthContext)

    if (null == game) {
        toast.custom((t) => <Toast t={t} level={'fatal'} msg={'Unable to process game'} /> );
        return (
            <>
                <Error500 />
            </>
        )
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [player2, setPlayer2] = useState<string>(game.player)

    // Leave game handler
    const leaveGame = () => {
        console.log("Leave game");
        emitEvent(PokeBattleSocketEvents.GAME_PLAYER_DISCONNECT, {
            playerId: userId,
            gameId: game.id
        })
        muteEvent(PokeBattleSocketEvents.GAME_PLAYER_DISCONNECT)
        setGame(null)
    }

    // Player disconnect handler
    listenEvent(PokeBattleSocketEvents.GAME_PLAYER_DISCONNECT, (data: object) => {
        console.log("player left", data)

        // Si le joueur qui déconnecte est le créateur
        // Sinon le joueur 2 a quitté la partie
        if (game.creator == data.playerId) {
            toast.custom((t) => <Toast t={t} level={'danger'} msg={'La partie est annulée'}  />)
            setGame(null)
        } else {
            setPlayer2("");
        }
    })

    // Le joueur est connecté
    listenEvent(PokeBattleSocketEvents.GAME_PLAYER_READY, (data: object) => {
        console.log("player is ready", data)
    })

    listenEvent(PokeBattleSocketEvents.GAME_PLAYER_UNREADY, (data: object) => {
        console.log("player is unready", data)
    })

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
                <BattleScreen/>
            </div>
        </>
    )
}