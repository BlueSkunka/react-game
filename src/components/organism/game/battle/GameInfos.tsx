import {GameInterface} from "@interfaces/GameInterface.ts";

export function GameInfos(
    {game}:
    {
        game: GameInterface
    }
) {
    return (
        <>
            <div className="flex justify-between m-2">
                <div className="creator-infos bg-primary p-2 w-1/2">
                    <div className="flex flex-col">
                        <span>
                            {game.creator}
                        </span>
                        <div className="flex">
                            <img src="/pokeball.png" alt="Pokeball" className="w-20 h-20 brightness-50"/>
                            <img src="/pokeball.png" alt="Pokeball" className="w-20 h-20"/>
                            <img src="/pokeball.png" alt="Pokeball" className="w-20 h-20"/>
                        </div>
                    </div>
                </div>
                <span className="versus"></span>
                <div className="player-infos bg-secondary  p-2 w-1/2">
                    <div className="flex flex-col">
                        <span>
                            {game.player}
                        </span>
                        <div className="flex">
                            <img src="/pokeball.png" alt="Pokeball" className="w-20 h-20"/>
                            <img src="/pokeball.png" alt="Pokeball" className="w-20 h-20 brightness-50"/>
                            <img src="/pokeball.png" alt="Pokeball" className="w-20 h-20"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}