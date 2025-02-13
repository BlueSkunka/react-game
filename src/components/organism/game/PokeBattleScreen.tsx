import {GameInterface} from "@interfaces/GameInterface.ts";
import {GameInfos} from "@organism/game/battle/GameInfos.tsx";
import {useContext, useState} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";

export function PokeBattleScreen(
    {game}:
    {
        game: GameInterface
    }
) {
    const {userId} = useContext(AuthContext)
    const [isCreator, setIsCreator] = useState<boolean>(game.creator === userId)
    console.log("PokeBattleScreen", game, isCreator)

    return (
        <>
            <div className="flex flex-col min-h-[calc(100vh-120px)]">
                <div className="flex flex-col-reverse md:lg:flex-row">
                    <div className="w-4/5">
                        <GameInfos game={game} />
                    </div>
                    <div className="">
                        Leave button
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