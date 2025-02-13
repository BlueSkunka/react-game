import {GameInterface} from "@interfaces/GameInterface.ts";
import {useContext} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {Button} from "@atom/buttons/Button.tsx";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";

export function BattleEndScreen(
    {game, setGame} :
    {
        game: GameInterface | null,
        setGame:  React.Dispatch<React.SetStateAction<GameInterface | null>>
    }
) {
    const {userId} = useContext(AuthContext)
    const {emitEvent} = useContext(SocketContext)
    const isUserWinner: boolean = userId === game.winner
    const leaveGame = () => {
        emitEvent(PokeBattleSocketEvents.GAME_ENDED, {gameId: game.id})
        setGame(null)
    }

    return (
        <>
            <div className={`container pb-4 flex flex-col items-center justify-center ${isUserWinner ? 'bg-success' : 'bg-error'}`}>
                <h2 className={`text-8xl `}>
                    {isUserWinner ? 'Victory' : 'Defeat'}
                </h2>
                <Button btnWidth={'btn-wide'} type={'button'} level={'primary'} label={'Back to home'} click={leaveGame} disabled={''} />
            </div>
        </>
    );
}