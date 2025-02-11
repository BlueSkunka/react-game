import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {GameInterface} from "@interfaces/GameInterface.ts";
import {gameListByUser} from "@repositories/gameRepository.ts";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {MessageLevelEnum} from "../../../enums/MessageLevelEnum.ts";
import {GameHistoryRow} from "@molecule/game/GameHistoryRow.tsx";

export function History() {
    const {userId, token} = useContext(AuthContext)
    const {sendToast} = useContext(SocketContext)
    const [games, setGames] = useState<GameInterface[]>([])

    useEffect(() => {
        getHistory()
    }, []);

    async function getHistory() {
        console.log('fetching history')
        const response = await gameListByUser(token, userId);

        if (response.error) {
            sendToast(response.error, MessageLevelEnum.DANGER)
        } else {
            setGames(response)
        }
    }

    return (
        <>
            <div className={'flex justify-center mb-4'}>
                <h1 className={'text-4xl'}>Game history</h1>
            </div>

            <div className={'flex flex-col space-y-2'}>
                {games.map((game) => (
                    <div key={game.id}>
                        <GameHistoryRow game={game} userId={userId} />
                    </div>
                ))}
            </div>
        </>
    );
}