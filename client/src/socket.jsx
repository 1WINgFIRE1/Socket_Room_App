import {io} from "socket.io-client"
// put your wifi ipV4 addresss "x"
export const socket = io("http://192.168.xx.xxx:3000",{
    transports:["websocket","polling"]
});
