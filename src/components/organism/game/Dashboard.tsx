import * as React from "react";
import {useContext, useEffect} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {Button} from "@atom/buttons/Button.tsx";
import {gameCreate} from "@repositories/gameRepository.ts";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";
import {GameInterface} from "@interfaces/GameInterface.ts";
import {List} from "@organism/game/List.tsx";
import {MessageLevelEnum} from "../../../enums/MessageLevelEnum.ts";

export function Dashboard(
    {setGame}: {
        setGame: React.Dispatch<React.SetStateAction<GameInterface | null>>
    }
) {
    const {userId, token} = useContext(AuthContext)
    const {emitEvent, sendToast} = useContext(SocketContext)

    // Mute all available event on component destroy
    useEffect(() => {
        console.log("Component is rendered")
        return () => {
            console.log("Destroying component")
            console.log("Component is now destroyed")
        }
    }, []);

    const createGame = async () => {
        const response = await gameCreate(userId, token);
        console.log("create game", response)
        if (response.error) {
            console.error(response.error)
            sendToast("Erreur lors de la création de la partie", MessageLevelEnum.DANGER)
        } else {
            const game: GameInterface = response.game
            console.log("game created", game)
            sendToast("Création de la partie réussie", MessageLevelEnum.SUCCESS)
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
