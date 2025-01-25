import {useContext, useState} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {Button} from "@atom/buttons/Button.tsx";
import {gameCreate, gameList} from "@repositories/gameRepository.ts";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";
import {GameInterface} from "@interfaces/GameInterface.ts";
import * as React from "react";
import {MessageLevelEnum} from "../../../enums/MessageLevelEnum.ts";
import Element = React.JSX.Element;
import {GameRow} from "@molecule/game/GameRow.tsx";

export function Dashboard(
    {setGame}: {
        setGame: React.Dispatch<React.SetStateAction<GameInterface | null>>
    }
) {
    const {userId, token} = useContext(AuthContext)
    const {emitEvent} = useContext(SocketContext)
    const [games, setGames] = useState<GameInterface[]>([])


    const createGame = async () => {
        const response = await gameCreate(userId, token);
        console.log("create game", response)
        if (response.error) {
            console.error(response.error)
            toast.custom((t) => <Toast t={t} msg={"Erreur lors de la création de la partie"} level={"danger"}/>)
        } else {
            const game: GameInterface = response.game
            console.log("game created", game)
            toast.custom((t) => <Toast t={t} msg={"Création de la partie réussie"} level={"success"}/>)
            emitEvent(PokeBattleSocketEvents.GAME_CREATE_ROOM, {gameId: game.id});
            setGame(game)
        }
    }

    const displayGames = async () => {
        const response = await gameList(token);
        console.log("display games", response)
        if (response.error) {
            console.error(response.error)
            toast.custom((t) => <Toast t={t} msg={response.error} level={MessageLevelEnum.FATAL} />)
        } else {
            const gameArray: GameInterface[] = response;
            setGames(gameArray)
        }
    }

    const array: Element[] = [];
    games.forEach((game) => {
        array.push(
            <GameRow game={game} token={token} userId={userId} setGame={setGame} />
        )
    })

    return (
        <>
            <Button  label={'Create game'} click={() => createGame()} />
            <Button label={'Join game'} click={() => displayGames()} />

            <div className="flex inline">
                <h2>Games list</h2>
                <Button label={'Refresh'} btnWidth={"btn-sm"} click={displayGames} />
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                    <tr>
                        <th>Game creator</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {array}
                    </tbody>
                </table>
            </div>
        </>
    );
}

Dashboard.defaultProps = {
    setGame: () => {}
}