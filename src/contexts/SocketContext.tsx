import {createContext, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {Outlet} from "react-router-dom";
import toast from "react-hot-toast";
import {Toast} from "@atom/toasts/Toast.tsx";
import {MessageLevelEnum} from "../enums/MessageLevelEnum.ts";

interface SocketContextInterface {
    socket: Socket,
    sendToast: (msg: string, level: MessageLevelEnum) => void,
    isSocketConnected: () => boolean,
    emitEvent: (event: string, data: object) => void,
    listenEvent: (event: string, callback: (data: object) => void) => void,
    muteEvent: (event: string, callback: (data: object) => void) => void,
    bulkMuteEvents: (events: Map<string, (data: object) => void>) => void
}

export const SocketContext = createContext<SocketContextInterface>({
    socket: io(),
    sendToast: (msg: string, level: MessageLevelEnum) => {},
    isSocketConnected: () => false,
    emitEvent: (event: string, data: object) => {},
    listenEvent: (event: string, callback: (data: object) => void) => {},
    muteEvent: (event: string, callback: (data: object) => void) => {},
    bulkMuteEvents: (events: Map<string, (data: object) => void>) => {}
});

/**
 * Provider du context Socket :
 * - connexion au serveur socket.io
 * - envoi des évènements
 * - écoute des évènements
 * - fin d'écoute des évènements
 * - vérifier l'état de la connexion au serveur
 * - [tmp] envoie de message toasts
 * @param children Contenu enfant du SocketProvider
 * @constructor
 */
export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState<Socket>(io())

    /**
     * TODO : Transférer cette méthode utilitaire dans un autre Provider
     * Permet d'envoyer un message Toast à l'utilisateur
     * @param msg Contenu du message à afficher
     * @param level Niveau du message à afficher, 'info' par défaut
     */
    const sendToast = (msg: string, level: MessageLevelEnum = 'info') => {
        toast.custom((t) => <Toast t={t} msg={msg} level={level} />)
    }

    /**
     * Montage : Connexion au serveur socket.io
     * Démontage : fin d'écoute de tous les évènements et déconnexion du serveur socket.io
     */
    useEffect(() => {
        setSocket(io(import.meta.env.VITE_API_ENDPOINT))

        if (!isSocketConnected()) {
            console.error("Erreur lors de la connexion au serveur Socket.io")
            sendToast("Erreur lors de la connexion au serveur Socket.io", MessageLevelEnum.FATAL)
        }

        return () => {
            if (null !== socket) muteAllEvents().then(() => socket.disconnect())
        }
    }, []);

    /**
     * Renvoie un booléen représentant l'état de la connexion au serveur socket.io
     */
    const isSocketConnected = (): boolean => {
        if (null === socket || !socket.connected) {
            sendToast("La connexion au serveur Socket n'est pas établie", MessageLevelEnum.WARNING)
            return false
        }
        return true
    }

    /**
     * Envoi d'un message au serveur socket.io
     * @param event Nom de l'évènement
     * @param data Données à transmettre
     */
    const emitEvent = async (event: string, data: object) => {
        if (isSocketConnected()) {
            console.log("socket emit event", socket.id, event, data)
            socket.emit(event, data)

        }
    }

    /**
     * Écoute d'un évènement transmis par le serveur socket.io
     * @param event Nom de l'évènement
     * @param callback Fonction callback à exécuter lors de la transmission de l'évènement
     */
    const listenEvent = async (event: string, callback: (data: object) => void) => {
        if (isSocketConnected()) {
            console.log("socket listen event", socket.id, event)
            socket.on(event, callback)
            console.log(socket.listeners(event))
        }
    }

    /**
     * Fin d'écoute d'un évènement transmis par le serveur socket.io
     * @param event Nom de l'évènement
     * @param callback Callback de l'évènement
     */
    const muteEvent = async (event: string, callback: (data: object) => void) => {
        if (isSocketConnected()) {
            console.log("socket mute event", socket.id, event)
            socket.off(event, callback)
            console.log(socket.listeners(event))
        }
    }

    /**
     * Fin d'écoute massive pour tous les évènements transmis en paramètre
     * @param events Liste des évènements
     */
    const bulkMuteEvents = async (events: Map<string, (data: object) => void>) => {
        if (isSocketConnected()) {
            console.log("socket bulk mute", socket.id)
            // Value = Event callback
            // Key = Event name
            events.forEach((value: (data: object) => void, key: string) => {
                muteEvent(key, value)
            })
        }
    }

    /**
     * Fin d'écoute massive de tous les évènements en écoute transmis par le serveur socket.io
     */
    const muteAllEvents = async () => {
        if (isSocketConnected()) {
            console.log("socket mute all events", socket.id)
            socket.removeAllListeners();
        }
    }

    console.log("socket", socket)


    return (
        <SocketContext.Provider value={{socket, sendToast, isSocketConnected, emitEvent, listenEvent, muteEvent, bulkMuteEvents}} >
            {children}
            <Outlet />
        </SocketContext.Provider>
    )
}