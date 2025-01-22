import {createContext, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {Outlet} from "react-router-dom";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package/dist/enums/PokeBattleSocketEvents";

export const SocketContext = createContext();

export const SocketProvider = ({children}) => {
    const socket = io(import.meta.env.VITE_API_ENDPOINT);

    useEffect(() => {
        socket.on(PokeBattleSocketEvents.TEST_EVENT, (data: object) => {
            console.log(data)

            return () => socket.off(PokeBattleSocketEvents.TEST_EVENT)
        });

        socket.on(PokeBattleSocketEvents.GAME_CREATE_ROOM, (data: object) => {
            console.log(data)
        })

        return () => {
            socket.off(PokeBattleSocketEvents.TEST_EVENT)
            socket.off(PokeBattleSocketEvents.GAME_CREATE_ROOM)
        }
    }, []);

    const emitEvent = async (event: string, data: object) => {
        if (socket) socket.emit(event, data)
    }

    return (
        <SocketContext.Provider value={{socket, emitEvent}} >
            {children}
            <Outlet/>
        </SocketContext.Provider>
    )
}