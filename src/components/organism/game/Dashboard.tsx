import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {Button} from "@atom/buttons/Button.tsx";
import {gameCreate} from "@repositories/gameRepository.ts";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";
import {GameInterface} from "@interfaces/GameInterface.ts";
import {List} from "@organism/game/List.tsx";
import {MessageLevelEnum} from "../../../enums/MessageLevelEnum.ts";
import {PageEnums} from "../../../enums/PageEnums.ts";
import Element = React.JSX.Element;
import {Error500} from "@errors/Error500.tsx";
import {BuildTeam} from "@organism/game/BuildTeam.tsx";
import {History} from "@organism/game/History.tsx";

export function Dashboard(
    {setGame}: {
        setGame: React.Dispatch<React.SetStateAction<GameInterface | null>>
    }
) {
    const {userId, token} = useContext(AuthContext)
    const {emitEvent, sendToast} = useContext(SocketContext)
    const [page, setPage] = useState<string>(PageEnums.LIST)

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

    let component: Element;
    switch (page) {
        case PageEnums.LIST:
            component = <List setGame={setGame} />
            break  ;
        case PageEnums.NEW_TEAM:
            component = <BuildTeam />
            break
        case PageEnums.HISTORY:
            component = <History />
            break
        default:
            component = <Error500 />
            break
    }

    return (
        <>
            <div className="mb-4 flex flex-wrap">
                <Button label={'Create game'}
                        click={() => createGame()}
                        btnWidth={"btn-wide"}
                        type={'button'}
                        level={'primary'}
                        disabled={""} />
                <Button label={'Search game'}
                        click={() => setPage(PageEnums.LIST)}
                        btnWidth={"btn-wide"}
                        type={'button'}
                        level={'secondary'}
                        disabled={""} />
                <Button label={'Build a team'}
                        click={() => setPage(PageEnums.NEW_TEAM)}
                        btnWidth={"btn-wide"}
                        type={'button'}
                        level={'secondary'}
                        disabled={""} />
                <Button btnWidth={'btn-wide'}
                        type={'button'}
                        level={'secondary'}
                        label={'Historique'}
                        click={() => setPage(PageEnums.HISTORY)}
                        disabled={''} />
            </div>
            {component}
        </>
    );
}
