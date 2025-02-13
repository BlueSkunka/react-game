import {GameInterface} from "@interfaces/GameInterface.ts";
import {GameInfos} from "@organism/game/battle/GameInfos.tsx";
import {useContext, useState} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {Button} from "@atom/buttons/Button.tsx";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";

export function PokeBattleScreen(
    {game, setGame} :
    {
        game: GameInterface | null,
        setGame:  React.Dispatch<React.SetStateAction<GameInterface | null>>
    }
) {
    const {userId} = useContext(AuthContext)
    const {emitEvent} = useContext(SocketContext)
    const [isCreator, setIsCreator] = useState<boolean>(game.creator === userId)
    console.log("PokeBattleScreen", game, isCreator)

    const abandonGame = async () => {
        emitEvent(PokeBattleSocketEvents.GAME_PLAYER_ABANDON, {playerId: userId, gameId: game.id})
        setGame(null)
    }

    return (
        <>
            <div className="flex flex-col min-h-[calc(100vh-120px)]">
                <div className="flex flex-col-reverse md:lg:flex-row">
                    <div className="w-4/5">
                        <GameInfos game={game} />
                    </div>
                    <div className="">
                        <Button btnWidth={'btn-wide'}
                                type={'button'}
                                level={'danger'}
                                label={'Abandon'}
                                click={abandonGame}
                                disabled={''} />
                    </div>
                </div>
                <div className="battle-screen bg-neutral h-[48rem] bordered border-2 p-2 flex flex-col">
                    <div className="opponent-section h-2/5">
                        Opponent
                    </div>
                    <div className="player-section  h-2/5">
                        Current player
                    </div>
                    <div className="actions">
                        Actions or text
                    </div>
                </div>
            </div>
        </>
    );
}