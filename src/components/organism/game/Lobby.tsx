import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {gameFetch} from "@repositories/gameRepository.ts";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {data} from "autoprefixer";

export function Lobby() {
    const {isAuthenticated, userId, token} = useContext(AuthContext)
    const {socket, emitEvent, listenEvent, dropEvent} = useContext(SocketContext)
    const navigate = useNavigate()
    const [game, setGame] = useState({})
    const [player2, setPlayer2] = useState("")
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
            console.error(response.error)
            toast.custom((t) => <Toast t={t} msg={"Erreur lors de la récupération de la partie"} level={"danger"}/>)
            navigate("/game/dashboard")
        } else {
            setGame(response)
        }
    }

    // Récupération de la partie
    useEffect(() => {
        if (game.id) return;
        fetchGame()
    });

    useEffect(() => {
        socket.on(PokeBattleSocketEvents.GAME_PLAYER_JOINED, (data: object) => {
            console.log("player joined", data);
            toast.custom((t) => <Toast t={t} msg={`Player ${data.player} joined your lobby !`} />)
            setPlayer2(data.player)
        })

        return () => {socket.off(PokeBattleSocketEvents.GAME_PLAYER_JOINED);}
    }, [socket]);

    // Ecoute de la connexion à la partie
    // socket.off(PokeBattleSocketEvents.GAME_PLAYER_JOINED);
    // socket.on(PokeBattleSocketEvents.GAME_PLAYER_JOINED, (data: object) => {
    //     console.log("player joined", data);
    //     toast.custom((t) => <Toast t={t} msg={`Player ${data.player} joined your lobby !`} />)
    //     setPlayer2(data.player)
    // })

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
                Joueur 2 : {player2} <br/>
            </>
        )
    }
}