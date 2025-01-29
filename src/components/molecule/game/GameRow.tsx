import {Button} from "@atom/buttons/Button.tsx";
import {gameJoin} from "@repositories/gameRepository.ts";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";
import {useContext} from "react";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {PokeBattleGameActions} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleGameActions";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";
import {GameInterface} from "@interfaces/GameInterface.ts";
import * as React from "react";

export function GameRow(
    {game, token, userId, setGame}:
    {
        game: GameInterface,
        token: string,
        userId: string,
        setGame: React.Dispatch<React.SetStateAction<GameInterface | null>>
    }
) {
    const {emitEvent} = useContext(SocketContext)

    const joinGame = async () => {
        console.log("Joining game".concat(game.id))
        const response = await gameJoin(token, userId, game.id, PokeBattleGameActions.JOIN);
        if (response.error) {
            toast.custom((t) => <Toast t={t} msg={response.error} level={"danger"}/>)
        } else {
            console.log("game joined", game.id, response)
            emitEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINING, {roomId: game.id, userId: userId})
            setGame(game)
        }
    }

    return (
        <>
            <tr>
                <td>
                    {game.creator}
                </td>
                <td>
                    {game.id}
                </td>
                <td>
                    <Button label={"Join game"}
                            btnWidth={"btn-sm"}
                            click={joinGame}
                            type={'button'}
                            level={"secondary"}
                            disabled={""} />
                </td>
            </tr>
        </>
    );
}