import {createContext, useEffect, useState} from "react";
import {io} from "socket.io-client";
import {Outlet} from "react-router-dom";
import {PokeBattleSocketEvents} from "@blueskunka/poke-battle-package";

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
    });

    const emitEvent = async (event: string, data: object) => {
        socket.emit(event, data)
    }

    return (
        <SocketContext.Provider value={{socket, emitEvent}} >
            {children}
            <Outlet/>
        </SocketContext.Provider>
    )
}