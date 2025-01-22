import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {gameJoin, gameList} from "@repositories/gameRepository.ts";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";
import {GameInterface} from "@interfaces/GameInterface.ts";
import {GameRow} from "@molecule/game/GameRow.tsx";
import {Button} from "@atom/buttons/Button.tsx";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {IconPassword} from "@atom/icons/IconPassword.tsx";
import {TextInput} from "@atom/inputs/TextInput.tsx";
import {PokeBattleGameActions} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleGameActions";

export function List() {
    const {isAuthenticated, userId, token} = useContext(AuthContext)
    const {socket, emitEvent} = useContext(SocketContext);
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    // Contrôle de la connexion
    if (!isAuthenticated()) {
        navigate('/login');
    }

    const listGames = async () => {
        const response = await gameList(token);
        if (response.error) {
            toast.custom((t) => <Toast t={t} msg={"Erreur lors de la récupération de la partie"} level={"danger"}/>)
        } else {
            const gamesArray: GameInterface[] = response;
            setGames(gamesArray);
        }
    }

    // Récupération des parties
    useEffect(() => {
        listGames()
    }, []);

    // Formulaire pour rejoindre une partie
    const joinGame = async (gameId: string) => {
        console.log("Joining game".concat(gameId))
        const response = await gameJoin(token, userId, gameId, PokeBattleGameActions.JOIN);
        if (response.error) {
            toast.custom((t) => <Toast t={t} msg={response.error} level={"danger"}/>)
        } else {
            console.log("joinging game 2 from search", gameId, response)
            emitEvent(PokeBattleSocketEvents.GAME_PLAYER_JOINING, {roomId: gameId, userId: userId})
            navigate("/game/lobby/" + gameId)
        }
    }

    const joinForm: JSX.Element = <Formik
        initialValues={{code: ''}}
        onSubmit={(values) => {joinGame(values.code)}}
        validationSchema={Yup.object({
            code: Yup.string()
                .required('Veuillez saisir un code de partie')
                .min(8, 'Un code doit faire 8 caractères')
                .max(8, 'Un code doit faire 8 caractères')
        })}
        >
        <Form>
            <Field name="code" type="text" placeholder={"Code"} icon={<IconPassword />} component={TextInput} />
            <Button level={'primary'} type={'submit'} laebl={'Join game'} btnWidth={'btn-sm'} />
        </Form>
    </Formik>


    if (games.length == 0) {
        return (
            <>
                No game available
                {joinForm}
            </>
        );
    }

    const array: JSX.Element[] = [];
    games.forEach((game) => {
        array.push(
            <GameRow game={game} token={token} userId={userId}/>
        )
    })

    return (
        <>
            <div className="flex inline">
                <h2>Games list</h2>
                <Button label={'Refresh'} btnWidth={"btn-sm"} click={listGames} />
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Game creator</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {array}
                    </tbody>
                </table>
            </div>
            {joinForm}
        </>
    );
}