import {io} from "socket.io-client"

export const socket = io("http://192.168.29.149:3000",{
    transports:["websocket","polling"]
});