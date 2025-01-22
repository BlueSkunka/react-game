import {Button} from "@atom/buttons/Button.tsx";
import {gameJoin} from "@repositories/gameRepository.ts";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";
import {useContext, useEffect} from "react";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {PokeBattleGameActions} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleGameActions";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";
import {useNavigate} from "react-router-dom";

export function GameRow(props) {
    const {socket, emitEvent} = useContext(SocketContext)
    const navigate = useNavigate()

    const joinGame = async () => {
        console.log("Joining game".concat(props.game.id))
        const response = await gameJoin(props.token, props.userId, props.game.id, PokeBattleGameActions.JOIN);
        if (response.error) {
            toast.custom((t) => <Toast t={t} msg={response.error} level={"danger"}/>)
        } else {
            console.log("joinging game 2", props.game.id, response)
            socket.emit(PokeBattleSocketEvents.GAME_PLAYER_JOINING, {roomId: props.game.id, userId: props.userId})
            navigate("/game/lobby/" + props.game.id)
        }
    }

    return (
        <>
            <tr>
                <td>
                    {props.game.creator}
                </td>
                <td>
                    <Button label={"Join game"} btnWidth={"btn-sm"} click={joinGame} />
                </td>
            </tr>
        </>
    );
}

GameRow.defaultProps = {
    game: {},
    click: () => {}
}