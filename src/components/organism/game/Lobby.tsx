import {useState} from "react";
import {GameInterface} from "@interfaces/GameInterface.ts";
import {LobbyPlayerInfo} from "@molecule/game/LobbyPlayerInfo.tsx";

export function Lobby(
    {game}: {
        game: GameInterface
    }
) {
    const [player2, setPlayer2] = useState(game.player)

    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="card bg-base-100 w-full shadow-xl">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Partie : {game.id}</h2>
                        <p>Joining code : {game.joiningCode}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <LobbyPlayerInfo player={game.creator} setPlayer2={setPlayer2} />
                    <LobbyPlayerInfo player={player2} setPlayer2={setPlayer2} />
                </div>
            </div>
        </>
    )
}