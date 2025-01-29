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
import {List} from "@organism/game/List.tsx";

export function Dashboard(
    {setGame}: {
        setGame: React.Dispatch<React.SetStateAction<GameInterface | null>>
    }
) {
    const {userId, token} = useContext(AuthContext)
    const {emitEvent} = useContext(SocketContext)

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

    return (
        <>
            <div className="mb-4">
                <Button label={'Create game'}
                        click={() => createGame()}
                        btnWidth={"btn-wide"}
                        type={'button'}
                        level={'primary'}
                        disabled={""} />
            </div>
            <List setGame={setGame} />
        </>
    );
}

Dashboard.defaultProps = {
    setGame: () => {}
}