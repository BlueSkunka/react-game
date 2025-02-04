import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {gameList} from "@repositories/gameRepository.ts";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";
import {GameInterface} from "@interfaces/GameInterface.ts";
import {GameRow} from "@molecule/game/GameRow.tsx";
import {Button} from "@atom/buttons/Button.tsx";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {MessageLevelEnum} from "../../../enums/MessageLevelEnum.ts";

export function List(
    {setGame}:
    {
        setGame: React.Dispatch<React.SetStateAction<GameInterface | null>>
    }
) {
    const {userId, token} = useContext(AuthContext)
    const {sendToast} = useContext(SocketContext);
    const [games, setGames] = useState<GameInterface[]>([])

    // Mute all available events on component destroy
    useEffect(() => {
        console.log("Component is rendered")

        return () => {
            console.log("Component is being destroy")
            console.log("Component is now destroyed")
        }
    }, []);

    const listGames = async () => {
        const response = await gameList(token);
        if (response.error) {
            toast.custom((t) => <Toast t={t} msg={"Erreur lors de la récupération de la partie"} level={"danger"}/>)
            sendToast("Erreur lors de la récupération de la partie", MessageLevelEnum.DANGER)
        } else {
            const gamesArray: GameInterface[] = response;
            setGames(gamesArray);
        }
    }

    // Récupération des parties
    useEffect(() => {
        listGames().then(r => r)
    }, [listGames]);

    // Formulaire pour rejoindre une partie
    // const joinGame = async (gameId: string) => {
    //     console.log("Joining game".concat(gameId))
    //     const response = await gameJoin(token, userId, gameId, PokeBattleGameActions.JOIN);
    //     if (response.error) {
    //         toast.custom((t) => <Toast t={t} msg={response.error} level={"danger"}/>)
    //     } else {
    //         console.log("joinging game 2 from search", gameId, response)
    //         emitEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINING, {roomId: gameId, userId: userId})
    //         navigate("/game/lobby/" + gameId)
    //     }
    // }

    // const joinForm: JSX.Element = <Formik
    //     initialValues={{code: ''}}
    //     onSubmit={(values) => {joinGame(values.code)}}
    //     validationSchema={Yup.object({
    //         code: Yup.string()
    //             .required('Veuillez saisir un code de partie')
    //             .min(8, 'Un code doit faire 8 caractères')
    //             .max(8, 'Un code doit faire 8 caractères')
    //     })}
    //     >
    //     <Form>
    //         <Field name="code" type="text" placeholder={"Code"} icon={<IconPassword />} component={TextInput} />
    //         <Button level={'primary'} type={'submit'} laebl={'Join game'} btnWidth={'btn-sm'} />
    //     </Form>
    // </Formik>


    // if (games.length == 0) {
    //     return (
    //         <>
    //             No game available
    //             {joinForm}
    //         </>
    //     );
    // }

    return (
        <>
            <div className="flex">
                <h2>Games list</h2>
                <Button label={'Refresh'}
                        btnWidth={"btn-sm"}
                        click={listGames}
                        type={'button'}
                        level={"secondary"}
                        disabled={""} />
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Game creator</th>
                            <th>Game ID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((item) => (
                            <div>
                                <GameRow game={item}
                                         token={token}
                                         userId={userId}
                                         setGame={setGame}/>
                            </div>
                        ))}
                    </tbody>
                </table>
            </div>
            {/*{joinForm}*/}
        </>
    );
}