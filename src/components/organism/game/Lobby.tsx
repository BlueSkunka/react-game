import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {gameFetch} from "@repositories/gameRepository.ts";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";

export function Lobby() {
    const {isAuthenticated, userId, token} = useContext(AuthContext)
    const navigate = useNavigate()
    const [game, setGame] = useState({})
    const {id} = useParams()

    // Contrôle de la connexion
    if (!isAuthenticated()) {
        navigate('/login');
    }

    // Contrôle des paramètres
    if (undefined == id) {
        toast.custom((t) => <Toast t={t} msg={"Paramètre de partie manquant"} level={"danger"} />)
        navigate("/game/dashboard")
    }

    // Fetch room infos
    const fetchGame = async () => {
        const response = await gameFetch(userId, token, id)
        if (response.error) {
            toast.custom((t) => <Toast t={t} msg={"Erreur lors de la récupération de la partie"} level={"danger"}/>)
        } else {
            console.log(response)

            setGame(response)
        }
    }

    useEffect(() => {
        fetchGame()
    }, []);

    if (Object.keys(game).length === 0) {
        return (
            <>
                LOADING
            </>
        );
    } else {
        return (
            <>
                LOBBY <br/>
                ID Partie : {game.id} <br/>
                Créateur : {game.creator} <br/>
                Code partie: {game.joiningCode} <br/>
            </>
        )
    }
}